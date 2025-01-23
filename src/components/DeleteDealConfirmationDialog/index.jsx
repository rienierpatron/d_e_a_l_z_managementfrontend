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
import IconTrash from "../Icons/IconTrash";

const DeleteDealConfirmationDialog = ({ open, onSubmit, onClose }) => {
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
          Proceed
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className="bg-red-40 h-[88px] w-[88px] flex items-center justify-center rounded-full">
          <IconTrash width={48} height={48} />
        </div>
        <Typography className="text-[18px] text-midnight-blue text-center">
          Are you sure you want to delete this deal?
        </Typography>
      </div>
    </Dialog>
  );
};

export default DeleteDealConfirmationDialog;
