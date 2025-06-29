import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      <Router>
        <Routes>
          <Route path="/classconnect-client" element={<LoginPage />} />
          <Route path="/classconnect-client/login" element={<LoginPage />} />
          <Route path="/classconnect-client/signup" element={<SignupPage />} />
          <Route path="/classconnect-client/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
