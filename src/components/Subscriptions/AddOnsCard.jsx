import { useState } from "react";
import { useRouter } from "next/router";
/**
 * Internal dependencies
 */
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import Typography from "@/components/Common/Typography";
import { getAddonPaymentLink } from "@/api/subscriptions";
import { helper } from "@/helpers";

const AddOnsCard = ({
  priceText,
  dealDescription,
  availabilityNote,
  buttonText = "Purchase Now",
  stripeProductPriceId,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChoose = async () => {
    try {
      setLoading(true);
      const response = await getAddonPaymentLink({
        stripeProductPriceId: stripeProductPriceId,
        quantity: 1,
      });
      if (
        response &&
        helper.cmpStr(response.status, "ok") &&
        helper.notEmpty(response.data.stripe_payment_link_url)
      ) {
        setLoading(false);
        router.push(response.data.stripe_payment_link_url);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  return (
    <div className="bg-white border border-light-gray rounded-3xl p-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 items-center text-center">
        <Typography variant="body" className="font-semibold !text-primary">
          {priceText}
        </Typography>
        <Typography variant="small" className="text-dark-gray">
          {dealDescription}
        </Typography>
        <span className="!text-[10px] !text-dark-gray">{availabilityNote}</span>
      </div>
      <Button
        icon={<IconArrowRight />}
        iconPosition="right"
        variant="primary"
        outlined
        isRound
        className="!px-4 !py-[10px] !text-xs"
        disabled={loading}
        isLoading={loading}
        onClick={handleChoose}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default AddOnsCard;
