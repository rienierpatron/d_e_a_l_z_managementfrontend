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
import FormTextArea from "@/components/Common/FormTextArea";
import Button from "@/components/Common/Button";
import IconDollar from "@/components/Icons/IconDollar";
import IconPercentage from "@/components/Icons/IconPercentage";
import IconDownload from "@/components/Icons/IconDownload";
import FormRadio from "@/components/Common/FormRadio";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import { DEALZ } from "@/lib/constants";
import UploadHeroImage from "./UploadHeroImage";
import UploadDealzCodes from "./UploadDealzCodes";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";
import { helper } from "@/helpers";
import { api } from "@/api";
import FormInput from "../Common/FormInput";
import IconCoupon from "../Icons/IconCoupon";

const DealzBuilderStep1 = ({
  formData,
  setFormData,
  dealzId,
  currentSubscription,
}) => {
  const { initial_message, offer_type, coupon_creation_type, code } = formData;
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    initial_message: validations.stringRequiredWithMaxLength(115),
    offer_type: validations.stringRequiredField,
    coupon_creation_type: validations.stringRequiredField,
    coupon_code_file_url: validations.coupon_code_file_url,
    code: validations.code,
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
    if (name === "initial_message" && value.length > 115) {
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

  return (
    <div>
      <Typography variant="heading" className="my-8">
        Add DEALZ text
      </Typography>
      <div className="flex flex-col gap-6">
        <FormFieldset className="!mb-0">
          <FormLabel>Enter deal one liner for broadcast</FormLabel>
          <FormTextArea
            className="bg-light-blue !text-dark-gray text-sm font-normal"
            icon="/icons/tag-2-icon.svg"
            name="initial_message"
            id="initial_message"
            value={initial_message}
            onChange={(e) => handleChange("initial_message", e.target.value)}
            isError={error && error["initial_message"]}
          />
          {error && error["initial_message"] && (
            <FormInputValidation isError text={error["initial_message"]} />
          )}
          <Typography variant="caption" className="text-right mt-4">
            Character: {initial_message?.length ?? 0}/115
          </Typography>
        </FormFieldset>
        <FormFieldset className="!mb-0">
          <FormLabel>Deal</FormLabel>
          <div className="flex gap-4">
            <Button
              className={classNames(
                "hover:text-secondary font-medium hover:border-secondary",
                {
                  "text-secondary border-secondary":
                    DEALZ.OFFER_TYPE.Dollar === offer_type,
                }
              )}
              icon={<IconDollar />}
              isRound
              onClick={() => handleClickOfferType(DEALZ.OFFER_TYPE.Dollar)}
            >
              Dollars
            </Button>
            <Button
              className={classNames(
                "hover:text-secondary font-medium hover:border-secondary",
                {
                  "text-secondary border-secondary":
                    DEALZ.OFFER_TYPE.Percentage === offer_type,
                }
              )}
              icon={<IconPercentage />}
              isRound
              onClick={() => handleClickOfferType(DEALZ.OFFER_TYPE.Percentage)}
            >
              Percentage
            </Button>
            <Button
              className={classNames(
                "hover:text-secondary font-medium hover:border-secondary",
                {
                  "text-secondary border-secondary":
                    DEALZ.OFFER_TYPE.Other === offer_type,
                }
              )}
              isRound
              onClick={() => handleClickOfferType(DEALZ.OFFER_TYPE.Other)}
            >
              Other
            </Button>
          </div>
          {error && error["offer_type"] && (
            <FormInputValidation isError text={error["offer_type"]} />
          )}
        </FormFieldset>
        {helper.notEmpty(currentSubscription?.subscription) &&
          currentSubscription?.available_inventory?.banner > 0 && (
            <div className="bg-primary-40 rounded-2xl px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <FormLabel className="!mb-0">Hero deal</FormLabel>
                <Typography className="!text-gold text-sm bg-white p-2 rounded-md w-max">
                  Add-on
                </Typography>
              </div>
              <UploadHeroImage formData={formData} setFormData={setFormData} />
            </div>
          )}
        <FormFieldset className="mb-0">
          <div className="flex items-center justify-between">
            <FormLabel className="!mb-0">Type of coupon</FormLabel>
            <Button
              className="underline !p-0"
              icon={<IconDownload />}
              iconPosition="right"
              borderless
              variant="primary"
              outlined
              onClick={downloadFile}
            >
              Download coupon template
            </Button>
          </div>
          <div className="flex gap-4 mt-6">
            <FormRadio
              id="automatic"
              name="coupon_creation_type"
              label="Create DEALZ codes"
              labelClassName="text-midnight-blue !text-base"
              checked={
                DEALZ.COUPON_CREATION_TYPE.automatic === coupon_creation_type
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coupon_creation_type: DEALZ.COUPON_CREATION_TYPE.automatic,
                })
              }
            />
            <FormRadio
              id="upload"
              name="coupon_creation_type"
              label="Upload your own codes"
              labelClassName="text-midnight-blue !text-base"
              checked={
                DEALZ.COUPON_CREATION_TYPE.upload === coupon_creation_type
              }
              onChange={(e) =>
                handleChange(
                  "coupon_creation_type",
                  DEALZ.COUPON_CREATION_TYPE.upload
                )
              }
            />
          </div>
          {error && error["coupon_creation_type"] && (
            <FormInputValidation isError text={error["coupon_creation_type"]} />
          )}
        </FormFieldset>
        {coupon_creation_type === DEALZ.COUPON_CREATION_TYPE.upload && (
          <FormFieldset className="flex flex-col justify-end gap-2">
            <UploadDealzCodes
              formData={formData}
              setFormData={setFormData}
              dealzId={dealzId}
            />
            {error && error["coupon_code_file_url"] && (
              <FormInputValidation
                isError
                text={error["coupon_code_file_url"]}
              />
            )}
          </FormFieldset>
        )}
        {coupon_creation_type === DEALZ.COUPON_CREATION_TYPE.automatic && (
          <div className="flex items-center">
            <FormFieldset className="mb-0">
              <FormLabel>Coupon code</FormLabel>
              <FormInput
                className="bg-light-blue"
                icon={<IconCoupon />}
                placeholder="Coupon code"
                fullWidth
                rounded
                name="code"
                id="code"
                value={code}
                onChange={(e) => handleChange("code", e.target.value)}
                isError={error && error["code"]}
              />
              {error && error["code"] && (
                <FormInputValidation isError text={error["code"]} />
              )}
            </FormFieldset>
            <Button
              borderless
              outlined
              className="text-secondary underline"
              onClick={() => createCouponCode()}
            >
              Generete coupon code
            </Button>
          </div>
        )}
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
