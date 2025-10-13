import React from "react";
import { getImageUrl } from "../../../../Services/api";
import { Card, Badge } from "../../../ui";

const Mobile = ({ paginatedUsers }) => {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "student": return "success";
      case "instructor": return "primary";
      case "admin": return "accent";
      default: return "secondary";
    }
  };

  return (
    <div className="md:hidden space-y-3">
      {paginatedUsers.map((user) => (
        <Card
          key={user.user_id}
          className="hover:shadow-md transition-shadow duration-200"
          padding="md"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              {user.profile_photo ? (
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--color-border)]"
                  src={getImageUrl(user.profile_photo)}
                  alt={user.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm ${
                  user.profile_photo ? 'hidden' : 'flex'
                }`}
                style={{ display: user.profile_photo ? 'none' : 'flex' }}
              >
                {getInitials(user.name)}
              </div>

              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                {user.name}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] truncate">
                {user.email}
              </p>
            </div>

            <Badge
              variant={getRoleBadgeVariant(user.role)}
              size="sm"
              className="flex-shrink-0"
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>

          {/* Quick stats - mobile */}
          <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Active now</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{user.role === "student" ? "4 courses" : user.role === "instructor" ? "12 classes" : "Admin"}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Mobile;
