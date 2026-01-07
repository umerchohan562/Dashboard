import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen ">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
