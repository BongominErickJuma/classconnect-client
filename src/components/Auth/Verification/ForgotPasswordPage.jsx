// src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../../svgs/Logo";
import { Input, Button } from "../../ui";
import { authService } from "../../../Services/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full bg-[var(--color-primary-bg)]">
      <div className="w-full max-w-lg animate-fade-in">
        {success ? (
          // Success State
          <div className="bg-[var(--color-background)] rounded-2xl shadow-2xl border border-[var(--color-border)] p-8 lg:p-12 text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-success)] to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-slide-in-down">
                <div className="text-3xl text-white">📧</div>
              </div>
              
              {/* Branding */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl">
                  <Logo className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                  ClassConnect
                </h1>
              </div>
            </div>

            {/* Success Content */}
            <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-success)]">
                Email Sent! 📤
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
                {message || `We've sent a password reset link to ${email}. Check your inbox and follow the instructions to reset your password.`}
              </p>

              {/* Next Steps */}
              <div className="bg-[var(--color-surface)] p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">What's next?</h3>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-success)]">1.</span>
                    <span>Check your email inbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-success)]">2.</span>
                    <span>Click the reset password link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-success)]">3.</span>
                    <span>Create a new password</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/login")}
                variant="primary"
                size="lg"
                className="w-full transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span>←</span>
                  <span>Back to Login</span>
                </div>
              </Button>

              <p className="text-xs text-[var(--color-text-muted)] mt-6">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        ) : (
          // Form State
          <div className="bg-[var(--color-background)] rounded-2xl shadow-2xl border border-[var(--color-border)] p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8 animate-slide-in-down">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-md">
                  <Logo className="text-white w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                  ClassConnect
                </h1>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                Forgot Password? 🔑
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg">
                No worries! Enter your email and we'll send you reset instructions
              </p>
            </div>

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
            <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter the email you used to sign up"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transform transition-all duration-200 hover:scale-[1.02]"
              />

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
                      Sending Reset Link...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Send Reset Link</span>
                      <span>📧</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="group text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-200 font-semibold"
                >
                  <span className="group-hover:underline">Sign in</span>
                  <span className="ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
