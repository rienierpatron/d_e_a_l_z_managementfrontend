import Header from "@/components/Common/Header";
import HotBar from "@/components/Common/HotBar";
import CustomSidebar from "@/components/Common/Sidebar";

export default function LoggedInLayout({ children }) {
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