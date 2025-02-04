/**
 * External dependencies
 */
import React, { useEffect, useState } from "react";

/**
 * Internal dependencies
 */
import DealzStats from "@/components/DashboardInsights/DealStats";
import RemainingDealz from "@/components/DashboardInsights/RemainingDealz";
import IconPeople from "@/components/Icons/IconPeople";
import DealzList from "@/components/DealzList";
import { useSubscription } from "@/components/Subscriptions/GetSubscriptionDetails";
import { api } from "@/api";

const Dashboard = () => {
  const { currentSubscription } = useSubscription();
  const [reachCount, setReachCount] = useState(0);

  const getReachCount = async () => {
    try {
      const res = await api.dealz.getReachCount(false);
      if (res.status === "ok") {
        setReachCount(res.data?.reach_count ?? 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getReachCount();
  // }, []);

  return (
    <div className="px-10 py-8 h-full">
      <div className="flex items-stretch justify-between gap-6">
        {/* <DealzStats
          icon={<IconPeople className="text-secondary" />}
          iconClassName="bg-secondary-60"
          metricName="Your dealz reach"
          metricCount={reachCount}
          metricUnit="Users"
        /> */}
        <RemainingDealz
          totalDealz={
            currentSubscription?.available_inventory?.allowed_slot ?? 0
          }
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
