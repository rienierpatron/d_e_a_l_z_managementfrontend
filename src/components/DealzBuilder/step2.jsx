import { useState } from "react";
import * as Yup from "yup";
/**
 * Internal dependencies
 */
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import Typography from "@/components/Common/Typography";
import FormTextArea from "@/components/Common/FormTextArea";
import Button from "@/components/Common/Button";
import IconDollar from "@/components/Icons/IconDollar";
import FormRadio from "@/components/Common/FormRadio";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import BackNavigation from "@/components/Common/BackNavigation";
import FormInput from "@/components/Common/FormInput";
import { DEALZ } from "@/lib/constants";
import IconPercentage from "@/components/Icons/IconPercentage";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";

const DealzBuilderStep2 = ({ formData, setFormData }) => {
  const [error, setError] = useState(null);
  const {
    followup_message,
    link,
    title,
    amount,
    offer_type,
    coupon_code_type,
  } = formData;

  const validationSchema = Yup.object().shape({
    followup_message: validations.stringRequiredWithMaxLength(200),
    title: validations.stringRequiredField,
    amount: validations.dealzAmount,
    link: validations.optionalLink,
  });

  const handleChange = (name, value) => {
    if (name === "followup_message" && value.length > 200) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        text="Follow up message and unique DEALZ code"
        className="text-xl"
        baseClassName="my-8"
        onClick={handlBack}
      />
      <div className="flex flex-col gap-6">
        <FormFieldset className="!mb-0">
          <FormLabel>Add text for follow up message</FormLabel>
          <FormTextArea
            className="bg-light-blue !text-dark-gray text-sm font-normal"
            icon="/icons/tag-2-icon.svg"
            name="followup_message"
            id="followup_message"
            value={followup_message}
            onChange={(e) => handleChange("followup_message", e.target.value)}
            isError={error && error["followup_message"]}
          />
          {error && error["followup_message"] && (
            <FormInputValidation isError text={error["followup_message"]} />
          )}
          <Typography variant="caption" className="text-right mt-4">
            Character: {followup_message?.length ?? 0}/200
          </Typography>
        </FormFieldset>
        <FormFieldset className="!mb-0">
          <FormLabel>Add link to follow up message</FormLabel>
          <FormInput
            className="bg-light-blue"
            icon="/icons/global.svg"
            placeholder="Enter website or booking link"
            fullWidth
            rounded
            name="link"
            id="link"
            value={link}
            onChange={(e) => handleChange("link", e.target.value)}
            isError={error && error["link"]}
          />
          {error && error["link"] && (
            <FormInputValidation isError text={error["link"]} />
          )}
        </FormFieldset>
        <div className="flex gap-6">
          <FormFieldset className="!mb-0 w-full">
            <FormLabel
              info={
                <div className="p-2 text-midnight-blue max-w-[300px]">
                  Enter a descriptive title for the deal to identify it
                  internally.
                </div>
              }
            >
              DEALZ title
            </FormLabel>
            <FormInput
              className="bg-light-blue"
              icon="/icons/tag-2-icon.svg"
              fullWidth
              placeholder="Enter title"
              rounded
              name="title"
              id="title"
              value={title}
              onChange={(e) => handleChange("title", e.target.value)}
              isError={error && error["title"]}
            />
            {error && error["title"] && (
              <FormInputValidation isError text={error["title"]} />
            )}
          </FormFieldset>
          {offer_type && offer_type !== DEALZ.OFFER_TYPE.Other && (
            <FormFieldset className="!mb-0 w-full">
              <FormLabel
                info={
                  <div className="p-2 text-midnight-blue max-w-[300px]">
                    Enter the discount value
                  </div>
                }
              >
                Deal
              </FormLabel>
              <FormInput
                className="bg-light-blue"
                icon={
                  offer_type === DEALZ.OFFER_TYPE.Dollar ? (
                    <IconDollar />
                  ) : (
                    <IconPercentage />
                  )
                }
                fullWidth
                placeholder={
                  offer_type === DEALZ.OFFER_TYPE.Dollar
                    ? "Dollar"
                    : "Percentage"
                }
                rounded
                name="amount"
                id="amount"
                type="number"
                value={amount}
                min={0}
                onChange={(e) => handleChange("amount", e.target.value)}
                isError={error && error["amount"]}
              />
              {error && error["amount"] && (
                <FormInputValidation isError text={error["amount"]} />
              )}
            </FormFieldset>
          )}
        </div>
        <FormFieldset className="!mb-0">
          <div className="flex gap-4">
            <FormRadio
              id={DEALZ.COUPON_CODE_TYPE.universal}
              name="coupon_code_type"
              label="Universal code"
              labelClassName="!text-sm"
              checked={DEALZ.COUPON_CODE_TYPE.universal === coupon_code_type}
              value={coupon_code_type}
              info={
                <div className="p-2 text-midnight-blue max-w-[300px]">
                  Enter code that can be used by all users for this deal.
                </div>
              }
            />
            {/* <FormRadio
              id="personalized-code"
              name="code-type"
              label="Personalized code"
              labelClassName="uppercase !text-sm"
              info={
                <div className="text-dark-gray p-2">
                  Limit one coupon to one person
                </div>
              }
            /> */}
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
