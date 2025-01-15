/**
 * External dependencies
 */
import Image from "next/image";

/**
 * Internal dependencies
 */
import Button from "@/components/Common/Button";
import Dialog from "@/components/Common/Dialog";
import Typography from "@/components/Common/Typography";

const SlotNotAvailableDialog = ({ open, onSubmit, onClose }) => {
  return (
    <Dialog
      show={open}
      onClose={onClose}
      contentClassName="!pb-0"
      size="lg"
      footer={
        <Button
          variant="primary"
          className="font-bold shadow-custom-primary"
          fullWidth
          isRound
          onClick={onSubmit}
        >
          Close
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className="bg-orange-80 h-[88px] w-[88px] flex items-center justify-center rounded-full">
          <Image src="/icons/no-slots-available.svg" width={48} height={48} />
        </div>
        <Typography className="text-[18px] text-midnight-blue text-center">
            Slots are not available for this date.
        </Typography>
      </div>
    </Dialog>
  );
};

export default SlotNotAvailableDialog;
