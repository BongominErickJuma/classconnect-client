import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faArrowRight, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Logo from "../svgs/Logo";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, name, type, value, onChange, icon, placeholder }) => (
  <div className="relative">
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <div className="relative">
      <FontAwesomeIcon
        icon={icon}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-normal icon"
      />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-10 rounded-lg font-normal"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);

const SignupForm = ({ step, formData, handleChange, handleContinue, handleSubmit, setStep }) => (
  <form onSubmit={step === 1 ? handleContinue : handleSubmit}>
    {step === 1 ? (
      <div className="space-y-4 sm:space-y-6">
        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          icon={faUser}
          placeholder="John Doe"
        />
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={faEnvelope}
          placeholder="your@email.com"
        />
        <button
          type="submit"
          className="text-white w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          Continue <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
    ) : (
      <div className="space-y-4 sm:space-y-6">
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          icon={faLock}
          placeholder="••••••••"
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={faLock}
          placeholder="••••••••"
        />
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-1/2 py-3 px-4 rounded-lg font-medium transition-colors border"
            style={{
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
              backgroundColor: "transparent",
            }}
          >
            Back
          </button>
          <button type="submit" className="w-1/2 py-3 px-4 rounded-lg font-medium transition-colors text-white">
            Sign Up
          </button>
        </div>
      </div>
    )}
    <div className="text-center pt-4">
      <p className="text-sm" style={{ color: "var(--color-text-base)" }}>
        Already have an account?{" "}
        <a href="/classconnect-client/login" className="hover:underline" style={{ color: "var(--color-accent)" }}>
          Log in
        </a>
      </p>
    </div>
  </form>
);

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setStep(2);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/classconnect-client/dashboard");
  };

  const renderFormLayout = (isMobile) => (
    <div className={`w-full ${isMobile ? "max-w-md p-6 sm:p-8" : "flex max-w-4xl"} bg-white rounded-lg shadow-lg`}>
      {!isMobile && (
        <div
          className="w-1/2 flex items-center justify-center p-8"
          style={{ backgroundColor: "var(--color-light-bg)" }}
        >
          <img
            src="/classconnect-client/images/img_desk.png"
            alt="Desktop App Logo"
            className="w-full max-w-xs object-contain"
          />
        </div>
      )}
      <div className={isMobile ? "" : "w-1/2 p-8"}>
        <div className="flex flex-col items-center mb-6">
          {isMobile && (
            <img
              src="/classconnect-client/images/img_phone.png"
              alt="Mobile App Logo"
              className="w-16 h-16 mb-3 object-contain"
            />
          )}
          <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-accent)" }}>
            <Logo />
            ClassCon
          </h1>
          <h2 className="text-md font-semibold mb-1" style={{ color: "var(--color-text-base)" }}>
            {step === 1 ? "Join Us" : "Set Password"}
          </h2>
        </div>
        <SignupForm
          step={step}
          formData={formData}
          handleChange={handleChange}
          handleContinue={handleContinue}
          handleSubmit={handleSubmit}
          setStep={setStep}
        />
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      <div className="hidden md:block">{renderFormLayout(false)}</div>
      <div className="md:hidden">{renderFormLayout(true)}</div>
    </div>
  );
};

export default SignupPage;
