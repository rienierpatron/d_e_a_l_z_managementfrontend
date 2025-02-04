/**
 * External dependencies
 */
import React from "react";
import classNames from "classnames";
import { Popover } from "flowbite-react";

/**
 * Internal dependencies
 */
import IconInfoOutlined from "@/components/Icons/IconInfoOutlined";

const FormLabel = ({ children, required, className, info, infoWrapperClass, ...props }) => {
  return (
    <label
      {...props}
      className={classNames(
        className,
        "text-sm text-dark-gray mb-[12px] flex gap-[6px]"
      )}
    >
      <div>
        {children}
        {required && <span className="text-red ml-[6px]">*</span>}
      </div>
      {info && (
        <Popover
          trigger="hover"
          content={info}
          placement="auto"
          arrow={false}
          className={classNames(
            "bg-white shadow-custom-label-info focus-visible:outline-none text-[12px] z-10 rounded-xl",
            infoWrapperClass
          )}
        >
          <IconInfoOutlined className="cursor-pointer" />
        </Popover>
      )}
    </label>
  );
};

export default FormLabel;
