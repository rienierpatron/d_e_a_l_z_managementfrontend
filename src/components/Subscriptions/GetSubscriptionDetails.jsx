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
        const _currentSubscription = res.data;
        if (helper.notEmpty(_currentSubscription?.available_inventory)) {
          _currentSubscription.available_inventory["allowed_slot"] =
            _currentSubscription?.total_inventory?.slot ?? 0;
        }
        setCurrentSubscription(_currentSubscription);
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
