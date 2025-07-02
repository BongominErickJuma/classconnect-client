// src/components/auth/Signup/SignupForm.jsx
import React from "react";
import SignupDesktop from "./SignupDesktop";
import SignupMobile from "./SignupMobile";

const SignupForm = ({
  step,
  formData,
  errors,
  handleChange,
  validateField,
  handleContinue,
  handleSubmit,
  isSubmitting,
  setStep,
}) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-primary-bg">
    <SignupDesktop
      step={step}
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      validateField={validateField}
      handleContinue={handleContinue}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      setStep={setStep}
    />
    <SignupMobile
      step={step}
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      validateField={validateField}
      handleContinue={handleContinue}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      setStep={setStep}
    />
  </div>
);

export default SignupForm;
