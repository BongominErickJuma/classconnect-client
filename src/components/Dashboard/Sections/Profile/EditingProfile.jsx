import React from "react";
import { useDropzone } from "react-dropzone";

const EditingProfile = ({ handleSubmit, name, setName, email, setEmail, profileImage, setProfileImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Set preview for UI
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage({
            file, // <-- actual file
            preview: reader.result, // <-- base64 for UI
          });
        };
        reader.readAsDataURL(file);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 mb-6">
        {/* Profile Image Dropzone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
              isDragActive ? "border-[#4e8ea8] bg-[#f0f8ff]" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {profileImage ? (
              <div className="flex flex-col items-center">
                <img
                  src={profileImage?.preview || ""}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <p className="text-sm text-gray-600">Click to change or drag and drop</p>
              </div>
            ) : isDragActive ? (
              <p className="text-sm text-gray-600">Drop the image here...</p>
            ) : (
              <p className="text-sm text-gray-600">Drag and drop an image here, or click to select</p>
            )}
          </div>
        </div>

        {/* Name Field */}
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

        {/* Email Field */}
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
