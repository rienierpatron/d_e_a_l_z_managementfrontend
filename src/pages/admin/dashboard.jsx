/**
 * Internal dependencies
 */
import AdminDealzStats from "@/components/Admin/DashboardInsights/AdminDealStats";
import AllDealz from "@/components/Admin/AllDealz";

const Dashboard = () => {
  return (
    <div className="px-10 py-8 h-full">
      <AdminDealzStats />
      <AllDealz />
    </div>
  );
};

export default Dashboard;
