// src/components/auth/Login/LoginForm.jsx
import React from "react";
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

const LoginForm = ({ formData, handleChange, handleSubmit, isLoading, error }) => (
  <div
    className="min-h-screen flex items-center justify-center p-4"
    style={{ backgroundColor: "var(--color-primary-bg)" }}
  >
    <LoginDesktop
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
    <LoginMobile
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  </div>
);

export default LoginForm;
