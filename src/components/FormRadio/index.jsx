import classNames from "classnames";
import { Radio } from "flowbite-react";
import FormLabel from "../FormLabel";

const FormRadio = ({
  id,
  checked,
  className,
  required,
  label,
  labelClassName,
  ...props
}) => {
  return (
    <div className="flex items-center gap-[8px]">
      <Radio
        id={id}
        checked={checked}
        className={classNames(
          "text-secondary ring-secondary shadow-secondary focus:ring-secondary",
          className
        )}
        {...props}
      />
      {label && (
        <FormLabel
          htmlFor={id}
          className={classNames("!mb-0", labelClassName)}
          required={required}
        >
          {label}
        </FormLabel>
      )}
    </div>
  );
};

export default FormRadio;
