// src/pages/EmailVerificationPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Logo from "../../../svgs/Logo";
import { Button, Loading } from "../../ui";
import { authService, getImageUrl, userService } from "../../../Services/api";
import useCurrentUser from "../../Hooks/useCurrentUser";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const token = searchParams.get("token");
  const { setUser } = useCurrentUser();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token");
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus("success");
        setMessage("Email verified successfully! Redirecting to dashboard...");

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
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "Email verification failed");
      }
    };

    verifyEmail();
  }, [token, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full bg-[var(--color-primary-bg)]">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="bg-[var(--color-background)] rounded-2xl shadow-2xl border border-[var(--color-border)] p-8 lg:p-12 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-md">
                <Logo className="text-white w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                ClassConnect
              </h1>
            </div>
          </div>

          {/* Verifying State */}
          {status === "verifying" && (
            <div className="animate-slide-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-info)] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl text-white animate-pulse">🔍</div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Verifying Your Email
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-8">
                Please wait while we verify your email address...
              </p>
              <Loading size="lg" text="Verifying..." />
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="animate-slide-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-success)] to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-slide-in-down">
                <div className="text-3xl text-white">✅</div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-success)] mb-4">
                Email Verified Successfully! 🎉
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
                Welcome to ClassConnect! Your account is now active and ready to use.
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
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="animate-slide-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-error)] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl text-white">❌</div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-error)] mb-4">
                Verification Failed
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
                {message}
              </p>

              {/* Help Information */}
              <div className="bg-[var(--color-surface)] p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">What you can do:</h3>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-primary)]">•</span>
                    <span>Check if the link has expired</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-primary)]">•</span>
                    <span>Request a new verification email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-primary)]">•</span>
                    <span>Contact support if issues persist</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/login")}
                  variant="secondary"
                  size="lg"
                  className="w-1/2"
                >
                  <div className="flex items-center gap-2">
                    <span>←</span>
                    <span>Login</span>
                  </div>
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="primary"
                  size="lg"
                  className="w-1/2"
                >
                  <div className="flex items-center gap-2">
                    <span>Sign Up</span>
                    <span>→</span>
                  </div>
                </Button>
              </div>

              <p className="text-xs text-[var(--color-text-muted)] mt-6">
                Need help?{" "}
                <Link to="/contact" className="text-[var(--color-primary)] hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
