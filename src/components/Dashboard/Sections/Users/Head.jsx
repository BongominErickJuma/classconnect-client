import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Card } from "../../../ui";

const Head = ({ currentPage, limit, filteredUsers, searchTerm, setSearchTerm }) => {
  const { user } = useCurrentUser();
  
  const getRoleIcon = () => {
    if (user.role === "student") {
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  };

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative" padding="none">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 right-6 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full"></div>
      </div>
      
      <div className="relative z-10 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {getRoleIcon()}
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                {user.role === "student" ? "Instructors" : "Users"}
              </h1>
              <p className="text-white/80 text-sm">
                {user.role === "student" 
                  ? "Connect with your course instructors and teaching staff"
                  : "Manage users and their roles in the system"}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              {/* Search Input - Centered */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="block text-center text-white/60 text-xs mt-2">
                    {user.role === "student" ? "Search instructors..." : "Search students..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Pattern with Statistics - At the end */}
            <div className="relative flex-shrink-0 hidden lg:block">
              <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {filteredUsers.length}
                    </div>
                    <div className="text-xs text-white/70">
                      {user.role === "student" ? "Found" : "Users"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {filteredUsers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/80 text-sm">
              Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, filteredUsers.length)} of {filteredUsers.length} {user.role === "student" ? "instructors" : "users"}
              {searchTerm && (
                <span className="ml-2 text-white/60">
                  • Filtered by "{searchTerm}"
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Head;
