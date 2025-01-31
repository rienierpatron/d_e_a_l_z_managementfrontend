/**
 * External dependencies
 */
import { useState } from "react";
import classNames from "classnames";
import * as Yup from "yup";
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
import { formatDateToYYYYMMDD } from "@/lib/date";
import { DEALZ, SUBSCRIPTIONS } from "@/lib/constants";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";

const DealzBuilderStep3 = ({ formData, setFormData, currentSubscription }) => {
  const [error, setError] = useState(null);
  const { slot_date, slot_time, daily_deal, weekly_deal, banner_image } =
    formData;

  const validationSchema = Yup.object().shape({
    slot_date: validations.stringRequiredField,
  });

  const handlBack = () => {
    setFormData({
      ...formData,
      step: formData.step - 1,
    });
  };

  const handleNext = async () => {
    const { hasError, errors } = await validateFormData(
      validationSchema,
      formData
    );
    if (hasError) {
      setError(errors);
      return;
    }
    setFormData({
      ...formData,
      step: formData.step + 1,
    });
  };

  const allowWeeklyDeal = () => {
    if (
      currentSubscription?.subscription &&
      !banner_image &&
      currentSubscription?.available_inventory?.weekly_dealz > 0
    ) {
      return true;
    }
    if (
      banner_image &&
      currentSubscription?.subscription &&
      currentSubscription?.available_inventory?.weekly_banner_dealz > 0
    ) {
      return true;
    }
    return false;
  };

  const getValidMondayDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      // If date is null or invalid, return the current date or handle it accordingly
      return new Date();
    }

    // Function to check if the date is Monday
    const isMonday = (date) => date.getDay() === 1;

    // If the selected date is not a Monday, adjust it to the previous Monday
    if (!isMonday(date)) {
      const getPreviousMonday = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = day === 0 ? -6 : 1 - day; // If Sunday, go back 6 days to the previous Monday
        d.setDate(d.getDate() + diff);
        return d;
      };
      return getPreviousMonday(date);
    }
    return date;
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
                "bg-white text-primary": daily_deal === true,
              }
            )}
            onClick={() =>
              setFormData({
                ...formData,
                daily_deal: true,
                weekly_deal: false,
              })
            }
          >
            <IconStar />
            <Typography variant="small">Create a daily deal</Typography>
          </div>
          <div
            className={classNames(
              "flex items-center gap-1 cursor-pointer w-full justify-center p-2 hover:bg-white hover:text-primary rounded-[32px]",
              {
                "bg-white text-primary": weekly_deal === true,
                // "!cursor-not-allowed hover:text-midnight-blue hover:bg-[#F1F3F6]":
                //   !allowWeeklyDeal(),
              }
            )}
            onClick={() =>
              setFormData({
                ...formData,
                weekly_deal: true,
                daily_deal: false,
              })
            }
          >
            <IconCrown />
            <Typography variant="small" className="">
              Create a weekly deal (Premium)
            </Typography>
          </div>
        </div>
        {weekly_deal === true && (
          <div>
            <Typography
              variant="caption"
              className="bg-[linear-gradient(-80deg,#4177F4_11.43%,#F945B1_82.92%)] bg-clip-text text-transparent !font-bold"
            >
              Slot date for Weekly Deals can only be set on Mondays.
            </Typography>
          </div>
        )}
        <FormFieldset className="!mb-0">
          <CustomDatePicker
            id="slot_date"
            name="slot_date"
            className="w-full"
            inputClassName="!bg-light-blue !rounded-[32px]"
            value={slot_date ? new Date(slot_date) : null}
            placeholder="Select date"
            onChange={(date) => {
              let validateDate = date; // Default to the selected date

              // Check if weekly_deal is true and adjust the date to the previous Monday if necessary
              if (weekly_deal === true) {
                validateDate = getValidMondayDate(date);
              }

              setFormData({
                ...formData,
                slot_date: formatDateToYYYYMMDD(validateDate),
              });
            }}
          />
          {error && error["slot_date"] && (
            <FormInputValidation isError text={error["slot_date"]} />
          )}
        </FormFieldset>
        {currentSubscription?.subscription?.subscription_name?.toLowerCase() !==
          SUBSCRIPTIONS.SUBSCRIPTION_TYPES.Pro && (
          <Button
            icon="/icons/crown-gradient.svg"
            className="w-max text-sm font-semibold bg-[linear-gradient(104deg,rgba(65,119,244,0.08)_11.43%,rgba(249,69,177,0.08)_82.92%)] border-none rounded-3xl !p-[10px]"
          >
            <span className="bg-[linear-gradient(104deg,#4177F4_11.43%,#F945B1_82.92%)] bg-clip-text text-transparent">
              Upgrade to premium to select time of day
            </span>
          </Button>
        )}
        {currentSubscription?.subscription?.subscription_name?.toLowerCase() ===
          SUBSCRIPTIONS.SUBSCRIPTION_TYPES.Pro && (
          <FormFieldset className="!mb-0">
            <FormLabel className="uppercase !mb-6">Pick time of day</FormLabel>
            <div className="flex items-center gap-3">
              <Button
                className={classNames(
                  "!bg-[#F1F3F6] text-dark-gray text-sm font-semibold",
                  {
                    "border-dark-gray": slot_time === DEALZ.SLOT_TIME.MORNING,
                  }
                )}
                isRound
                onClick={() =>
                  setFormData({
                    ...formData,
                    slot_time: DEALZ.SLOT_TIME.MORNING,
                  })
                }
              >
                Morning (10am-1pm)
              </Button>
              <Button
                className={classNames(
                  "!bg-[#F1F3F6] text-dark-gray text-sm font-semibold",
                  {
                    "border-dark-gray": slot_time === DEALZ.SLOT_TIME.EVENING,
                  }
                )}
                isRound
                onClick={() =>
                  setFormData({
                    ...formData,
                    slot_time: DEALZ.SLOT_TIME.EVENING,
                  })
                }
              >
                Evening (5pm-10pm)
              </Button>
            </div>
          </FormFieldset>
        )}
      </div>
      <Typography
        variant="body"
        className="!text-secondary underline font-medium text-center mt-[60px]"
      >
        {`${
          currentSubscription?.available_inventory?.slot ?? 0
        } Slots remaining from ${
          currentSubscription?.available_inventory?.allowed_slot ?? 0
        } slots`}
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
