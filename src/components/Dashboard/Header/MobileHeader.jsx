import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationBell from "../MainContent/NotificationBell";
import useCurrentUser from "../../Hooks/useCurrentUser";

const MobileHeader = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { user } = useCurrentUser();
  return (
    <header
      className="md:hidden p-4 flex justify-between items-center w-full"
      style={{ backgroundColor: "var(--color-accent)", color: "white" }}
    >
      <div className="flex items-center space-x-4">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>
        <h1 className="text-xl font-bold">ClassConnect</h1>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <img src={user.profile_photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
      </div>
    </header>
  );
};

export default MobileHeader;
