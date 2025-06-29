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
          <Route path="/cc" element={<LoginPage />} />
          <Route path="/cc/login" element={<LoginPage />} />
          <Route path="/cc/signup" element={<SignupPage />} />
          <Route path="/cc/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
