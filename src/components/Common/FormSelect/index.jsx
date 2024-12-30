import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Select from "react-select";

const FormSelect = React.forwardRef(
  (
    {
      height = "64px",
      rounded,
      borderRadius = "32px",
      className,
      customStyles: userStyles,
      icon,
      ...props
    },
    ref
  ) => {
    const selectRef = useRef();

    const mergedStyles = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? "#FFFFFF" : "#FFFFFF",
        height: height ? height : provided.height,
        borderColor: "#EFF0F4",
        borderRadius: rounded && borderRadius,
        boxShadow: state.isFocused ? "0 0 0 2px #646B75" : "none", // Add a custom box shadow when focused
        "&:hover": {
          borderColor: "#EFF0F4", // Set the border color on hover
        },
        color: "#02021E",
        fontSize: "16px",
        fontWeight: 400,
        paddingLeft: icon ? "50px" : undefined,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "#646B75", // --color-dark-gray
        fontSize: "14px",
      }),
      option: (provided, state) => ({
        ...provided,
        color: "#02021E",
        fontSize: "14px",
        backgroundColor:
          state.isSelected || state.isFocused ? "#EFF0F4" : "#FFFFFF",
        "&:hover": {
          backgroundColor: "#EFF0F4",
        },
      }),
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 99999999,
      }),
      ...userStyles,
    };

    useEffect(() => {
      if (selectRef?.current) {
        const inputEle = selectRef.current.inputRef;
        if (inputEle) {
          inputEle.style.boxShadow = "none";
        }
      }
    }, [selectRef]);

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-10">
            {typeof icon === "string" ? (
              <Image alt="input-icon" src={icon} width={20} height={20} />
            ) : (
              icon
            )}
          </div>
        )}
        <Select
          ref={selectRef}
          styles={mergedStyles}
          captureMenuScroll={false}
          className={className}
          menuPortalTarget={
            typeof window !== "undefined" ? document.body : null
          }
          components={{ IndicatorSeparator: () => null }}
          {...props}
        />
      </div>
    );
  }
);

export default FormSelect;
