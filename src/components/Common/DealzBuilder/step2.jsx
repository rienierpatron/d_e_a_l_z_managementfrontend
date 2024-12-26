import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import Typography from "@/components/Common/Typography";
import FormTextArea from "@/components/Common/FormTextArea";
import Button from "@/components/Common/Button";
import IconDollar from "@/components/Icons/IconDollar";
import IconPercentage from "@/components/Icons/IconPercentage";
import FilePicker from "@/components/Common/FilePicker";
import IconUploadFile from "@/components/Icons/IconUploadFile";
import IconDownload from "@/components/Icons/IconDownload";
import FormRadio from "@/components/Common/FormRadio";
import Image from "next/image";
import IconClose from "@/components/Icons/IconClose";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import BackNavigation from "../BackNavigation";
import FormInput from "../FormInput";

const DealzBuilderStep2 = ({ formData, setFormData }) => {
  const handlBack = () => {
    setFormData({
      ...formData,
      step: formData.step - 1,
    });
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      step: formData.step + 1,
    });
  };

  return (
    <div>
      <BackNavigation
        text="Follow up message and unique DEALZ code"
        className="text-xl"
        baseClassName="my-8"
        onClick={handlBack}
      />
      <div className="flex flex-col gap-6">
        <FormFieldset className="!mb-0">
          <FormLabel className="uppercase">
            Add text for follow up message
          </FormLabel>
          <FormTextArea
            className="bg-light-blue !text-dark-gray text-sm font-normal"
            icon="/icons/tag-2-icon.svg"
          />
          <Typography variant="caption" className="text-right mt-4">
            Max. 200 characters
          </Typography>
        </FormFieldset>
        <FormFieldset className="!mb-0">
          <FormLabel className="uppercase">
            Add Link to follow up message
          </FormLabel>
          <FormInput
            className="bg-light-blue"
            icon="/icons/global.svg"
            placeholder="Enter website or booking link"
            fullWidth
            rounded
          />
        </FormFieldset>
        <div className="flex gap-6">
          <FormFieldset className="!mb-0 w-full">
            <FormLabel className="uppercase">DEALZ Title</FormLabel>
            <FormInput
              className="bg-light-blue"
              icon="/icons/tag-2-icon.svg"
              fullWidth
              rounded
            />
          </FormFieldset>
          <FormFieldset className="!mb-0 w-full">
            <FormLabel className="uppercase">Deal</FormLabel>
            <FormInput
              className="bg-light-blue"
              icon={<IconDollar />}
              fullWidth
              rounded
            />
          </FormFieldset>
        </div>
        <FormFieldset className="!mb-0">
          <div className="flex gap-4">
            <FormRadio
              id="universal-code"
              name="code-type"
              label="Universal code"
              labelClassName="uppercase !text-sm"
            />
            <FormRadio
              id="personalized-code"
              name="code-type"
              label="Personalized code"
              labelClassName="uppercase !text-sm"
              info={
                <div className="text-dark-gray p-2">
                  Limit one coupon to one person
                </div>
              }
            />
          </div>
        </FormFieldset>
      </div>
      <Button
        className="uppercase shadow-custom-primary mt-8"
        variant="primary"
        iconPosition="right"
        icon={<IconArrowRight />}
        fullWidth
        isRound
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default DealzBuilderStep2;
