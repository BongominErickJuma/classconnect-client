// src/components/auth/Login/LoginForm.jsx
import React from "react";
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

const LoginForm = ({ formData, handleChange, handleSubmit, isLoading, error, successMessage }) => (
  <>
    {/* Desktop Login */}
    <div className="hidden md:flex min-h-screen items-center justify-center w-full bg-[var(--color-primary-bg)] p-8">
      <LoginDesktop
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        successMessage={successMessage}
      />
    </div>
    
    {/* Mobile Login */}
    <LoginMobile
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
    />
  </>
);

export default LoginForm;
