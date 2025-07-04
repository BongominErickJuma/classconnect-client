import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { authService, getImageUrl } from "../Services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await authService.getMe();
        const currentUser = fetchedUser.data.user;

        currentUser.profile_photo = getImageUrl(currentUser.profile_photo);

        setUser(currentUser);
      } catch (err) {
        setError(err.response?.data?.message || "You are not logged in");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-red-500">{error || "Authentication required"}</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return <DashboardLayout user={user} />;
};

export default Dashboard;
