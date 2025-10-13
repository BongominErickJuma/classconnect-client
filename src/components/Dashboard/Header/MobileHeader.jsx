import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import NotificationBell from "../MainContent/NotificationBell";
import useCurrentUser from "../../Hooks/useCurrentUser";

const MobileHeader = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { user } = useCurrentUser();
  return (
    <header
      className={`fixed top-0 left-0 right-0 ${isMobileMenuOpen ? 'z-30' : 'z-50'} p-4 flex justify-between items-center w-full bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-sm`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMobileMenu}
          className="hamburger-button focus:outline-none text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] p-2 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            size="lg"
            className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
          />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">ClassConnect</h1>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <img src={user.profile_photo} alt="Profile" className="w-8 h-8 rounded-full object-cover border-2 border-[var(--color-primary)]" />
      </div>
    </header>
  );
};

export default MobileHeader;
