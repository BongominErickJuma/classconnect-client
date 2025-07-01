import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog } from "@fortawesome/free-solid-svg-icons";

const ProfileDropdown = ({ user, isOpen, toggleDropdown }) => {
  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none profile-btn">
        <img src={user.profile_photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 border"
          style={{ backgroundColor: "white", borderColor: "var(--color-light-bg)" }}
        >
          <a href="#" className="block px-4 py-2 hover:opacity-90" style={{ color: "var(--color-text-base)" }}>
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </a>
          <a href="#" className="block px-4 py-2 hover:opacity-90" style={{ color: "var(--color-text-base)" }}>
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Settings
          </a>
          <a href="/login" className="block px-4 py-2 hover:opacity-90" style={{ color: "var(--color-text-base)" }}>
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
