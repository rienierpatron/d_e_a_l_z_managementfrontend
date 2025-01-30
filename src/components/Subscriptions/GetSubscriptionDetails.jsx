// helpers/useSubscription.js

import { useState, useEffect } from "react";
import { helper } from "../../helpers";
import { getSubscriptionDetails } from "@/api/subscriptions";
import { useUser } from "@/context/UserContext";
import { USER } from "@/lib/constants";

export const useSubscription = () => {
  const { user } = useUser();
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentSubscriptionDetails = async () => {
    try {
      const showMessage = false;
      const res = await getSubscriptionDetails(showMessage);
      if (res && helper.cmpStr(res.status, "ok")) {
        setCurrentSubscription(res.data);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    if (
      user &&
      user?.user_role?.role_name !== USER.ROLES.SUPERADMIN &&
      user?.user_role?.role_name !== USER.ROLES.STAFF
    ) {
      getCurrentSubscriptionDetails();
    }
  }, [user]);

  return { currentSubscription, error };
};
