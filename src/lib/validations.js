import * as Yup from "yup";

export const validations = {
  stringRequiredField: Yup.string().required(
    "Required field can not be left blank"
  ),
  businessType: Yup.string().required("Business type is required"),
  businessLocation: Yup.array()
    .min(1, "At least one business location is required")
    .required("Required field can not be left blank"),
  businessLocationAddress: Yup.array()
    .of(
      Yup.string()
        .trim()
        .min(1, "Required field can not be left blank") // Ensures no empty strings
        .required("Required field can not be left blank") // Ensures each address is not null or undefined
    )
    .min(1, "At least one business location address is required")
    .required("Required field can not be left blank"),
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
