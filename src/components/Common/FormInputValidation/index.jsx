/**
 * External dependencies
 */
import React from "react";
import classNames from "classnames";

const FormInputValidation = ({ children, className,text, ...props }) => {
  return (
    <fieldset {...props} className={classNames(className, "mt-2 ml-2 text-red text-[12px]")}>
      {text}
      {children}
    </fieldset>
  );
};

export default FormInputValidation;
