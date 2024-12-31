/**
 * Internal dependencies
 */
import { DEALZ_STATUS, DEALZ_STATUS_COLOR_MAPPING } from "@/lib/constants";
import Typography from "@/components/Common/Typography";

const DealzStatusRenderer = ({ status }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-1 w-1 rounded-full"
        style={{
          background: DEALZ_STATUS_COLOR_MAPPING[status],
        }}
      ></div>
      <Typography
        variant="caption"
        className="font-medium uppercase"
        style={{
          color: DEALZ_STATUS_COLOR_MAPPING[status],
        }}
      >
        {DEALZ_STATUS[status]}
      </Typography>
    </div>
  );
};

export default DealzStatusRenderer;
