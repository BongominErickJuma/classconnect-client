// src/components/auth/Login/LoginDesktop.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Card } from "../../ui";
import { Link } from "react-router-dom";

const LoginDesktop = ({ formData, handleChange, handleSubmit, isLoading, error, successMessage }) => (
  <div className="hidden md:flex w-full max-w-6xl animate-fade-in">
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
            alt="ClassConnect Illustration"
            className="w-full max-w-sm mx-auto object-contain animate-slide-in-up"
            width={320}
            height={320}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Welcome to ClassConnect</h2>
        <p className="text-lg text-white/80 leading-relaxed">
          Your gateway to seamless learning experiences and academic excellence
        </p>
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
            Welcome Back! 👋
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-lg animate-slide-in-up">
            <div className="flex items-center gap-2 text-[var(--color-success)]">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-lg animate-slide-in-up">
            <div className="flex items-center gap-2 text-[var(--color-error)]">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="transform transition-all duration-200 hover:scale-[1.02]"
            />
            
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="transform transition-all duration-200 hover:scale-[1.02]"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing you in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <span className="text-lg">→</span>
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="group flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all duration-200 font-medium"
            >
              <span>🔑</span>
              <span className="group-hover:underline">Forgot password?</span>
            </Link>
            <Link
              to="/signup"
              className="group flex items-center gap-2 text-sm bg-[var(--color-surface)] hover:bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:text-white px-4 py-2 rounded-lg transition-all duration-200 font-semibold"
            >
              <span>Create Account</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-6 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)]">
              By signing in, you agree to our{" "}
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

export default LoginDesktop;
