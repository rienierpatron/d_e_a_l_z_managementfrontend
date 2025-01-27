// helpers/useSubscription.js

import { useState, useEffect } from "react";
import { helper } from "../../helpers";
import { getSubscriptionDetails } from "@/api/subscriptions";
import { useUser } from "@/context/UserContext";

export const useSubscription = () => {
  const { user } = useUser()
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
    if (user && !user?.is_super_or_staff) {
      getCurrentSubscriptionDetails();
    }
  }, [user]);

  return { currentSubscription, error };
};
