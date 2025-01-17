/**
 * Internal dependencies
 */
import { USER_MANAGEMENT_STATUS, USER_MANAGEMENT_STATUS_COLOR_MAPPING } from "@/lib/constants";
import Typography from "@/components/Common/Typography";

export default function UserManagementStatusRenderer ({ status }) {
  return (
    <div className="flex items-center gap-2">
      <Typography
        variant="caption"
        className="font-medium"
        style={{
          color: USER_MANAGEMENT_STATUS_COLOR_MAPPING[status],
        }}
      >
        {USER_MANAGEMENT_STATUS[status]}
      </Typography>
    </div>
  );
};