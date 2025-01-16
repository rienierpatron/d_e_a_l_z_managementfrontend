/**
 * External dependencies
 */
import { useEffect } from "react";

/**
 * Internal dependencies
 */
import Header from "@/components/Common/Header";
import HotBar from "@/components/Common/HotBar";
import CustomSidebar from "@/components/Common/Sidebar";
import { useUser } from "@/context/UserContext";

export default function LoggedInLayout({ children }) {
  const { fetchUserData } = useUser();

  // Fetch user data when header mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HotBar />
      <div>
        <CustomSidebar />
        <main className="ml-[115px] bg-white flex flex-col w-main">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}