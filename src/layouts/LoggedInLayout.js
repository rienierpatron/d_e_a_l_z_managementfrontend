import Header from "@/components/Common/Header";
import CustomSidebar from "@/components/Common/Sidebar";

export default function LoggedInLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <CustomSidebar />
      <main className="ml-[115px] bg-white flex flex-col w-full">
        <Header />
        {children}
      </main>
    </div>
  );
}