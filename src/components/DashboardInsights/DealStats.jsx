/**
 * External dependencies
 */
import classNames from "classnames";

/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import FormSelect from "@/components/Common/FormSelect";

const DealzStats = ({
  icon,
  iconClassName,
  metricClassName,
  metricCountClassName,
  filterWrapperClassName,
  metricName,
  metricCount,
  metricUnit,
}) => {
  return (
    <div className="border border-light-gray rounded-2xl px-6 py-8 flex flex-col gap-4 w-full justify-between">
      <div className={classNames("flex flex-col gap-4", filterWrapperClassName)}>
        <div
          className={classNames(
            "h-[56px] w-[56px] p-[14px] rounded-full flex items-center justify-center",
            iconClassName
          )}
        >
          {icon}
        </div>
        {/* <FormSelect
          options={[{ label: "DEC, 2024", value: "DEC, 2024" }]}
          rounded
          height="48px"
          controlStyle={{
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        /> */}
      </div>
      <div className="flex items-center justify-between">
        <Typography
          variant="small"
          className={classNames(
            "uppercase font-medium text-dark-gray",
            metricClassName
          )}
        >
          {metricName}
        </Typography>
        <Typography
          variant="subtitle"
          className={classNames(
            "font-semibold flex items-baseline gap-2",
            metricCountClassName
          )}
        >
          {metricCount}
          {metricUnit && (
            <span className="text-dark-gray text-sm font-normal">
              {metricUnit}
            </span>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default DealzStats;
