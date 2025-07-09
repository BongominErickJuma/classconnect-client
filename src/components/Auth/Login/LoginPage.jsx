// src/components/auth/Login/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, getImageUrl, userService } from "../../../Services/api";

import LoginForm from "./LoginForm";
import useCurrentUser from "../../Hooks/useCurrentUser";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useCurrentUser();

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
    />
  );
};

export default LoginPage;
