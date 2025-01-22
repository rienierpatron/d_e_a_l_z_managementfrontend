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
import IconClose from "@/components/Icons/IconClose";
import FormInput from "@/components/Common/FormInput";
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import FormTextArea from "@/components/Common/FormTextArea";

const RequestToReviseDialog = ({ open, onSubmit, onClose, reviseFields, onReviseFieldChange }) => {
  
  const handleInputChange = (e, field) => {
    onReviseFieldChange(field, e.target.value); // Update the main page state
  };

  return (
    <Dialog
      show={open}
      onClose={onClose}
      contentClassName="!pb-0"
      size="lg"
      header={
        <>
          <div className="flex gap-3 items-center">
            <Image src="/icons/revision-icon.svg" width={50} height={50} />
            <Typography variant="body" className="!text-midnight-blue">
              Reason for the revision?
            </Typography>
          </div>
        </>
      }
      footer={
        <Button
          variant="primary"
          className="font-bold shadow-custom-primary"
          fullWidth
          isRound
          onClick={onSubmit}
        >
          Send
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <Typography variant="caption" className="uppercase pb-3">To</Typography>
          <div className="flex gap-2 items-center">
            <Image src="/icons/revision-icon.svg" width={32} height={32} />
            <FormInput
              type="text"
              placeholder="Enter text"
              value={reviseFields.reviseEmail || "payal@chaaat.io"}
              disabled
              rounded
              fullWidth
              className="bg-white border-0 !text-dark-gray !text-sm pl-0"
              onChange={(e) => handleInputChange(e, "reviseEmail")}
            />
          </div>
        </div>
        <div>
          <Typography variant="caption" className="uppercase pb-3">CC</Typography>
          <div className="flex gap-2 items-center">
            <div className="flex flex-nowrap items-center">
              <Typography variant="caption">dealz@chaaat.io</Typography>
              <IconClose className="text-black" />
            </div>
            <div className="flex flex-nowrap items-center">
              <Typography variant="caption">dealz@chaaat.io</Typography>
              <IconClose className="text-black" />
            </div>
          </div>
        </div>
        <FormFieldset className="pt-2">
          <FormLabel className="uppercase">Subject</FormLabel>
          <FormInput
            type="text"
            placeholder="Enter text"
            value="Request for Revise"
            disabled
            rounded
            fullWidth
            className="bg-light-gray"
          />
        </FormFieldset>
        <FormFieldset>
          <FormLabel className="uppercase">Your Mail</FormLabel>
          <FormTextArea 
            placeholder="Enter text" 
            value={reviseFields.reviseReason || ""}
            className="bg-light-gray"
            onChange={(e) => handleInputChange(e, "reviseReason")}
          />
        </FormFieldset>
      </div>
    </Dialog>
  );
};

export default RequestToReviseDialog;
