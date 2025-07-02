// src/components/auth/Signup/SignupStep1.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

const SignupStep1 = ({ formData, errors, handleChange, validateField, handleContinue }) => (
  <>
    <InputField
      label="Full Name"
      name="name"
      type="text"
      value={formData.name}
      onChange={handleChange}
      onBlur={() => validateField("name")}
      icon={faUser}
      placeholder="John Doe"
      isValid={!errors.name && formData.name}
      validationMessage={errors.name}
    />
    <InputField
      label="Email Address"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      onBlur={() => validateField("email")}
      icon={faEnvelope}
      placeholder="your@email.com"
      isValid={!errors.email && formData.email}
      validationMessage={errors.email}
    />
    <button
      type="submit"
      className="w-full py-3 px-4 rounded-lg font-medium text-white bg-accent flex justify-center items-center"
      disabled={!formData.name || !formData.email || errors.name || errors.email}
    >
      Continue <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
    </button>
  </>
);

export default SignupStep1;
