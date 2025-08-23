// src/components/auth/Signup/SignupDesktop.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import { Link } from "react-router-dom";

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
  <div className="w-full max-w-6xl animate-fade-in flex">
    {/* Left Panel - Image */}
    <div className="w-1/2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-l-2xl p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>
      
      <div className="relative z-10 text-center text-white">
        <div className="mb-8">
          <img
            src="/images/img_desk.png"
            alt="ClassConnect Signup Illustration"
            className="w-full max-w-sm mx-auto object-contain animate-slide-in-up"
            width={320}
            height={320}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Join ClassConnect Today! 🚀</h2>
        <p className="text-lg text-white/90 leading-relaxed">
          Create your account and start your learning journey with thousands of students
        </p>
        
        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 1 ? 'bg-white' : 'bg-white/50'}`}></div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step === 2 ? 'bg-white' : 'bg-white/30'}`}></div>
          </div>
          <p className="text-sm text-white/70 mt-2">
            Step {step} of 2
          </p>
        </div>
      </div>
    </div>

    {/* Right Panel - Form */}
    <div className="w-1/2 bg-[var(--color-background)] rounded-r-2xl shadow-2xl border border-l-0 border-[var(--color-border)]">
      <div className="p-8 lg:p-12 h-full flex flex-col justify-center animate-slide-in-down">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-md">
              <Logo className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              ClassConnect
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
            {step === 1 ? "Create Your Account 📝" : "Secure Your Account 🔐"}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            {step === 1 
              ? "Let's get started with your basic information" 
              : "Choose a strong password to protect your account"
            }
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-lg animate-slide-in-up">
            <div className="flex items-center gap-2 text-[var(--color-error)]">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{errors.general}</span>
            </div>
          </div>
        )}

        {/* Form Steps */}
        <form onSubmit={step === 1 ? handleContinue : handleSubmit} className="space-y-6">
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
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
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
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)]">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-[var(--color-primary)] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[var(--color-primary)] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignupDesktop;
