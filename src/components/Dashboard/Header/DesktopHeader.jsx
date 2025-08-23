import React, { useState, useEffect } from "react";
import NotificationBell from "../MainContent/NotificationBell";
import ProfileDropdown from "../MainContent/ProfileDropdown";
import { courseService, userService } from "../../../Services/api";

const DesktopHeader = ({ isProfileOpen, toggleProfile }) => {
  const [courseCount, setCourseCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch course count
        const coursesResponse = await courseService.getAllCourses();
        setCourseCount(coursesResponse.data?.length || 0);

        // Fetch total users count
        const usersResponse = await userService.getAllUsers();
        setTotalUsers(usersResponse.data?.length || 0);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <header className="hidden md:flex bg-[var(--color-background)] border-b border-[var(--color-border)] h-24 items-center justify-between px-6 shadow-sm fixed top-0 left-0 md:left-72 right-0 z-40">
      {/* Left Side - Quick Stats */}
      <div className="flex items-center gap-4">
        {/* Quick Stats */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-[var(--color-surface)] rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--color-primary)]">{courseCount}</div>
            <div className="text-xs text-[var(--color-text-muted)]">Courses</div>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--color-success)]">{totalUsers}</div>
            <div className="text-xs text-[var(--color-text-muted)]">Users</div>
          </div>
        </div>
      </div>

      {/* Right Side - Notifications & Profile */}
      <div className="flex items-center gap-4">
        <NotificationBell />
        <ProfileDropdown isOpen={isProfileOpen} toggleDropdown={toggleProfile} />
      </div>
    </header>
  );
};

export default DesktopHeader;
