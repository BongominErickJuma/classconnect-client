// src/components/auth/Login/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService, getImageUrl, userService } from "../../../Services/api";

import LoginForm from "./LoginForm";
import useCurrentUser from "../../Hooks/useCurrentUser";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useCurrentUser();

  // Check for success message from signup redirect
  useEffect(() => {
    if (location.state?.message && location.state?.type === "success") {
      setSuccessMessage(location.state.message);
      // Clear the state so it doesn't persist on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.login(formData);

      const fetchedUser = await userService.getMe();
      const currentUser = fetchedUser.data.user;
      currentUser.profile_photo = getImageUrl(currentUser.profile_photo);
      setUser(currentUser); // Update context

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
    />
  );
};

export default LoginPage;
