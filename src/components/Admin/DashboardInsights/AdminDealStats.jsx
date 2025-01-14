/**
 * External dependencies
 */
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import DealzStats from "@/components/DashboardInsights/DealStats";
import IconCoupon from "@/components/Icons/IconCoupon";
import IconTick from "@/components/Icons/IconTick";
import IconMessageQuestion from "@/components/Icons/IconMessageQuestion";
import IconCloseCircle from "@/components/Icons/IconCloseCircle";

const Dashboard = () => {
  return (
    <div className="flex items-stretch justify-between gap-6">
      <DealzStats
        icon={<IconCoupon className="text-secondary" />}
        iconClassName="bg-secondary-60"
        metricName="Your dealz reach"
        metricCount="24,965"
        metricUnit="Users"
      />
      <DealzStats
        icon={<IconTick className="text-green"/>}
        iconClassName="bg-green-60"
        metricName="DEALZ Approved"
        metricCount="24,965"
        metricUnit="Users"
      />
      <DealzStats
        icon={<IconMessageQuestion className="text-purple" />}
        iconClassName="bg-purple-60"
        metricName="DEALZ Pending"
        metricCount="24,965"
        metricUnit="Users"
      />
      <DealzStats
        icon={<IconCloseCircle className="text-red" />}
        iconClassName="bg-red-40"
        metricName="DEALZ Rejected"
        metricCount="24,965"
        metricUnit="Users"
      />
    </div>
  );
};

export default Dashboard;