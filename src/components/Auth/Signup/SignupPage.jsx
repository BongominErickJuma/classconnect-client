// src/components/auth/Signup/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../Services/api";

import SignupForm from "./SignupForm";
import SuccessMessage from "./SuccessMessage";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (fieldName) => {
    const value = formData[fieldName];
    let error = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name is too short";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!validateEmail(value)) error = "Please enter a valid email";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateField("name") && validateField("email")) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateField("password") && validateField("confirmPassword")) {
      try {
        const response = await authService.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === "success") {
          setSignupSuccess(true);
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          const backendErrors = {};
          Object.entries(error.response.data.errors).forEach(([key, val]) => {
            backendErrors[key] = val.message;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: error.message || "Signup failed" });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  if (signupSuccess) {
    return <SuccessMessage email={formData.email} />;
  }

  return (
    <SignupForm
      step={step}
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      validateField={validateField}
      handleContinue={handleContinue}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      setStep={setStep}
    />
  );
};

export default SignupPage;
