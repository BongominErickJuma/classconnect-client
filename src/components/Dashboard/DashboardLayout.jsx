import React, { useState } from "react";
import { faBook, faTasks, faEnvelope, faCog, faHome, faGraduationCap, faGear } from "@fortawesome/free-solid-svg-icons";
import MobileHeader from "./Header/MobileHeader";
import DesktopHeader from "./Header/DesktopHeader";
import MobileSidebar from "./Sidebar/MobileSidebar";
import DesktopSidebar from "./Sidebar/DesktopSidebar";
import ContentArea from "./MainContent/ContentArea";

const DashboardLayout = ({ user }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: faHome },
    { name: "Courses", icon: faBook },
    { name: "Assignments", icon: faTasks },
    { name: "Submissions", icon: faEnvelope },
    ...(user.role === "instructor" || user.role === "admin" ? [{ name: "Students", icon: faGraduationCap }] : []),
    { name: "Resources", icon: faCog },
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
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} user={user} />
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
        <DesktopHeader user={user} isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />
        <div className="flex-1 p-4 overflow-y-auto custom-scroll">
          <ContentArea activeItem={activeItem} user={user} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
