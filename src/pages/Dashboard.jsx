import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faTasks,
  faEnvelope,
  faCog,
  faUser,
  faBars,
  faTimes,
  faHome,
  faBell,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../svgs/Logo";

const Dashboard = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Mock user data
  const user = {
    name: "Bongomin",
    profile_photo: "/cc/images/img_phone.png",
    role: "student", // or "instructor"
  };

  const navItems = [
    { name: "Dashboard", icon: faHome },
    { name: "Courses", icon: faBook },
    { name: "Assignments", icon: faTasks },
    { name: "Messages", icon: faEnvelope },
    ...(user.role === "instructor" ? [{ name: "Students", icon: faGraduationCap }] : []),
    { name: "Settings", icon: faCog },
  ];

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen w-full "
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      {/* Mobile Header */}
      <header
        className="md:hidden p-4 flex justify-between items-center w-full"
        style={{ backgroundColor: "var(--color-accent)", color: "white" }}
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
          </button>
          <h1 className="text-xl font-bold">ClassConnect</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FontAwesomeIcon icon={faBell} className="text-white" />
            <span
              className="absolute -top-1 -right-1"
              style={{
                backgroundColor: "var(--color-alert)",
                color: "white",
                fontSize: "0.75rem",
                borderRadius: "9999px",
                height: "1rem",
                width: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
          </div>
          <img src={user.profile_photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden w-full transition-all overflow-hidden ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"}`}
        style={{ backgroundColor: "var(--color-accent)", color: "white" }}
      >
        {navItems
          .filter((item) => item.name !== "Settings")
          .map((item) => (
            <a
              href="#"
              key={item.name}
              className={`flex items-center p-4 w-full text-left ${
                activeItem === item.name ? "opacity-90" : "hover:opacity-90"
              }`}
              style={{ backgroundColor: activeItem === item.name ? "rgba(0,0,0,0.1)" : "transparent" }}
              onClick={() => {
                setActiveItem(item.name);
                setMobileMenuOpen(false);
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3" />
              <span>{item.name}</span>
            </a>
          ))}
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:block w-64 rounded-l-2xl"
        style={{ backgroundColor: "var(--color-accent)", color: "white" }}
      >
        <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: "white" }}>
            <Logo />
            ClassCon
          </h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <a
              href="#"
              key={item.name}
              className={`flex items-center p-4 w-full text-left ${
                activeItem === item.name ? "opacity-90" : "hover:opacity-90"
              }`}
              style={{ backgroundColor: activeItem === item.name ? "rgba(0,0,0,0.1)" : "transparent" }}
              onClick={() => setActiveItem(item.name)}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full md:rounded-r-2xl" style={{ backgroundColor: "var(--color-light-bg)" }}>
        <header
          className="hidden md:flex shadow-sm h-16 items-center justify-between px-6 w-full rounded-tr-2xl"
          style={{ backgroundColor: "white" }}
        >
          <h2 className="text-lg font-medium" style={{ color: "var(--color-text-base)" }}>
            Welcome back, {user.name}
          </h2>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <FontAwesomeIcon icon={faBell} style={{ color: "var(--color-text-base)" }} />
              <span
                className="absolute -top-1 -right-1"
                style={{
                  backgroundColor: "var(--color-alert)",
                  color: "white",
                  fontSize: "0.75rem",
                  borderRadius: "9999px",
                  height: "1rem",
                  width: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                3
              </span>
            </div>
            <div className="relative">
              <button onClick={() => setProfileOpen(!isProfileOpen)} className="focus:outline-none profile-btn">
                <img src={user.profile_photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </button>
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 border"
                  style={{ backgroundColor: "white", borderColor: "var(--color-light-bg)" }}
                >
                  <a href="#" className="block px-4 py-2 hover:opacity-90" style={{ color: "var(--color-text-base)" }}>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:opacity-90" style={{ color: "var(--color-text-base)" }}>
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    Settings
                  </a>
                  <a
                    href="/cc/login"
                    className="block px-4 py-2 hover:opacity-90"
                    style={{ color: "var(--color-text-base)" }}
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-base)" }}>
            {activeItem}
          </h1>

          {activeItem === "Dashboard" && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-base)" }}>
                  Dashboard Content
                </h2>
                <p style={{ color: "var(--color-text-base)" }}>
                  This would show overview widgets when connected to real data.
                </p>
              </div>
            </div>
          )}

          {activeItem === "Courses" && (
            <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-base)" }}>
                Courses Content
              </h2>
              <p style={{ color: "var(--color-text-base)" }}>
                This would show course listings when connected to real data.
              </p>
            </div>
          )}

          {activeItem === "Assignments" && (
            <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-base)" }}>
                Assignments Content
              </h2>
              <p style={{ color: "var(--color-text-base)" }}>
                This would show assignment lists when connected to real data.
              </p>
            </div>
          )}

          {activeItem === "Messages" && (
            <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-base)" }}>
                Messages Content
              </h2>
              <p style={{ color: "var(--color-text-base)" }}>
                This would show messaging interface when connected to real data.
              </p>
            </div>
          )}

          {activeItem === "Students" && (
            <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-base)" }}>
                Students Content
              </h2>
              <p style={{ color: "var(--color-text-base)" }}>
                This would show student lists when connected to real data.
              </p>
            </div>
          )}

          {activeItem === "Settings" && (
            <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-base)" }}>
                Settings Content
              </h2>
              <p style={{ color: "var(--color-text-base)" }}>
                This would show settings forms when connected to real data.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
