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

const DealzBuilderStep4 = ({ formData, setFormData }) => {
  const [error, setError] = useState(null);
  const { valid_date_from, valid_date_to } = formData;

  const validationSchema = Yup.object().shape({
    valid_date_from: validations.stringRequiredField,
    valid_date_to: validations.stringRequiredField,
  });

  const handlBack = () => {
    setFormData({
      ...formData,
      step: formData.step - 1,
    });
  };

  const handleNext = async() => {
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
        <div className="flex items-center justify-between gap-4">
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
