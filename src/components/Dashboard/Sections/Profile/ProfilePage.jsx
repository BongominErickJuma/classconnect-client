import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useCurrentUser from "./../../../Hooks/useCurrentUser";
import { getImageUrl, userService } from "../../../../Services/api";
import { Card, Input, Button, Badge } from "../../../ui";
import { faUser, faEnvelope, faLock, faKey, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="space-y-8">
      {/* Profile Hero Section */}
      <div className="animate-slide-in-down">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative" padding="none">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                    Profile Settings
                  </h1>
                  <p className="text-white/80 text-sm">
                    Manage your account information and preferences
                  </p>
                </div>
              </div>

              {/* Decorative Pattern with User Info */}
              <div className="relative flex-shrink-0 hidden lg:block">
                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="text-xs text-white/70">
                        {user.role}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Content */}
      <div className="animate-slide-in-up">
        <div className="flex flex-col lg:flex-row gap-8">
        {/* Enhanced Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Card className="group hover:shadow-lg transition-all duration-200" padding="lg">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="relative">
                  <img
                    src={previewImage || user.profile_photo || "/img/users/default.jpg"}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover ring-4 ring-[var(--color-border)] group-hover:ring-[var(--color-primary)]/30 shadow-xl transition-all duration-200"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NCA4NEg0NEMzNS4xNjMgODQgMjggOTEuMTYzIDI4IDEwMFYxMDhIMTAwVjEwMEMxMDAgOTEuMTYzIDkyLjgzNyA4NCA4NCA4NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iNjQiIGN5PSI0OCIgcj0iMTYiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                  <label className="absolute bottom-0 right-0 bg-[var(--color-primary)] text-white rounded-full p-2.5 cursor-pointer hover:bg-[var(--color-primary-dark)] hover:scale-110 transition-all duration-200 shadow-lg border-2 border-white">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <FontAwesomeIcon icon={faCamera} className="h-4 w-4" />
                  </label>
                </div>
                
                {/* Online indicator */}
                <div className="absolute top-0 right-8 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{user.name}</h2>
                <p className="text-[var(--color-text-secondary)] text-sm mb-3">{user.email}</p>
                <Badge 
                  variant={user.role === "student" ? "success" : user.role === "instructor" ? "primary" : "accent"}
                  className="inline-flex items-center gap-1"
                >
                  {user.role === "student" ? "🎓" : user.role === "instructor" ? "👨‍🏫" : "⚙️"}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--color-surface)] rounded-lg w-full">
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
            </div>

            <nav className="w-full space-y-3">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group/item ${
                  activeTab === "profile" 
                    ? "bg-[var(--color-primary)] text-white shadow-md transform scale-[1.02]" 
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:scale-105"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === "profile" 
                    ? "bg-white/20" 
                    : "bg-[var(--color-primary)]/10 group-hover/item:bg-[var(--color-primary)]/20"
                }`}>
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                </div>
                <span className="font-medium">Profile Information</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group/item ${
                  activeTab === "password" 
                    ? "bg-[var(--color-primary)] text-white shadow-md transform scale-[1.02]" 
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:scale-105"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === "password" 
                    ? "bg-white/20" 
                    : "bg-[var(--color-primary)]/10 group-hover/item:bg-[var(--color-primary)]/20"
                }`}>
                  <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                </div>
                <span className="font-medium">Change Password</span>
              </button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" ? (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-[var(--color-primary)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Profile Information</h2>
              </div>

              {successMessage && (
                <div className="mb-4 p-4 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 p-4 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: "Name is required" })}
                  error={errors.name?.message}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                  required
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLock} className="text-[var(--color-primary)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Change Password</h2>
              </div>

              {successMessage && (
                <div className="mb-4 p-4 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 p-4 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter your current password"
                  {...registerPassword("currentPassword", { required: "Current password is required" })}
                  error={passwordErrors.currentPassword?.message}
                  required
                />

                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter your new password"
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  error={passwordErrors.newPassword?.message}
                  helperText="Password must be at least 8 characters long"
                  required
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm your new password"
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === passwordWatch || "Passwords do not match",
                  })}
                  error={passwordErrors.confirmPassword?.message}
                  required
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Updating Password..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
