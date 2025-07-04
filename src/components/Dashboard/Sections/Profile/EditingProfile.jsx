import React from "react";

const EditingProfile = ({ handleSubmit, name, setName, email, setEmail }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e8ea8]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e8ea8]"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#4e8ea8] text-white px-4 py-2 rounded-md hover:bg-[#3a6d82] transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditingProfile;
