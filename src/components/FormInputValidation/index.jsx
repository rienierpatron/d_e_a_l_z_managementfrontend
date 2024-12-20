import React from "react";
import classNames from "classnames";

const FormInputValidation = ({ children, className, ...props }) => {
  return (
    <fieldset {...props} className={classNames(className, "mb-5")}>
      {children}
    </fieldset>
  );
};

export default FormInputValidation;
