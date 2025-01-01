import React from "react";
import classNames from "classnames";
import Image from "next/image";

const FormInput = React.forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder = "",
      disabled = false,
      className = "",
      fullWidth = false,
      rounded = false,
      icon = null,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const baseClass =
      "border border-light-gray h-16 px-6 py-3 text-base text-midnight-blue font-medium focus:outline-dark-gray focus:border-none focus-visible:outline-dark-gray placeholder:text-dark-gray placeholder:text-sm placeholder:font-normal";

    const classes = classNames(
      baseClass,
      { "!w-full": fullWidth, "rounded-[32px]": rounded, "pl-[52px]": icon },
      className
    );

    return (
      <div className={classNames("relative", { "w-full": fullWidth })}>
        {icon && (
          <div
            className={classNames(
              "absolute top-1/2 left-6 transform -translate-y-1/2",
              iconClassName
            )}
          >
            {typeof icon === "string" ? (
              <Image alt="input-icon" src={icon} width={20} height={20} />
            ) : (
              icon
            )}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={classes}
          style={{
            boxShadow: "none",
          }}
          {...props}
        />
      </div>
    );
  }
);

export default FormInput;
