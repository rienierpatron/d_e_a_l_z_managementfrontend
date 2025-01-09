/**
 * External dependencies
 */
import { useState } from "react";
import { useRouter } from "next/router";
/**
 * Internal dependencies
 */
import Button from "@/components/Common/Button";
import { helper } from "@/helpers";
import { getCustomerPortalLink } from "@/api/subscriptions";

const CancelSubscriptionCta = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      const res = await getCustomerPortalLink();
      if (res && helper.cmpStr(res.status, "ok")) {
        setIsLoading(false);
        router.push(res.data.stripe_customer_portal_link);
        return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  return (
    <Button
      icon="/icons/cancel-icon.svg"
      isRound
      className="text-red border-0 !bg-red-40 !py-[10px]"
      onClick={handleCancelSubscription}
      isLoading={isLoading}
      spinnerFill="fill-red"
    >
      Cancel Subscription
    </Button>
  );
};

export default CancelSubscriptionCta;
