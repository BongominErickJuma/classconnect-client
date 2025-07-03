// src/pages/PasswordResetPage.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Logo from "../../../svgs/Logo";
import { faLock, faKey, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const token = searchParams.get("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      // await axios.patch(`https://classconnect-server-fxpq.onrender.com/api/v1/ecl/users/resetPassword/${token}`, {
      //   password: formData.newPassword,
      // });

      await axios.patch(`http://localhost:3000/api/v1/ecl/users/resetPassword/${token}`, {
        password: formData.newPassword,
      });

      setSuccess(true);
      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Logo className="w-12 h-12" />
          <h1 className="text-2xl font-bold mt-2">{success ? "Password Updated!" : "Reset Password"}</h1>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

        {success ? (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4" />
            <p className="mb-6">Your password has been updated successfully!</p>
            <p className="text-gray-500">Redirecting to dashboard...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-600 h-2 rounded-full animate-progress" style={{ width: "100%" }}></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faKey} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded text-white ${
                isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
