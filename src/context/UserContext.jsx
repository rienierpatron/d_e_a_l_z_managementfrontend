/**
 * External dependencies
 */
import React, { createContext, useState, useContext } from "react";

/**
 * Internal dependencies
 */
import { api } from "@/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await api.user.getCurrentUser(false);
      if (userData.status === "ok") {
        setUser(userData.data.user);
        return;
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
