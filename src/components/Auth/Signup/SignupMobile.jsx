// src/components/auth/Signup/SignupMobile.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

const SignupMobile = ({
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
  <div className="md:hidden w-full h-screen bg-white rounded-lg shadow-lg">
    {/* Mobile image at the top */}
    <div className="w-full flex items-center justify-center p-4 bg-light-bg">
      <img src="/images/img_phone.png" alt="App Logo" className="h-32" />
    </div>

    <div className="p-2">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-accent">
          <Logo /> ClassCon
        </h1>
        <h2 className="text-md font-semibold text-text-base">{step === 1 ? "Join Us" : "Set Password"}</h2>
      </div>

      {errors.general && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{errors.general}</div>}

      <form onSubmit={step === 1 ? handleContinue : handleSubmit}>
        {step === 1 ? (
          <SignupStep1
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            validateField={validateField}
            handleContinue={handleContinue}
          />
        ) : (
          <SignupStep2
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            validateField={validateField}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            setStep={setStep}
          />
        )}
        <div className="text-center pt-4">
          <p className="text-sm text-text-base">
            Already have an account?{" "}
            <a href="/login" className="hover:underline text-accent">
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
);

export default SignupMobile;
