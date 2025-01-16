import * as Yup from "yup";

export const validations = {
  stringRequiredField: Yup.string().required(
    "Required field can not be left blank"
  ),
  businessType: Yup.string().required("Business type is required"),
  businessLocationAddress: Yup.array()
    .min(1, "At least one business location address is required") // Ensures the array has at least one object
    .required("Required field can not be left blank"), // Ensures the array is not null or undefined
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
