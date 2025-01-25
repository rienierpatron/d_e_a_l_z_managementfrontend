/**
 * Internal dependencies
 */
import AdminDealzStats from "@/components/Admin/DashboardInsights/AdminDealStats";
import DealzList from "@/components/Admin/DealzList";

const Dashboard = () => {
  return (
    <div className="px-10 py-8 h-full">
      {/* <AdminDealzStats /> */}
      <DealzList title="Recent DEALZ" />
    </div>
  );
};

export default Dashboard;
