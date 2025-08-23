// src/components/auth/Signup/SignupStep2.jsx
import React from "react";
import { Input, Button } from "../../ui";

const SignupStep2 = ({ formData, errors, handleChange, validateField, handleSubmit, isSubmitting, setStep }) => (
  <div className="space-y-6">
    <div className="space-y-5">
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={() => validateField("password")}
        placeholder="Create a strong password"
        error={errors.password}
        helperText="Must be at least 8 characters long"
        required
        className="transform transition-all duration-200 hover:scale-[1.02]"
      />
      
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={() => validateField("confirmPassword")}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
        required
        className="transform transition-all duration-200 hover:scale-[1.02]"
      />
    </div>

    <div className="pt-2 space-y-3">
      {/* Password Strength Indicator */}
      {formData.password && (
        <div className="bg-[var(--color-surface)] p-3 rounded-lg">
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Password Strength:</p>
          <div className="flex gap-2">
            <div className={`h-2 flex-1 rounded ${formData.password.length >= 8 ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`}></div>
            <div className={`h-2 flex-1 rounded ${formData.password.length >= 10 && /[A-Z]/.test(formData.password) ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`}></div>
            <div className={`h-2 flex-1 rounded ${formData.password.length >= 12 && /[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password) ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`}></div>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
            <span className={formData.password.length >= 8 ? 'text-[var(--color-success)]' : ''}>8+ chars</span>
            <span className={/[A-Z]/.test(formData.password) ? 'text-[var(--color-success)]' : ''}>Uppercase</span>
            <span className={/[0-9]/.test(formData.password) ? 'text-[var(--color-success)]' : ''}>Number</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => setStep(1)}
          className="w-1/2"
        >
          <div className="flex items-center gap-2">
            <span>←</span>
            <span>Back</span>
          </div>
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-1/2 transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          disabled={
            isSubmitting || !formData.password || !formData.confirmPassword || errors.password || errors.confirmPassword
          }
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating Account...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Create Account</span>
              <span>🎉</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  </div>
);

export default SignupStep2;
