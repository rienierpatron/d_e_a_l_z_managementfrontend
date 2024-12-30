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

const DealzBuilderStep1 = ({ formData, setFormData }) => {
  const handleNext = () => {
    setFormData({
      ...formData,
      step: formData.step + 1,
    });
  };
  return (
    <div>
      <Typography variant="heading" className="my-8">
        Add DEALZ text
      </Typography>
      <div className="flex flex-col gap-6">
        <FormFieldset className="!mb-0">
          <FormLabel className="uppercase">
            Enter deal one liner for broadcast
          </FormLabel>
          <FormTextArea
            className="bg-light-blue !text-dark-gray text-sm font-normal"
            icon="/icons/tag-2-icon.svg"
          />
          <Typography variant="caption" className="text-right mt-4">
            Max. 115 characters
          </Typography>
        </FormFieldset>
        <FormFieldset className="!mb-0">
          <FormLabel className="uppercase">Deal</FormLabel>
          <div className="flex gap-4">
            <Button
              className="hover:text-secondary font-medium hover:border-secondary"
              icon={<IconDollar />}
              isRound
            >
              Dollars
            </Button>
            <Button
              className="hover:text-secondary font-medium hover:border-secondary"
              icon={<IconPercentage />}
              isRound
            >
              Percentage
            </Button>
          </div>
        </FormFieldset>
        <div className="bg-primary-40 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <FormLabel className="uppercase !mb-0">hero deal</FormLabel>
            <Typography className="!text-gold text-sm bg-white p-2 rounded-md w-max">
              Add-on
            </Typography>
          </div>
          <FilePicker onFileSelect={(file) => {}} className="w-max">
            <Button
              icon={<IconUploadFile />}
              className="flex-col border-dashed rounded-2xl"
            >
              Upload Image
            </Button>
          </FilePicker>
        </div>
        <FormFieldset className="mb-0">
          <div className="flex items-center justify-between">
            <FormLabel className="uppercase !mb-0">Type of Coupon</FormLabel>
            <Button
              className="underline !p-0"
              icon={<IconDownload />}
              iconPosition="right"
              borderless
              variant="primary"
              outlined
            >
              Download coupon template
            </Button>
          </div>
          <div className="flex gap-4 mt-6">
            <FormRadio
              id="dealz-code"
              name="coupon-code"
              label="Create DEALZ Codes"
              labelClassName="text-midnight-blue !text-base"
            />
            <FormRadio
              id="own-code"
              name="coupon-code"
              label="Upload your own codes"
              labelClassName="text-midnight-blue !text-base"
            />
          </div>
        </FormFieldset>
        <FormFieldset className="flex flex-row-reverse justify-end gap-4">
          <FilePicker onFileSelect={(file) => {}}>
            <Button
              icon={<IconUploadFile />}
              className="flex-col border-dashed rounded-2xl !bg-light-blue text-dark-gray"
            >
              Upload CSV
            </Button>
          </FilePicker>
          <div className="flex flex-col gap-[6px] w-max justify-center">
            <div className="relative p-4 rounded-2xl border border-light-gray w-max">
              <div className="absolute -right-1 -top-3 bg-white border border-light-gray rounded-full h-6 w-6 flex items-center justify-center">
                <IconClose className="cursor-pointer" />
              </div>
              <Image src="/icons/csv-preview.svg" width={48} height={48} />
            </div>
            <Typography variant="caption">Coupon.csv</Typography>
          </div>
        </FormFieldset>
      </div>
      <Button
        className="uppercase shadow-custom-primary"
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

export default DealzBuilderStep1;
