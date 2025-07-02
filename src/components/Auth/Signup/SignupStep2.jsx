// src/components/auth/Signup/SignupStep2.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

const SignupStep2 = ({ formData, errors, handleChange, validateField, handleSubmit, isSubmitting, setStep }) => (
  <>
    <InputField
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      onBlur={() => validateField("password")}
      icon={faLock}
      placeholder="••••••••"
      isValid={!errors.password && formData.password}
      validationMessage={errors.password}
    />
    <InputField
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={handleChange}
      onBlur={() => validateField("confirmPassword")}
      icon={faLock}
      placeholder="••••••••"
      isValid={!errors.confirmPassword && formData.confirmPassword === formData.password && formData.confirmPassword}
      validationMessage={errors.confirmPassword}
    />
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-1/2 py-3 px-4 rounded-lg font-medium border border-accent text-accent bg-transparent"
      >
        Back
      </button>
      <button
        type="submit"
        className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-accent"
        disabled={
          isSubmitting || !formData.password || !formData.confirmPassword || errors.password || errors.confirmPassword
        }
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  </>
);

export default SignupStep2;
