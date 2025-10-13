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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  // Handle screen resize
  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // Close mobile menu if screen becomes large
      if (window.innerWidth >= 1000) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = screenWidth >= 1000;

  return (
    <div className="flex min-h-screen bg-[var(--color-primary-bg)] w-full relative">
      {/* Mobile/Tablet Header (shows on screens below 1000px) */}
      {!isDesktop && (
        <MobileHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      )}

      {/* Mobile/Tablet Sidebar Dropdown (shows on screens below 1000px) */}
      {!isDesktop && (
        <MobileSidebar
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          closeMenu={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Fixed (only shows on 1000px and above) */}
      {isDesktop && (
        <DesktopSidebar navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} />
      )}

      {/* Desktop Header (only shows on 1000px and above) */}
      {isDesktop && (
        <DesktopHeader isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />
      )}

      {/* Main Content Area - Offset for fixed sidebar and header */}
      <main className={`flex-1 ${isDesktop ? 'ml-72 pt-24' : 'pt-20'} min-h-screen`}>
        {/* Scrollable Content Area */}
        <div className="h-full overflow-y-auto custom-scroll bg-[var(--color-primary-bg)]">
          <div className={`${isDesktop ? 'p-6' : 'p-4'}`}>
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
