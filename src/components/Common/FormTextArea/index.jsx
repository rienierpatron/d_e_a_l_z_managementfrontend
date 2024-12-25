import React from "react";
import classNames from "classnames";
import Image from "next/image";

const FormTextArea = React.forwardRef(
  ({ className, icon = null, iconClassName, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <Image
            alt="input-icon"
            src={icon}
            width={20}
            height={20}
            className={classNames(
              "absolute top-3 left-6 transform",
              iconClassName
            )}
          />
        )}
        <textarea
          ref={ref}
          className={classNames(
            "rounded-2xl resize-none border border-light-gray min-h-[100px] w-full px-6 py-3 text-base text-midnight-blue font-medium focus:outline-dark-gray focus:border-none focus-visible:outline-dark-gray placeholder:text-dark-gray placeholder:text-sm",
            { "pl-[52px]": icon },
            className
          )}
          style={{
            boxShadow: "none",
          }}
          {...props}
        />
      </div>
    );
  }
);

export default FormTextArea;
