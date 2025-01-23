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
import IconCloseCircle from "../Icons/IconCloseCircle";
import { helper } from "@/helpers";

const DealzFilter = ({ fields, onApply, className }) => {
  const [filterState, setFilterState] = useState({});
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [key, setKey] = useState(0);

  const handleChange = (field, value) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilter = () => {
    setFilterState({});
    setIsFilterApplied(false);
    setKey((prevKey) => prevKey + 1);
    onApply({});
  };

  const renderField = (field) => {
    switch (field.type) {
      case "input":
        return (
          <FormInput
            key={`${field.id}-${key}`}
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
            key={`${field.id}-${key}`}
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
            key={`${field.id}-${key}`}
            id={field.id}
            name={field.id}
            options={field.options || []}
            rounded
            placeholder={field.placeholder || ""}
            icon={field.icon}
            height={field.height || "50px"}
            controlStyle={field.controlStyle || {}}
            onChange={(value) => handleChange(field.id, value)}
            wrapperClass={field.wrapperClass}
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
        disabled={!helper.notEmpty(filterState)}
        onClick={() => {
          onApply(filterState);
          setIsFilterApplied(true);
        }}
      >
        Apply
      </Button>
      {isFilterApplied && (
        <Button
          variant="primary"
          isRound
          outlined
          icon={<IconCloseCircle />}
          iconPosition="left"
          className="!px-0 !text-red underline hover:!text-red"
          onClick={() => handleClearFilter()}
          borderless
        >
          Clear filter
        </Button>
      )}
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
