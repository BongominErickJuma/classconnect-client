import React from "react";

const DisplayProfile = ({ name, email, role }) => {
  return (
    <div className="space-y-2 mb-6">
      <div>
        <p className="text-sm text-gray-500">Full Name</p>
        <p className="text-gray-800">{name}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Email Address</p>
        <p className="text-gray-800">{email}</p>
      </div>
      <div>
        <p className="text-gray-800 uppercase tracking-wide border-t-blue-400 border-t-2">{role}</p>
      </div>
    </div>
  );
};

export default DisplayProfile;
