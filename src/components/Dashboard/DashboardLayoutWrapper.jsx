// components/Dashboard/DashboardLayoutWrapper.js
import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const DashboardLayoutWrapper = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default DashboardLayoutWrapper;
