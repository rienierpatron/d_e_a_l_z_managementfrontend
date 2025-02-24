/**
 * External dependencies
 */
import classNames from "classnames";
import * as Yup from "yup";
import { useEffect, useState } from "react";
/**
 * Internal dependencies
 */
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import IconDollar from "@/components/Icons/IconDollar";
import IconPercentage from "@/components/Icons/IconPercentage";
import IconDownload from "@/components/Icons/IconDownload";
import FormRadio from "@/components/Common/FormRadio";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import { DEALZ, SUBSCRIPTIONS } from "@/lib/constants";
import UploadHeroImage from "./UploadDealzImage";
import UploadDealzCodes from "./UploadDealzCodes";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";
import { helper } from "@/helpers";
import { api } from "@/api";
import FormInput from "../Common/FormInput";
import IconCoupon from "../Icons/IconCoupon";
import IconBuildings from "../Icons/IconBuildings";
import IconStar from "../Icons/IconStar";
import IconCrown from "../Icons/IconCrown";
import CustomDatePicker from "../Common/DatePicker";
import { formatDateToYYYYMMDD } from "@/lib/date";

const DealzBuilderStep1 = ({
  formData,
  setFormData,
  dealzId,
  currentSubscription,
  setIsFormDirty,
}) => {
  const {
    initial_cta_text,
    slot_date,
    slot_time,
    daily_deal,
    weekly_deal,
  } = formData;
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    initial_cta_text: validations.stringRequiredWithMaxLength(20),
    slot_date: validations.stringRequiredField.test(
      "is-future-date",
      "Cannot select a past date.",
      (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }
    ),
  });

  const createCouponCode = async () => {
    try {
      const res = await api.dealz.createCouponCode();
      if (res.status === "ok") {
        setFormData({
          ...formData,
          code: res.data.code,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => {
    setIsFormDirty(true);
    if (name === "initial_cta_text" && value.length > 20) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickOfferType = (offerType) => {
    setFormData({
      ...formData,
      offer_type: offerType,
    });
    setIsFormDirty(true);
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

  const downloadFile = () => {
    const fileUrl = "/files/dealz_codes_template.csv";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "dealz_codes_template.csv"; // Specify the file name for download
    link.click();
  };

  // const allowWeeklyDeal = () => {
  //   if (
  //     currentSubscription?.subscription &&
  //     !banner_image &&
  //     currentSubscription?.available_inventory?.weekly_dealz > 0
  //   ) {
  //     return true;
  //   }
  //   if (
  //     banner_image &&
  //     currentSubscription?.subscription &&
  //     currentSubscription?.available_inventory?.weekly_banner_dealz > 0
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

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
      <Typography variant="heading" className="my-8">
        Schedule your DEAL
      </Typography>
      <div className="flex flex-col gap-6">
        <FormFieldset className="!mb-0">
          <FormLabel>Initial button text</FormLabel>
          <FormInput
            className="bg-light-blue"
            icon={<IconBuildings />}
            placeholder="e.g. Acme"
            fullWidth
            rounded
            name="initial_cta_text"
            id="initial_cta_text"
            value={initial_cta_text}
            onChange={(e) => handleChange("initial_cta_text", e.target.value)}
            isError={error && error["initial_cta_text"]}
          />
          {error && error["initial_cta_text"] && (
            <FormInputValidation isError text={error["initial_cta_text"]} />
          )}
          <Typography variant="caption" className="text-right mt-4">
            Character: {initial_cta_text?.length ?? 0}/20
          </Typography>
        </FormFieldset>
        <div className="flex flex-col gap-6">
          <div className="bg-[#F1F3F6] rounded-[32px] flex items-center justify-between p-1">
            <div
              className={classNames(
                "flex items-center gap-1 cursor-pointer w-full justify-center p-2 hover:bg-white hover:text-primary rounded-[32px]",
                {
                  "bg-white text-primary": daily_deal === true,
                }
              )}
              onClick={() => {
                setFormData({
                  ...formData,
                  daily_deal: true,
                  weekly_deal: false,
                });
                setIsFormDirty(true);
              }}
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
              onClick={() => {
                setIsFormDirty(true);
                setFormData({
                  ...formData,
                  weekly_deal: true,
                  daily_deal: false,
                  slot_date: null,
                });
              }}
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
                Slot date for weekly DEALZ can only be set on mondays.
              </Typography>
            </div>
          )}
          <FormFieldset className="!mb-0">
            <CustomDatePicker
              id="slot_date"
              name="slot_date"
              className="w-full"
              inputClassName="!bg-light-blue !rounded-[32px]"
              key={Date.now()}
              value={slot_date ? new Date(slot_date) : null}
              placeholder="Select slot date"
              onChange={(date) => {
                setIsFormDirty(true);
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
              <FormLabel
                className="!mb-6"
                info={
                  <div className="p-2 text-midnight-blue max-w-[300px]">
                    Select the time of day for the deal to be sent as a
                    broadcast.
                  </div>
                }
              >
                Pick time of day
              </FormLabel>
              <div className="flex items-center gap-3">
                <Button
                  className={classNames(
                    "!bg-[#F1F3F6] text-dark-gray text-sm font-semibold",
                    {
                      "border-dark-gray": slot_time === DEALZ.SLOT_TIME.MORNING,
                    }
                  )}
                  isRound
                  onClick={() => {
                    setIsFormDirty(true);
                    setFormData({
                      ...formData,
                      slot_time: DEALZ.SLOT_TIME.MORNING,
                    });
                  }}
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
                  onClick={() => {
                    setIsFormDirty(true);
                    setFormData({
                      ...formData,
                      slot_time: DEALZ.SLOT_TIME.EVENING,
                    });
                  }}
                >
                  Evening (5pm-10pm)
                </Button>
              </div>
            </FormFieldset>
          )}
        </div>
        <Typography className="!text-xs italic !font-medium !text-dark-gray my-4">
          ** Your registered logo will be used for this promotion. If you need to
          update your logo, contact DEALZ support. **
        </Typography>
      </div>
      <Button
        className="uppercase shadow-custom-primary !mt-4"
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
