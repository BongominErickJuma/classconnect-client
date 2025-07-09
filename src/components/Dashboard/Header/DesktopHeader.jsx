import React from "react";
import NotificationBell from "../MainContent/NotificationBell";
import ProfileDropdown from "../MainContent/ProfileDropdown";
import useCurrentUser from "../../Hooks/useCurrentUser";

const DesktopHeader = ({ isProfileOpen, toggleProfile }) => {
  const { user } = useCurrentUser();
  return (
    <header
      className="hidden md:flex shadow-sm h-16 items-center justify-between px-6 w-full rounded-tr-2xl"
      style={{ backgroundColor: "white" }}
    >
      <h2
        className="text-lg font-medium"
        style={{ color: "var(--color-text-base)", fontFamily: "var(--font-primary)" }}
      >
        Welcome, {user.name}
      </h2>
      <div className="flex items-center space-x-6">
        <NotificationBell />
        <ProfileDropdown isOpen={isProfileOpen} toggleDropdown={toggleProfile} />
      </div>
    </header>
  );
};

export default DesktopHeader;
