import React from "react";
import classNames from "classnames";
import IconInfoOutlined from "@/components/Icons/IconInfoOutlined";
import { Popover } from "flowbite-react";

const FormLabel = ({ children, required, className, info, ...props }) => {
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
          className="bg-white shadow-custom-label-info focus-visible:outline-none rounded-3xl text-[12px]"
        >
          <IconInfoOutlined className="cursor-pointer" />
        </Popover>
      )}
    </label>
  );
};

export default FormLabel;
