import React from "react";
import classNames from "classnames";

const FormLabel = ({ children, required, className, ...props }) => {
  return (
    <label
      {...props}
      className={classNames(className, "block text-sm text-dark-gray mb-[12px]")}
    >
      {children}
      {required && <span className="text-red ml-[6px]">*</span>}
    </label>
  );
};

export default FormLabel;
