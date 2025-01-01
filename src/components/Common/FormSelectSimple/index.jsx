/**
 * External dependencies
 */
import classNames from "classnames";
import Image from "next/image";

const FormSelectSimple = ({
  icon,
  options = [],
  className,
  rounded,
  onChange,
  placeHolder,
  defaultValue,
  value,
  ...props
}) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div className="relative">
      {icon && (
        <Image
          alt="input-icon"
          src={icon}
          width={20}
          height={20}
          className="absolute top-1/2 left-6 transform -translate-y-1/2"
        />
      )}
      <select
        defaultValue={defaultValue ? defaultValue : ""}
        className={classNames(
          "text-base text-midnight-blue font-medium border-light-gray w-full h-16 px-6 py-3 focus:outline-dark-gray focus:border-none focus-visible:outline-dark-gray",
          {
            "rounded-[32px]": rounded,
            "pl-[52px]": icon,
            "!text-dark-gray text-sm": placeHolder && (!value && !defaultValue), // Change color for placeholder
          },
          className
        )}
        style={{
          boxShadow: "none",
        }}
        value={value}
        {...props}
        onChange={handleChange}
      >
        {placeHolder && (
          <option value="" hidden>
            {placeHolder}
          </option>
        )}
        {options &&
          options.length &&
          options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default FormSelectSimple;
