// src/pages/EmailVerificationPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Logo from "../../../svgs/Logo";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        await axios.patch(`http://localhost:3000/api/v1/ecl/users/verify-email/${token}`);
        // await axios.patch(`https://classconnect-server-fxpq.onrender.com/api/v1/ecl/users/verify-email/${token}`);
        setStatus("success");
        setMessage("Email verified successfully! Redirecting to dashboard...");

        // Automatically redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Email verification failed");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <Logo className="w-12 h-12" />
          <h1 className="text-2xl font-bold mt-2">Email Verification</h1>
        </div>

        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="mb-6">{message}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-teal-600 h-2.5 rounded-full animate-progress" style={{ width: "100%" }}></div>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <p className="mb-6">{message}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 py-2 px-4 border border-gray-300 rounded hover:bg-gray-100"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
