import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const Head = ({ currentPage, limit, filteredUsers, searchTerm, setSearchTerm }) => {
  const { user } = useCurrentUser();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold">{user.role === "student" ? "Instructors" : "Users"}</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder={user.role === "student" ? "Search Instructors..." : "Search users..."}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Head;
