import React, { useState, useEffect, useRef } from "react";
import { getImageUrl } from "../../../../Services/api";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const Desktop = ({ paginatedUsers, onUpdateClick, onDeleteClick }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  const { user: current_user } = useCurrentUser();

  const toggleMenu = (userId) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const anyOpen = Object.values(menuRefs.current).some((ref) => ref?.contains(event.target));
      if (!anyOpen) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
      {paginatedUsers.map((user) => (
        <div
          key={user.user_id}
          className="relative bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {user.profile_photo ? (
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={getImageUrl(user.profile_photo)}
                  alt={user.name}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {getInitials(user.name)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-4 ${
                    user.role === "student"
                      ? "bg-green-100 text-green-800"
                      : user.role === "instructor"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>

            {/* 3-dot menu */}
            <div className="mt-6 flex justify-end relative" ref={(el) => (menuRefs.current[user.user_id] = el)}>
              {current_user.role === "admin" && (
                <button onClick={() => toggleMenu(user.user_id)} className="rounded-4xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              )}

              {openMenuId === user.user_id && (
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md w-32 z-50">
                  <button
                    onClick={() => {
                      onUpdateClick(user);
                      setOpenMenuId(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Update
                  </button>
                  {/* <button
                    onClick={() => {
                      onDeleteClick(student);
                      setOpenMenuId(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desktop;
