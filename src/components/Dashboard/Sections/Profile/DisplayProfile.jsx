import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const DisplayProfile = () => {
  const { user } = useCurrentUser();
  return (
    <div className="space-y-2 mb-6">
      <div>
        <p className="text-sm text-gray-500">Full Name</p>
        <p className="text-gray-800">{user.name}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Email Address</p>
        <p className="text-gray-800">{user.email}</p>
      </div>
      <div>
        <p className="text-gray-800 uppercase tracking-wide border-t-blue-400 border-t-2">{user.role}</p>
      </div>
    </div>
  );
};

export default DisplayProfile;
