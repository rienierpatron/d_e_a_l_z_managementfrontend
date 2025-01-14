// helpers/useSubscription.js

import { useState, useEffect } from "react";
import { helper } from "../../helpers";
import { getSubscriptionDetails } from "@/api/subscriptions";

export const useSubscription = () => {
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
    getCurrentSubscriptionDetails();
  }, []); // Empty array means this will only run on mount

  return { currentSubscription, error };
};
