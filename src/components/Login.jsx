import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Logo from "../svgs/Logo";
import { useNavigate } from "react-router-dom";

// Reusable Input Field
const InputField = ({ type, icon, label, placeholder }) => (
  <div className="relative">
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <div className="relative">
      <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 icon" />
      <input type={type} placeholder={placeholder} required className="w-full p-3 pl-10 rounded-lg font-normal" />
    </div>
  </div>
);

// Reusable Login Form
const LoginForm = ({ onLoginSuccess }) => (
  <form className="space-y-4 sm:space-y-6" onSubmit={((e) => e.preventDefault(), onLoginSuccess())}>
    <InputField type="email" icon={faEnvelope} label="Email address" placeholder="your@email.com" />
    <InputField type="password" icon={faLock} label="Password" placeholder="••••••••" />

    <button type="submit" className="w-full py-3 px-4 rounded-lg font-medium transition-colors text-white">
      Log in
    </button>

    {/* Flex container for links */}
    <div className="flex justify-between pt-2 text-sm">
      <a href="#" className="hover:underline" style={{ color: "var(--color-text-base)" }}>
        Forgot password?
      </a>
      <a href="/signup" className="hover:underline" style={{ color: "var(--color-accent)" }}>
        Signup?
      </a>
    </div>
  </form>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const onLoginSuccess = () => {
    navigate("/dashboard");
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="w-1/2 flex items-center justify-center p-8"
          style={{ backgroundColor: "var(--color-light-bg)" }}
        >
          <img src="/images/img_desk.png" alt="Desktop App Logo" className="w-full max-w-xs object-contain" />
        </div>
        <div className="w-1/2 p-8">
          <div className="mb-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-accent)" }}>
              <Logo />
              ClassCon
            </h1>
            <h2 className="text-md font-semibold mb-1" style={{ color: "var(--color-text-base)" }}>
              Welcome Back
            </h2>
          </div>

          <LoginForm onLoginSuccess={() => onLoginSuccess} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className="md:hidden w-full max-w-md p-6 sm:p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: "var(--color-light-bg)" }}
      >
        <div className="mb-6 flex flex-col items-center">
          <img src="/images/img_phone.png" alt="Mobile App Logo" className="w-16 h-16 mb-3 object-contain" />

          <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-accent)" }}>
            <Logo />
            ClassCon
          </h1>
          <h2 className="text-md font-semibold mb-1" style={{ color: "var(--color-text-base)" }}>
            Welcome Back
          </h2>
        </div>
        <LoginForm onLoginSuccess={() => onLoginSuccess} />{" "}
      </div>
    </div>
  );
};

export default LoginPage;
