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
    <div className="flex min-h-screen bg-[var(--color-primary-bg)] w-full">
      {/* Mobile Components */}
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        closeMenu={() => setMobileMenuOpen(false)}
      />

      {/* Desktop Sidebar - Fixed */}
      <DesktopSidebar navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Fixed Header */}
      <DesktopHeader isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />

      {/* Main Content Area - Offset for fixed sidebar and header */}
      <main className="flex-1 ml-0 md:ml-72 pt-24 min-h-screen">
        {/* Scrollable Content Area */}
        <div className="h-full overflow-y-auto custom-scroll bg-[var(--color-primary-bg)]">
          <div className="p-6">
            <div className="max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
