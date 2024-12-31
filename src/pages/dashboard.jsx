/**
 * External dependencies
 */
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import DealzStats from "@/components/DashboardInsights/DealStats";
import RemainingDealz from "@/components/DashboardInsights/RemainingDealz";
import IconPeople from "@/components/Icons/IconPeople";
import MyDealz from "@/components/MyDealz";

const Dashboard = () => {
  const router = useRouter();
  const { query } = router;
  const viewAllDealz = (query?.show && query.show === "all-dealz") || false;

  return (
    <div className="px-10 py-8 h-full">
      {!viewAllDealz && (
        <div className="flex items-stretch justify-between gap-6">
          <DealzStats
            icon={<IconPeople className="text-secondary" />}
            iconClassName="bg-secondary-60"
            metricName="Your dealz reach"
            metricCount="24,965"
            metricUnit="Users"
          />
          <RemainingDealz totalDealz={10} remainingDealz={6} />
        </div>
      )}
      <MyDealz />
    </div>
  );
};

export default Dashboard;
