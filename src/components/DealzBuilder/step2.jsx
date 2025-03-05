import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
/**
 * Internal dependencies
 */
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";
import Typography from "@/components/Common/Typography";
import FormTextArea from "@/components/Common/FormTextArea";
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import BackNavigation from "@/components/Common/BackNavigation";
import FormInput from "@/components/Common/FormInput";
import { validateFormData, validations } from "@/lib/validations";
import FormInputValidation from "@/components/Common/FormInputValidation";
import UploadDealzImage from "./UploadDealzImage";
import IconTextBlock from "../Icons/IconTextBlock";

const DealzBuilderStep2 = ({ formData, setFormData, setIsFormDirty }) => {
  const [error, setError] = useState(null);
  const { dealz_text, cta_link_text, link, title } = formData;
  const textareaRef = useRef(null);

  const validationSchema = Yup.object().shape({
    dealz_text: validations.stringRequiredWithMaxLength(500),
    cta_link_text: validations.stringRequiredWithMaxLength(20),
    link: validations.requiredLink,
    title: validations.stringRequiredField,
    dealz_image: validations.stringRequiredField,
  });

  useEffect(() => {
    if (dealz_text?.length) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to new height
    }
  }, [dealz_text]);

  const handleChange = (name, value) => {
    setIsFormDirty(true);
    if (name === "dealz_text" && value.length > 500) {
      return;
    }
    if (name === "cta_link_text" && value.length > 20) {
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
        text="Create your DEAL"
        className="text-xl"
        baseClassName="my-8"
        onClick={handlBack}
      />
      <div className="flex flex-col gap-6">
        <FormFieldset className="!mb-0">
          <div className="!text-xs font-medium italic !text-dark-gray my-5">
            Ensure your deal complies with DEALZ{" "}
            <a
              className="text-secondary cursor-pointer underline"
              href="https://www.dealz.asia/requirements-101"
              target="_blank"
            >
              requirements and guidelines
            </a>{" "}
            to avoid rejection
          </div>
          <FormLabel>Add deal text</FormLabel>
          <FormTextArea
            ref={textareaRef}
            className="bg-light-blue !text-dark-gray text-sm font-normal"
            icon="/icons/tag-2-icon.svg"
            name="dealz_text"
            id="dealz_text"
            value={dealz_text}
            onChange={(e) => handleChange("dealz_text", e.target.value)}
            isError={error && error["dealz_text"]}
          />
          {error && error["dealz_text"] && (
            <FormInputValidation isError text={error["dealz_text"]} />
          )}
          <Typography variant="caption" className="text-right mt-4">
            Character: {dealz_text?.length ?? 0}/500
          </Typography>
        </FormFieldset>
        <FormFieldset className="!mb-0">
          <FormLabel>Button link</FormLabel>
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
        <FormFieldset className="!mb-0 w-full">
          <FormLabel>Button link text</FormLabel>
          <FormInput
            className="bg-light-blue"
            icon={<IconTextBlock />}
            fullWidth
            placeholder="Enter button link text"
            rounded
            name="cta_link_text"
            id="cta_link_text"
            value={cta_link_text}
            onChange={(e) => handleChange("cta_link_text", e.target.value)}
            isError={error && error["cta_link_text"]}
          />
          {error && error["cta_link_text"] && (
            <FormInputValidation isError text={error["cta_link_text"]} />
          )}
          <Typography variant="caption" className="text-right mt-4">
            Character: {cta_link_text?.length ?? 0}/20
          </Typography>
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
        </div>
        <FormFieldset className="!mb-0 w-full">
          <FormLabel>DEALZ image</FormLabel>
          <UploadDealzImage
            formData={formData}
            setFormData={setFormData}
            error={error}
          />
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
