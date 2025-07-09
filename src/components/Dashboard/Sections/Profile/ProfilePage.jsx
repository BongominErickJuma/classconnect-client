import React, { useState } from "react";

import { useForm } from "react-hook-form";
import useCurrentUser from "./../../../Hooks/useCurrentUser";
import { getImageUrl, userService } from "../../../../Services/api";

const ProfilePage = () => {
  const { user, setUser } = useCurrentUser();

  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm();

  const passwordWatch = watchPassword("newPassword");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitProfile = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (data.name.trim().length < 5) {
      setErrorMessage("Name must be at least 5 characters.");
      setIsLoading(false);
      setTimeout(() => setErrorMessage(""), 5000); // ✅ clear after 5 sec
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);

      if (previewImage && previewImage !== user.profile_photo) {
        const response = await fetch(previewImage);
        const blob = await response.blob();
        const file = new File([blob], "profile.jpg", { type: blob.type });
        formData.append("profile_photo", file);
      }

      const res = await userService.updateMe(formData);

      setUser((prevUser) => ({
        ...prevUser,
        name: res.data.user.name,
        email: res.data.user.email,
        profile_photo: getImageUrl(res.data.user.profile_photo),
      }));

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
    }
  };

  const onSubmitPassword = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (data.newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      await userService.updatePassword(payload);

      setSuccessMessage("Password updated successfully!");
      resetPassword();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={previewImage || user.profile_photo || "/img/users/default.jpg"}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              <h2 className="text-xl font-bold text-center">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span
                className={`mt-2 px-2 py-1 text-xs rounded-full ${
                  user.role === "student"
                    ? "bg-green-100 text-green-800"
                    : user.role === "instructor"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>

            <nav className="mt-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                  activeTab === "profile" ? "text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "password" ? "text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>

              {successMessage && <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">{successMessage}</div>}
              {errorMessage && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">{errorMessage}</div>}

              <form onSubmit={handleSubmit(onSubmitProfile)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Change Password</h2>

              {successMessage && <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">{successMessage}</div>}
              {errorMessage && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">{errorMessage}</div>}

              <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    {...registerPassword("currentPassword", { required: "Current password is required" })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      passwordErrors.currentPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    {...registerPassword("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      passwordErrors.newPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...registerPassword("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === passwordWatch || "Passwords do not match",
                    })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      passwordErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
