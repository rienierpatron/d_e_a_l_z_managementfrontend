/**
 * External dependencies
 */
import React from "react";

/**
 * Internal dependencies
 */
import DealzStats from "@/components/DashboardInsights/DealStats";
import RemainingDealz from "@/components/DashboardInsights/RemainingDealz";
import IconPeople from "@/components/Icons/IconPeople";
import DealzList from "@/components/DealzList";
import { useSubscription } from "@/components/Subscriptions/GetSubscriptionDetails";

const Dashboard = () => {
  const { currentSubscription } = useSubscription();

  return (
    <div className="px-10 py-8 h-full">
      <div className="flex items-stretch justify-between gap-6">
        <DealzStats
          icon={<IconPeople className="text-secondary" />}
          iconClassName="bg-secondary-60"
          metricName="Your dealz reach"
          metricCount="24,965"
          metricUnit="Users"
        />
        <RemainingDealz
          totalDealz={10}
          remainingDealz={currentSubscription?.available_inventory?.slot}
        />
      </div>
      <div className="w-full py-8">
        <DealzList />
      </div>
    </div>
  );
};

export default Dashboard;
