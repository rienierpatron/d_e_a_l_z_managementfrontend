import classNames from "classnames";
import { Radio } from "flowbite-react";
import FormLabel from "@/components/common/FormLabel";

const FormRadio = ({
  id,
  checked,
  className,
  required,
  label,
  labelClassName,
  info,
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
          className={classNames("!mb-0 cursor-pointer", labelClassName)}
          required={required}
          info={info}
        >
          {label}
        </FormLabel>
      )}
    </div>
  );
};

export default FormRadio;
