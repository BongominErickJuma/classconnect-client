// src/components/auth/Login/LoginMobile.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import InputField from "./InputField";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginMobile = ({ formData, handleChange, handleSubmit, isLoading, error }) => (
  <div
    className="md:hidden w-full p-2 sm:p-8 rounded-lg shadow-lg h-screen"
    style={{ backgroundColor: "var(--color-light-bg)" }}
  >
    <div className="mb-6 flex flex-col items-center">
      <img src="/images/img_phone.png" alt="Mobile App Logo" className="w-32 h-32 mb-3 object-contain" />

      <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: "var(--color-accent)" }}>
        <Logo />
        ClassCon
      </h1>
      <h2 className="text-md font-semibold mb-1" style={{ color: "var(--color-text-base)" }}>
        Welcome Back
      </h2>
    </div>

    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <InputField
        type="email"
        name="email"
        icon={faEnvelope}
        label="Email address"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        icon={faLock}
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-lg font-medium transition-colors text-white"
        style={{
          backgroundColor: "var(--color-accent)",
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>

      <div className="flex justify-between pt-2 text-sm">
        <a href="/forgot-password" className="hover:underline" style={{ color: "var(--color-text-base)" }}>
          Forgot password?
        </a>
        <a href="/signup" className="hover:underline" style={{ color: "var(--color-accent)" }}>
          Signup?
        </a>
      </div>
    </form>
  </div>
);

export default LoginMobile;
