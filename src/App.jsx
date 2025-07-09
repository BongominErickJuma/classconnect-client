import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/Login/LoginPage";
import SignupPage from "./components/Auth/Signup/SignupPage";
import EmailVerificationPage from "./components/Auth/Verification/EmailVerificationPage";
import ForgotPasswordPage from "./components/Auth/Verification/ForgotPasswordPage";
import PasswordResetPage from "./components/Auth/Verification/PasswordResetPage";
import DashboardLayoutWrapper from "./components/Dashboard/DashboardLayoutWrapper";
import Home from "./components/Dashboard/Sections/DashboardHome/Home";
import Courses from "./components/Dashboard/Sections/Courses/Courses";
import CourseDetails from "./components/Dashboard/Sections/Courses/CourseDetails";
import ProfilePage from "./components/Dashboard/Sections/Profile/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AssignmentDetails from "./components/Dashboard/Assignments/AssignmentDetails";
import MyCourses from "./components/Dashboard/Sections/Courses/MyCourses";
import Users from "./components/Dashboard/Sections/Users/Users";

const App = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayoutWrapper />}>
            <Route index element={<Home />} />
            <Route path="featured" element={<Courses />} />
            <Route path="my_courses" element={<MyCourses />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="assignments/:id" element={<AssignmentDetails />} />
            <Route path="users" element={<Users />} />
            <Route path="instructors" element={<Users />} />
            <Route path="settings" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
