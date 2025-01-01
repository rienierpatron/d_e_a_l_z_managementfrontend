/**
 * External dependencies
 */
import classNames from "classnames";
/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import BackNavigation from "@/components/Common/BackNavigation";
import IconStar from "@/components/Icons/IconStar";
import IconCrown from "@/components/Icons/IconCrown";
import CustomDatePicker from "@/components/Common/DatePicker";
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";

const DealzBuilderStep3 = ({ formData, setFormData }) => {
  const activePlan = "daily_dealz";

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
        text="Select Slot Date"
        className="text-xl"
        baseClassName="my-8"
        onClick={handlBack}
      />
      <div className="flex flex-col gap-6">
        <div className="bg-[#F1F3F6] rounded-[32px] flex items-center justify-between p-1">
          <div
            className={classNames(
              "flex items-center gap-1 cursor-pointer w-full justify-center p-2 hover:bg-white hover:text-primary rounded-[32px]",
              {
                "bg-white text-primary": activePlan === "daily_dealz",
              }
            )}
          >
            <IconStar />
            <Typography variant="small">Create a daily deal</Typography>
          </div>
          <div
            className={classNames(
              "flex items-center gap-1 cursor-pointer w-full justify-center p-2 hover:bg-white hover:text-primary rounded-[32px]",
              {
                "bg-white text-primary": activePlan === "weekly_dealz",
              }
            )}
          >
            <IconCrown />
            <Typography variant="small" className="">
              Create a weekly deal (Premium)
            </Typography>
          </div>
        </div>
        <CustomDatePicker
          id="slot-date"
          className="w-full"
          inputClassName="!bg-light-blue !rounded-[32px]"
          value={new Date()}
        />
        <Button
          icon="/icons/crown-gradient.svg"
          className="w-max text-sm font-semibold bg-[linear-gradient(104deg,rgba(65,119,244,0.08)_11.43%,rgba(249,69,177,0.08)_82.92%)] border-none rounded-3xl !p-[10px]"
        >
          <span className="bg-[linear-gradient(104deg,#4177F4_11.43%,#F945B1_82.92%)] bg-clip-text text-transparent">
            Upgrade to premium to select time of day
          </span>
        </Button>
        <FormFieldset className="!mb-0">
          <FormLabel className="uppercase !mb-6">Pick time of day</FormLabel>
          <div className="flex items-center gap-3">
            <Button
              className="!bg-[#F1F3F6] text-dark-gray text-sm font-semibold"
              isRound
            >
              Morning (10am-1pm)
            </Button>
            <Button
              className="!bg-[#F1F3F6] text-dark-gray text-sm font-semibold"
              isRound
            >
              Evening (5pm-10pm)
            </Button>
          </div>
        </FormFieldset>
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

export default DealzBuilderStep3;
