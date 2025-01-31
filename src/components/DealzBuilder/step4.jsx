/**
 * External dependencies
 */
import { useState } from "react";
import * as Yup from "yup";

/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import BackNavigation from "@/components/Common/BackNavigation";
import CustomDatePicker from "@/components/Common/DatePicker";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";

const DealzBuilderStep4 = ({ formData, setFormData, currentSubscription }) => {
  const [error, setError] = useState(null);
  const { valid_date_from, valid_date_to } = formData;

  const validationSchema = Yup.object().shape({
    valid_date_from: validations.stringRequiredField
      .test("is-future-date", "Cannot select a past date.", (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      })
      .test(
        "is-before-slot-date",
        "Start date from cannot be later than slot date",
        function (value) {
          const { slot_date } = this.parent;
          return !slot_date || !value || new Date(value) <= new Date(slot_date);
        }
      ),
    valid_date_to: validations.stringRequiredField
      .test(
        "is-after-start-date",
        "End date must be after or equal to start date",
        function (value) {
          const { valid_date_from } = this.parent;
          return (
            !valid_date_from ||
            !value ||
            new Date(value) >= new Date(valid_date_from)
          );
        }
      )
      .test(
        "is-after-slot-date",
        "End date to cannot be earlier than slot date",
        function (value) {
          const { slot_date } = this.parent;
          return !slot_date || !value || new Date(value) >= new Date(slot_date);
        }
      ),
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

  return (
    <div>
      <BackNavigation
        text="Valid Between"
        className="text-xl"
        baseClassName="my-8"
        onClick={handlBack}
      />
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <CustomDatePicker
              id="valid_date_from"
              className="w-full"
              placeholder="Start date"
              inputClassName="!bg-light-blue !rounded-[32px]"
              value={valid_date_from ? new Date(valid_date_from) : null}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  valid_date_from: formatDateToYYYYMMDD(date),
                })
              }
            />
            {error && error["valid_date_from"] && (
              <FormInputValidation isError text={error["valid_date_from"]} />
            )}
          </div>
          <div className="w-full">
            <CustomDatePicker
              id="valid_date_to"
              placeholder="End date"
              inputClassName="!bg-light-blue !rounded-[32px]"
              className="w-full"
              minDate={valid_date_from ? new Date(valid_date_from) : null}
              value={valid_date_to ? new Date(valid_date_to) : null}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  valid_date_to: formatDateToYYYYMMDD(date),
                })
              }
            />
            {error && error["valid_date_to"] && (
              <FormInputValidation isError text={error["valid_date_to"]} />
            )}
          </div>
        </div>
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

export default DealzBuilderStep4;
