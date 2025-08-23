import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { authService } from "../../../Services/api";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ isOpen, toggleDropdown }) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const res = await authService.logout();

    if (res) {
      navigate("/login");
    }
  };

  const handleSettings = () => {
    navigate("/dashboard/settings");
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="focus:outline-none hover:ring-2 hover:ring-[var(--color-primary)]/20 rounded-full transition-all duration-200"
      >
        <img
          src={user.profile_photo}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border-2 border-[var(--color-border)]"
        />
      </button>
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-52 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
          {/* Profile Header */}
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <img
                src={user.profile_photo}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-border)]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-text-primary)] truncate">{user.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleSettings}
              className="w-full flex items-center px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>

            <div className="border-t border-[var(--color-border)] my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
