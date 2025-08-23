// src/components/auth/Signup/SignupStep1.jsx
import React from "react";
import { Input, Button } from "../../ui";

const SignupStep1 = ({ formData, errors, handleChange, validateField, handleContinue }) => (
  <div className="space-y-6">
    <div className="space-y-5">
      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        onBlur={() => validateField("name")}
        placeholder="Enter your full name"
        error={errors.name}
        required
        className="transform transition-all duration-200 hover:scale-[1.02]"
      />
      
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => validateField("email")}
        placeholder="Enter your email address"
        error={errors.email}
        required
        className="transform transition-all duration-200 hover:scale-[1.02]"
      />
    </div>

    <div className="pt-2">
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
        disabled={!formData.name || !formData.email || errors.name || errors.email}
      >
        <div className="flex items-center gap-2">
          <span>Continue</span>
          <span className="text-lg">→</span>
        </div>
      </Button>
    </div>
  </div>
);

export default SignupStep1;
