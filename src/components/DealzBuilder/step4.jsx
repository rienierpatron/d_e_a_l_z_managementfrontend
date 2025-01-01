/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import BackNavigation from "@/components/Common/BackNavigation";
import CustomDatePicker from "@/components/Common/DatePicker";

const DealzBuilderStep4 = ({ formData, setFormData }) => {
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
        text="Valid Between"
        className="text-xl"
        baseClassName="my-8"
        onClick={handlBack}
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <CustomDatePicker
            id="start-date"
            className="w-full"
            placeholder="Start date"
            inputClassName="!bg-light-blue !rounded-[32px]"
            onChange={(value) => {}}
          />
          <CustomDatePicker
            id="end-date"
            placeholder="End date"
            inputClassName="!bg-light-blue !rounded-[32px]"
            className="w-full"
          />
        </div>
      </div>
      <Typography
        variant="body"
        className="!text-secondary underline font-medium cursor-pointer text-center mt-[60px]"
      >
        2 Slots remaining from 5 slots
      </Typography>
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

export default DealzBuilderStep4;
