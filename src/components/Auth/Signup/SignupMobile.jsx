// src/components/auth/Signup/SignupMobile.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import { Link } from "react-router-dom";

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
  <div className="md:hidden w-full min-h-screen bg-[var(--color-primary-bg)] px-4 py-6 animate-fade-in">
    <div className="max-w-sm mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8 animate-slide-in-down">
        {/* Logo and Image */}
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-3xl p-6 shadow-lg">
            <img 
              src="/images/img_phone.png" 
              alt="ClassConnect Signup" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Branding */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-md">
            <Logo className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            ClassConnect
          </h1>
        </div>
        
        {/* Welcome Message & Progress */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
          {step === 1 ? "Create Account 📝" : "Secure Account 🔐"}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {step === 1 ? "Join thousands of learners" : "Choose a strong password"}
        </p>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 1 ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-primary)]/50'}`}></div>
          <div className="w-6 h-0.5 bg-[var(--color-border)]"></div>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 2 ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`}></div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">
          Step {step} of 2
        </p>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-lg animate-slide-in-up">
          <div className="flex items-center gap-2 text-[var(--color-error)]">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-sm">{errors.general}</span>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-[var(--color-background)] rounded-2xl shadow-lg border border-[var(--color-border-light)] p-6 animate-slide-in-up">
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
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t border-[var(--color-border-light)]">
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="group text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-200 font-semibold"
              >
                <span className="group-hover:underline">Sign in</span>
                <span className="ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
              </Link>
            </p>

            {/* Terms */}
            <p className="text-xs text-[var(--color-text-muted)] mt-4 pt-4 border-t border-[var(--color-border)]">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-[var(--color-primary)] hover:underline">Terms</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignupMobile;
