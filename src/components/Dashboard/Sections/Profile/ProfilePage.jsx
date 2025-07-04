import { useState } from "react";
import PasswordSection from "./PasswordSection";
import DisplayProfile from "./DisplayProfile";
import EditingProfile from "./EditingProfile";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [profileImage, setProfileImage] = useState(user.profile_photo);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add profile update logic here
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Add password reset logic here
    alert("Password reset successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <ProfileHeader profileImage={profileImage} name={name} handleImageUpload={handleImageUpload} email={email} />

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-[#333333]">Profile Information</h2>
            <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-medium text-white p-2 rounded-lg">
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <EditingProfile
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
            />
          ) : (
            <DisplayProfile name={name} email={email} role={user.role} />
          )}

          {/* Password Reset Section */}
          <PasswordSection
            handlePasswordReset={handlePasswordReset}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
