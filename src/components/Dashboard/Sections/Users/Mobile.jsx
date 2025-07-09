import React from "react";
import { getImageUrl } from "../../../../Services/api";

const Mobile = ({ paginatedUsers }) => {
  return (
    <div className="md:hidden space-y-4">
      {paginatedUsers.map((user) => (
        <div key={user.user_id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            {user.profile_photo ? (
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={getImageUrl(user.profile_photo)}
                alt={user.name}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {getInitials(user.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
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
      ))}
    </div>
  );
};

export default Mobile;
