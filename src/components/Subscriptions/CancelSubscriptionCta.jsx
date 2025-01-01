/**
 * Internal dependencies
 */
import Button from "@/components/Common/Button";

const CancelSubscriptionCta = () => {
  return (
    <Button
      icon="/icons/cancel-icon.svg"
      isRound
      className="text-red border-0 !bg-red-40 !py-[10px]"
    >
      Cancel Subscription
    </Button>
  );
};


export default CancelSubscriptionCta