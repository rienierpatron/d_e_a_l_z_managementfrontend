/**
 * Internal dependencies
 */

import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import Typography from "@/components/Common/Typography";

const AddOnsCard = ({
  priceText,
  dealDescription,
  availabilityNote,
  buttonText = "Purchase Now",
}) => {
  return (
    <div className="bg-white border border-light-gray rounded-3xl p-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 items-center text-center">
        <Typography variant="body" className="font-semibold !text-green">
          {priceText}
        </Typography>
        <Typography variant="small" className="text-dark-gray">
          {dealDescription}
        </Typography>
        <span className="!text-[10px] !text-dark-gray">
         {availabilityNote}
        </span>
      </div>
      <Button
        icon={<IconArrowRight />}
        iconPosition="right"
        variant="primary"
        outlined
        isRound
        className="!px-4 !py-[10px] !text-xs"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default AddOnsCard;
