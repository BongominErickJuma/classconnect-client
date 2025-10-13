import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MobileSidebar = ({ isOpen, navItems, activeItem, setActiveItem, closeMenu }) => {
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu-dropdown') && !event.target.closest('.hamburger-button')) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  if (!isOpen) return null;

  return (
    <>
      {/* Dark overlay behind menu */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={closeMenu}
      />

      {/* Slide-out sidebar menu from left */}
      <div className="mobile-menu-sidebar fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-[var(--color-background)] z-50 animate-slideInFromLeft shadow-xl">
        {/* Sidebar Header */}
        <div className="bg-[var(--color-primary)] text-white p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Menu items */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                closeMenu();
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                activeItem === item.name
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="w-5 h-5 mr-3"
              />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;