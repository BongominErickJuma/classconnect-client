import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationBell from "../MainContent/NotificationBell";
import ProfileDropdown from "../MainContent/ProfileDropdown";

const DesktopHeader = ({ user, isProfileOpen, toggleProfile }) => {
  return (
    <header
      className="hidden md:flex shadow-sm h-16 items-center justify-between px-6 w-full rounded-tr-2xl"
      style={{ backgroundColor: "white" }}
    >
      <h2 className="text-lg font-medium" style={{ color: "var(--color-text-base)" }}>
        Welcome back, {user.name}
      </h2>
      <div className="flex items-center space-x-6">
        <NotificationBell />
        <ProfileDropdown user={user} isOpen={isProfileOpen} toggleDropdown={toggleProfile} />
      </div>
    </header>
  );
};

export default DesktopHeader;
