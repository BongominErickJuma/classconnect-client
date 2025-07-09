import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const ProfileHeader = ({ profileImage }) => {
  const { user } = useCurrentUser();
  return (
    <div className="p-6 text-white relative">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="relative border border-b-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#4e8ea8]"
            />
          </div>
          <div>
            <h1 className="text-xl text-[#4e8ea8]">{user.name}</h1>
            <p className="text-sm" style={{ color: "var(--color-text-base)" }}>
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
