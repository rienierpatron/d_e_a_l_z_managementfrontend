import * as Yup from "yup";
import { DEALZ } from "./constants";

export const validations = {
  stringRequiredField: Yup.string().required(
    "Required field can not be left blank"
  ),
  stringRequiredWithMaxLength: (maxLength) =>
    Yup.string()
      .required("Required field can not be left blank.")
      .max(maxLength, `Value must be at most ${maxLength} characters.`),
  optionalLink: Yup.string()
    .nullable()
    .url("Please enter a valid http or https URL")
    .optional(),
  audienceGender: Yup.array().min(1, "At least one gender is required"),
  audienceLocation: Yup.array().min(1, "At least one location is required"),
  audienceAgeRange: Yup.array().min(1, "At least one age range is required"),
  businessType: Yup.string().required("Business type is required"),
  businessLocationAddress: Yup.array()
    .of(
      Yup.mixed().test(
        "not-empty",
        "Required field can not be left blank",
        (item) => item && typeof item === "object"
      )
    )
    .min(1, "At least one business location address is required") // Ensures the array has at least one object
    .required("Required field can not be left blank"), // Ensures the array is not null or undefined
  coupon_code_file_url: Yup.string()
    .nullable()
    .when("coupon_creation_type", {
      is: (value) => value === DEALZ.COUPON_CREATION_TYPE.upload,
      then: (schema) => schema.required("Please upload csv file."),
      otherwise: (schema) => schema.optional(),
    }),
  code: Yup.string()
    .nullable()
    .when("coupon_creation_type", {
      is: (value) => value === DEALZ.COUPON_CREATION_TYPE.automatic,
      then: (schema) => schema.required("Required field can not be left blank."),
      otherwise: (schema) => schema.optional(),
    }),
  dealzAmount: Yup.number()
    .nullable()
    .when("offer_type", {
      is: (value) => value && value !== DEALZ.OFFER_TYPE.Other,
      then: (schema) => schema.required("Required field can not be left blank"),
      otherwise: (schema) => schema.optional(),
    }),
};

export const regEx = {
  numberWithDecimal: /^(\d+(\.\d*)?|\.\d*)?$/, // e.g. 123, 123.45, .45
};

/**
 * Common validation function
 * @param {Object} schema - The Yup validation schema to validate against
 * @param {Object} data - The data object to validate
 * @param {Object} options - validation options
 * @returns {Promise<{isValid: boolean, hasError: boolean, errors: string[]}>}
 */
export async function validateFormData(schema, data, options = {}) {
  try {
    await schema.validate(data, { abortEarly: false, ...options });
    return { hasError: false, errors: [] };
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      return {
        hasError: true,
        errors: errors,
      };
    }
  }
}
