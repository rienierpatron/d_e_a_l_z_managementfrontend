import React from "react";
import classNames from "classnames";
import Image from "next/image";

const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "default",
      disabled = false,
      className = "",
      primary,
      isRound,
      borderless,
      fullWidth = false,
      outlined,
      icon = null,
      iconPosition = "left",
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "border bg-white px-6 py-4 flex items-center justify-center gap-2 cursor-pointer";

    const variantClasses = {
      primary:
        "!bg-primary text-white !border-primary hover:!bg-dark-primary focus:outline-none focus-visible:ring-2 focus-within:ring-primary",
    };

    const primaryOutlined = outlined && variant === "primary";

    const componentClass = classNames(
      baseClasses,
      variantClasses[variant],
      className,
      {
        "!w-full": fullWidth,
        "!rounded-[32px]": isRound,
        "!border-0": borderless,
        "!pointer-events-none": disabled,
        "!bg-transparent hover:!bg-transparent": outlined,
        "!text-primary hover:!text-dark-primary hover:!border-dark-primary":
          primaryOutlined,
      }
    );

    return (
      <button
        ref={ref}
        type={type}
        className={componentClass}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {icon &&
          iconPosition === "left" &&
          (typeof icon === "string" ? (
            <Image alt="button-icon" src={icon} height={20} width={20} />
          ) : (
            icon
          ))}
        {children}
        {icon &&
          iconPosition === "right" &&
          (typeof icon === "string" ? (
            <Image alt="button-icon" src={icon} height={20} width={20} />
          ) : (
            icon
          ))}
      </button>
    );
  }
);

export default Button;
