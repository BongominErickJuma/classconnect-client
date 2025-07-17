import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { authService } from "../../../Services/api";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ isOpen, toggleDropdown }) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await authService.logout();

    if (res) {
      navigate("/login");
    }
  };

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
          <a
            onClick={handleLogout}
            className="block px-4 py-2 hover:opacity-90 cursor-pointer"
            style={{ color: "var(--color-text-base)" }}
          >
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
