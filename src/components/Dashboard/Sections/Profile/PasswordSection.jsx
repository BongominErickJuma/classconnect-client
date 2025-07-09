import React from "react";

const PasswordSection = ({
  handlePasswordReset,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-[#333333] mb-4">Change Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              placeholder="********"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e8ea8]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              placeholder="********"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e8ea8]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e8ea8]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4e8ea8] text-white px-4 py-2 rounded-md hover:bg-[#3a6d82] transition-colors"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSection;
