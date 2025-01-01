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

const FormLabel = ({ children, required, className, info, ...props }) => {
  return (
    <label
      {...props}
      className={classNames(
        className,
        "text-sm text-dark-gray mb-[12px] flex gap-[6px]"
      )}
    >
      <div className="w-full">
        {children}
        {required && <span className="text-red ml-[6px]">*</span>}
      </div>
      {info && (
        <Popover
          trigger="hover"
          content={info}
          placement="auto"
          arrow={false}
          className="bg-white shadow-custom-label-info focus-visible:outline-none rounded-3xl text-[12px]"
        >
          <IconInfoOutlined className="cursor-pointer" />
        </Popover>
      )}
    </label>
  );
};

export default FormLabel;
