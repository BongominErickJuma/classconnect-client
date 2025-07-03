// src/components/auth/Signup/SuccessMessage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessMessage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary-bg">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-accent">Almost there!</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 px-4 rounded-lg font-medium text-white bg-accent"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
