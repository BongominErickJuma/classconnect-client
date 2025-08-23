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
  <>
    {/* Desktop Signup */}
    <div className="hidden md:flex min-h-screen items-center justify-center w-full bg-[var(--color-primary-bg)] p-8">
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
    </div>
    
    {/* Mobile Signup */}
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
  </>
);

export default SignupForm;
