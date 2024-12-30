import DealzStats from "@/components/DashboardInsights/DealStats";
import RemainingDealz from "@/components/DashboardInsights/RemainingDealz";
import IconPeople from "@/components/Icons/IconPeople";

const Dashboard = () => {
  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between gap-6">
        <DealzStats
          icon={<IconPeople className="text-secondary" />}
          iconClassName="bg-secondary-60"
          metricName="Your dealz reach"
          metricCount="24,965"
          metricUnit="Users"
        />
        <RemainingDealz totalDealz={10} remainingDealz={6}/>
      </div>
    </div>
  );
};

export default Dashboard;
