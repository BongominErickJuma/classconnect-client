// src/components/auth/Login/LoginMobile.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "../../ui";
import { Link } from "react-router-dom";

const LoginMobile = ({ formData, handleChange, handleSubmit, isLoading, error, successMessage }) => (
  <div className="md:hidden w-full min-h-screen bg-[var(--color-primary-bg)] px-4 py-8 animate-fade-in">
    <div className="max-w-sm mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8 animate-slide-in-down">
        {/* Logo and Image */}
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-3xl p-6 shadow-lg">
            <img 
              src="/images/img_phone.png" 
              alt="ClassConnect Mobile" 
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
        
        {/* Welcome Message */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
          Welcome Back! 👋
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Sign in to continue your learning journey
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-lg animate-slide-in-up">
          <div className="flex items-center gap-2 text-[var(--color-success)]">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-sm">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-lg animate-slide-in-up">
          <div className="flex items-center gap-2 text-[var(--color-error)]">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-[var(--color-background)] rounded-2xl shadow-lg border border-[var(--color-border-light)] p-6 animate-slide-in-up">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing you in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <span>→</span>
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t border-[var(--color-border-light)]">
          <div className="space-y-4 text-center">
            <Link
              to="/forgot-password"
              className="group flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 font-medium"
            >
              <span>🔑</span>
              <span className="group-hover:underline">Forgot your password?</span>
            </Link>
            
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span>Don't have an account?</span>
              <Link
                to="/signup"
                className="group bg-[var(--color-surface)] hover:bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 font-semibold"
              >
                <span className="flex items-center gap-1">
                  <span>Sign up</span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </span>
              </Link>
            </div>

            {/* Terms */}
            <p className="text-xs text-[var(--color-text-muted)] mt-4 pt-4 border-t border-[var(--color-border)]">
              By signing in, you agree to our{" "}
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

export default LoginMobile;
