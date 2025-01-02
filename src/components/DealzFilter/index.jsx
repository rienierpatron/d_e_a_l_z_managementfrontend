/**
 * External dependencies
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
/**
 * Internal dependencies
 */
import FormInput from "@/components/Common/FormInput";
import CustomDatePicker from "@/components/Common/DatePicker";
import FormSelect from "@/components/Common/FormSelect";
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";

const DealzFilter = ({ fields, onApply, className }) => {
  const [filterState, setFilterState] = useState({});

  const handleChange = (field, value) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "input":
        return (
          <FormInput
            key={field.id}
            placeholder={field.placeholder || ""}
            rounded
            icon={field.icon}
            className={field.className || ""}
            iconClassName={field.iconClassName || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            value={filterState[field.id]}
            fullWidth={field.fullWidth}
          />
        );
      case "datePicker":
        return (
          <CustomDatePicker
            key={field.id}
            id={field.id}
            placeholder={field.placeholder || ""}
            inputClassName={field.inputClassName || ""}
            className={field.className || ""}
            onChange={(value) => handleChange(field.id, value)}
            value={filterState[field.id]}
          />
        );
      case "select":
        return (
          <FormSelect
            key={field.id}
            id={field.id}
            name={field.id}
            options={field.options || []}
            rounded
            placeholder={field.placeholder || ""}
            icon={field.icon}
            height={field.height || "50px"}
            controlStyle={field.controlStyle || {}}
            onChange={(value) => handleChange(field.id, value)}
            value={field.options.find(
              (ele) => ele.value === filterState?.[field.id]
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={classNames("flex gap-5", className)}>
      {fields.map((field) => renderField(field))}
      <Button
        variant="primary"
        isRound
        outlined
        icon={<IconArrowRight />}
        iconPosition="right"
        className="!px-6 !py-3"
        onClick={() => onApply(filterState)}
      >
        Apply
      </Button>
    </div>
  );
};

DealzFilter.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["input", "datePicker", "select"]).isRequired,
      placeholder: PropTypes.string,
      icon: PropTypes.element,
      options: PropTypes.array,
      height: PropTypes.string,
      controlStyle: PropTypes.object,
      className: PropTypes.string,
      inputClassName: PropTypes.string,
    })
  ).isRequired,
  onApply: PropTypes.func.isRequired,
};

export default DealzFilter;
