import React, { useState, useEffect, useRef } from "react";
import { getImageUrl } from "../../../../Services/api";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Card, Badge, Button } from "../../../ui";

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

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "student": return "success";
      case "instructor": return "primary";  
      case "admin": return "accent";
      default: return "secondary";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case "instructor":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case "admin":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      {paginatedUsers.map((user) => (
        <Card
          key={user.user_id}
          className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative"
          padding="md lg:lg"
        >
          {/* User Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              {user.profile_photo ? (
                <img
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[var(--color-border)] group-hover:ring-[var(--color-primary)]/30 transition-all duration-200"
                  src={getImageUrl(user.profile_photo)}
                  alt={user.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl ${
                  user.profile_photo ? 'hidden' : 'flex'
                }`}
                style={{ display: user.profile_photo ? 'none' : 'flex' }}
              >
                {getInitials(user.name)}
              </div>
              
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--color-text-primary)] text-lg group-hover:text-[var(--color-primary)] transition-colors truncate">
                {user.name}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm truncate mb-2">
                {user.email}
              </p>
              <Badge 
                variant={getRoleBadgeVariant(user.role)} 
                size="sm"
                className="inline-flex items-center gap-1"
              >
                {getRoleIcon(user.role)}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--color-surface)] rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--color-text-primary)]">
                {user.role === "student" ? "4" : user.role === "instructor" ? "12" : "∞"}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {user.role === "student" ? "Courses" : user.role === "instructor" ? "Classes" : "Access"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--color-text-primary)]">
                {user.role === "student" ? "85%" : user.role === "instructor" ? "96%" : "100%"}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {user.role === "student" ? "Progress" : user.role === "instructor" ? "Rating" : "System"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-[var(--color-text-muted)]">Active now</span>
            </div>
            
            {current_user.role === "admin" && (
              <div className="relative" ref={(el) => (menuRefs.current[user.user_id] = el)}>
                <Button
                  onClick={() => toggleMenu(user.user_id)}
                  variant="ghost"
                  size="sm"
                  className="p-2 min-w-0"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </Button>

                {openMenuId === user.user_id && (
                  <div className="absolute right-0 top-10 bg-[var(--color-background)] shadow-lg rounded-lg border border-[var(--color-border)] min-w-[140px] z-50 overflow-hidden">
                    <Button
                      onClick={() => {
                        onUpdateClick(user);
                        setOpenMenuId(null);
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start rounded-none hover:bg-[var(--color-surface-hover)] border-0"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Update Role
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Desktop;
