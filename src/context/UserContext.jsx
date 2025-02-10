/**
 * External dependencies
 */
import React, { createContext, useState, useContext } from "react";

/**
 * Internal dependencies
 */
import { api } from "@/api";
import { USER } from "@/lib/constants";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES } from "@/lib/routes";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await api.user.getCurrentUser(false);
      if (userData.status === "ok") {
        const is_super_admin =
          userData.data.user?.user_role?.role_name === USER.ROLES.SUPERADMIN;
        const is_staff =
          userData.data.user?.user_role?.role_name === USER.ROLES.STAFF;
        setUser({ ...userData.data.user, is_super_admin, is_staff });
        if (
          (router.pathname.includes("/admin") ||
            router.pathname.includes("/") ||
            PUBLIC_ROUTES.includes(router.pathname)) &&
          userData.data.user?.user_role?.role_name !== USER.ROLES.SUPERADMIN &&
          userData.data.user?.user_role?.role_name !== USER.ROLES.STAFF
        ) {
          return router.replace("/dashboard");
        }
        if (
          [...PUBLIC_ROUTES, "/"].includes(router.pathname) &&
          (userData.data.user?.user_role?.role_name === USER.ROLES.SUPERADMIN ||
            userData.data.user?.user_role?.role_name === USER.ROLES.STAFF)
        ) {
          return router.replace("/admin/dashboard");
        }
        return userData;
      }
      setUser(null);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
