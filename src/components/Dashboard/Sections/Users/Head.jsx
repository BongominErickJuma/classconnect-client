import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Card } from "../../../ui";

const Head = ({ currentPage, limit, filteredUsers, searchTerm, setSearchTerm }) => {
  const { user } = useCurrentUser();
  
  const getRoleIcon = () => {
    if (user.role === "student") {
      return (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
                {getRoleIcon()}
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {user.role === "student" ? "Instructors" : "Users"}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  {user.role === "student"
                    ? "Connect with your instructors"
                    : "Manage users and roles"}
                </p>
              </div>
            </div>

            {/* Decorative Pattern with Statistics - Desktop only */}
            <div className="relative flex-shrink-0 hidden xl:block">
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

          {/* Search Input - Full width on mobile */}
          <div className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={user.role === "student" ? "Search instructors by name or email..." : "Search users by name or email..."}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Info - Mobile optimized */}
          {filteredUsers.length > 0 && (
            <div className="border-t border-white/20 pt-3">
              <p className="text-white/80 text-xs sm:text-sm">
                Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, filteredUsers.length)} of {filteredUsers.length} {user.role === "student" ? "instructors" : "users"}
                {searchTerm && (
                  <span className="ml-1 text-white/60 block sm:inline mt-1 sm:mt-0">
                    Filtered by "{searchTerm}"
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Head;
