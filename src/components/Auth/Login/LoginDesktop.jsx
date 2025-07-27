// src/components/auth/Login/LoginDesktop.jsx
import React from "react";
import Logo from "../../../svgs/Logo";
import InputField from "./InputField";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginDesktop = ({ formData, handleChange, handleSubmit, isLoading, error }) => (
  <div className="hidden md:flex w-full max-w-6xl bg-white rounded-lg shadow-lg">
    <div
      className="w-1/2 flex items-center justify-center p-8 bg-light-bg"
      style={{ backgroundColor: "var(--color-light-bg)" }}
    >
      <img
        src="/images/img_desk.png"
        alt="Desktop App Logo"
        className="w-full max-w-xs object-contain"
        width={320}
        height={320}
        style={{ minWidth: "280px" }}
      />
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
  </div>
);

export default LoginDesktop;
