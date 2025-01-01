/**
 * External dependencies
 */
import { Datepicker } from "flowbite-react";
import classNames from "classnames";
import { useEffect } from "react";

const CustomDatePicker = ({
  maxDate,
  backgroundColor = "white",
  rounded = false,
  value = null,
  className,
  onChange,
  id,
  inputClassName = "",
  placeholder = "",
  ...props
}) => {
  const defaultInputClass = classNames(
    "bg-white py-6 text-lg text-midnight-blue font-medium border border-light-gray focus:outline-dark-gray focus:border-none focus-visible:outline-dark-gray placeholder:text-dark-gray placeholder:text-sm placeholder:font-normal",
    inputClassName
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const inputEle = document.getElementById(id);
      if (inputEle) {
        inputEle.classList.add(...defaultInputClass.split(" "));
      }
    }
  }, []);

  return (
    <Datepicker
      id={id}
      maxDate={maxDate ? maxDate : new Date()}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={{
        boxShadow: "none",
      }}
      theme={{
        popup: {
          footer: {
            button: {
              base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-0",
              today: "bg-primary text-white hover:bg-dark-primary",
            },
          },
        },
        views: {
          days: {
            items: {
              item: {
                base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-medium leading-9 text-midnight-blue hover:bg-gray-100",
                selected: "bg-primary text-white hover:bg-dark-primary",
                disabled: "text-dark-gray pointer-events-none font-medium",
              },
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomDatePicker;
