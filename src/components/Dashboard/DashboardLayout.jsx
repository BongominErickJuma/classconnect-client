import React, { useState } from "react";
import { faBook, faHome, faGraduationCap, faGear, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import MobileHeader from "./Header/MobileHeader";
import DesktopHeader from "./Header/DesktopHeader";
import MobileSidebar from "./Sidebar/MobileSidebar";
import DesktopSidebar from "./Sidebar/DesktopSidebar";
import useCurrentUser from "../Hooks/useCurrentUser";

const DashboardLayout = ({ children }) => {
  const { user } = useCurrentUser();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: faHome },
    { name: "Featured", icon: faStar },
    { name: "My Courses", icon: faBook },
    ...(user.role === "instructor" || user.role === "admin" ? [{ name: "Users", icon: faUsers }] : []),
    ...(user.role === "student" ? [{ name: "Instructors", icon: faGraduationCap }] : []),
    { name: "Settings", icon: faGear },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfile = () => setProfileOpen(!isProfileOpen);

  return (
    <div
      className="flex flex-col md:flex-row lg:h-screen overflow-hidden w-full"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      {/* Mobile Components */}
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        closeMenu={() => setMobileMenuOpen(false)}
      />

      {/* Desktop Sidebar */}

      <DesktopSidebar navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col " style={{ backgroundColor: "var(--color-light-bg)" }}>
        <DesktopHeader isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />
        <div className="flex-1 p-4 overflow-y-auto custom-scroll">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
