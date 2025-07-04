// src/components/auth/Signup/SignupDesktop.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

const SignupDesktop = ({
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
  <div className="hidden md:flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
    <div
      className="w-1/2 flex items-center justify-center p-8 bg-light-bg"
      style={{ backgroundColor: "var(--color-light-bg)" }}
    >
      <img
        src="/images/img_desk.png"
        alt="Desktop App Logo"
        className="w-full max-w-xs object-contain"
        width={320}
        height={320}
        style={{ minWidth: "280px" }}
      />
    </div>
    <div className="w-1/2 p-8">
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

export default SignupDesktop;
