import React from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "Bongomin",
    profile_photo: "/images/img_phone.png",
    role: "student",
  };

  return <DashboardLayout user={user} />;
};

export default Dashboard;
