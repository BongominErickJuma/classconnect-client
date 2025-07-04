import React from "react";

const ProfileHeader = ({ profileImage, name, handleImageUpload, email }) => {
  const letter1 = name.split(" ")[0].charAt(0);
  const letter2 = name.split(" ")[1].charAt(0);
  const letters = `${letter1} ${letter2}`;
  return (
    <div className="p-6 text-white relative">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="relative border border-b-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#4e8ea8]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-[#4e8ea8] flex items-center justify-center text-[#4e8ea8] text-xl font-bold">
                {letters}
              </div>
            )}
            <label className="absolute bottom-0 right-0 rounded-full p-1 cursor-pointer text-[#4e8ea8]">
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#4e8ea8]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div>
            <h1 className="text-xl text-[#4e8ea8]">{name}</h1>
            <p className="text-sm" style={{ color: "var(--color-text-base)" }}>
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
