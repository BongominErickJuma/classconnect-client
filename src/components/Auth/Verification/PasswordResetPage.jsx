// src/pages/PasswordResetPage.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Logo from "../../../svgs/Logo";
import { Input, Button } from "../../ui";
import { authService, getImageUrl, userService } from "../../../Services/api";
import useCurrentUser from "../../Hooks/useCurrentUser";

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { setUser } = useCurrentUser();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const token = searchParams.get("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return "Passwords don't match";
    }
    if (formData.newPassword.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationError = validatePasswords();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      await authService.resetPassword(formData.newPassword, token);
      setSuccess(true);

      const fetchedUser = await userService.getMe();
      const currentUser = fetchedUser.data.user;
      currentUser.profile_photo = getImageUrl(currentUser.profile_photo);
      setUser(currentUser);

      // Countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full bg-[var(--color-primary-bg)]">
      <div className="w-full max-w-lg animate-fade-in">
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
          </div>

          {success ? (
            // Success State
            <div className="text-center animate-slide-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-success)] to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-slide-in-down">
                <div className="text-3xl text-white">✅</div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-success)] mb-4">
                Password Updated Successfully! 🎉
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
                Your password has been reset successfully. You can now use your new password to sign in.
              </p>

              {/* Countdown */}
              <div className="bg-[var(--color-surface)] p-4 rounded-lg mb-8">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  Redirecting to dashboard in:
                </p>
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {countdown}
                </div>
                <div className="w-full bg-[var(--color-border)] rounded-full h-2 mt-3">
                  <div 
                    className="bg-[var(--color-success)] h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/dashboard")}
                variant="primary"
                size="lg"
                className="w-full transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span>Continue to Dashboard</span>
                  <span>🚀</span>
                </div>
              </Button>
            </div>
          ) : (
            // Form State
            <div className="animate-slide-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                  Reset Your Password 🔒
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg">
                  Choose a strong password to secure your account
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <Input
                    type="password"
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    helperText="Must be at least 8 characters long"
                    className="transform transition-all duration-200 hover:scale-[1.02]"
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    error={formData.confirmPassword && formData.newPassword !== formData.confirmPassword ? "Passwords don't match" : ""}
                    className="transform transition-all duration-200 hover:scale-[1.02]"
                  />
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="bg-[var(--color-surface)] p-3 rounded-lg">
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Password Strength:</p>
                    <div className="flex gap-2">
                      <div className={`h-2 flex-1 rounded ${formData.newPassword.length >= 8 ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`}></div>
                      <div className={`h-2 flex-1 rounded ${formData.newPassword.length >= 10 && /[A-Z]/.test(formData.newPassword) ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`}></div>
                      <div className={`h-2 flex-1 rounded ${formData.newPassword.length >= 12 && /[A-Z]/.test(formData.newPassword) && /[0-9]/.test(formData.newPassword) ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`}></div>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
                      <span className={formData.newPassword.length >= 8 ? 'text-[var(--color-success)]' : ''}>8+ chars</span>
                      <span className={/[A-Z]/.test(formData.newPassword) ? 'text-[var(--color-success)]' : ''}>Uppercase</span>
                      <span className={/[0-9]/.test(formData.newPassword) ? 'text-[var(--color-success)]' : ''}>Number</span>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    className="w-full transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    disabled={!formData.newPassword || !formData.confirmPassword || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Updating Password...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Update Password</span>
                        <span>🔐</span>
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
    </div>
  );
};

export default PasswordResetPage;
