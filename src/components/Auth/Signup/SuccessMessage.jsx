// src/components/auth/Signup/SuccessMessage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../svgs/Logo";
import { Button } from "../../ui";

const SuccessMessage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-primary-bg)]">
      <div className="bg-[var(--color-background)] p-8 lg:p-12 rounded-2xl shadow-2xl border border-[var(--color-border)] max-w-lg text-center animate-fade-in">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-success)] to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-slide-in-down">
            <div className="text-3xl text-white">✓</div>
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
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-success)]">
            Welcome Aboard! 🎉
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
            {message || "Your account has been created successfully! Please check your email to verify your account before signing in."}
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
                <span>Click the verification link</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">3.</span>
                <span>Sign in to start learning!</span>
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
              <span>Continue to Login</span>
              <span>→</span>
            </div>
          </Button>

          <p className="text-xs text-[var(--color-text-muted)] mt-6">
            Didn't receive the email? Check your spam folder or{" "}
            <button className="text-[var(--color-primary)] hover:underline">
              resend verification
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
