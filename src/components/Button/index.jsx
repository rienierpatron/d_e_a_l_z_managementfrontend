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
      "border bg-white px-6 py-4 flex items-center justify-center gap-2";

    const variantClasses = {
      primary:
        "!bg-primary !text-white !border-primary hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-within:ring-primary",
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
        "!bg-transparent": outlined,
        "!text-primary": primaryOutlined,
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
        {icon && iconPosition === "left" && (
          <Image src={icon} height={20} width={20} />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <Image src={icon} height={20} width={20} />
        )}
      </button>
    );
  }
);

export default Button;
