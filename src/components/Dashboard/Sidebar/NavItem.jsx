import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const NavItem = ({ item, isActive, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(); // update active item visually
    const route = item.name.toLowerCase().replace(/\s+/g, "_");

    if (route === "dashboard") navigate("/dashboard");
    else navigate(`/dashboard/${route}`);
  };

  return (
    <button
      className={`
        group relative flex items-center gap-3 w-full px-3 py-3 rounded-lg text-left
        transition-all duration-200 font-medium
        ${isActive 
          ? 'bg-[var(--color-primary)] text-white shadow-md' 
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
        }
      `}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className={`
        flex items-center justify-center w-5 h-5 transition-all duration-200
        ${isActive ? 'text-white' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]'}
      `}>
        <FontAwesomeIcon icon={item.icon} className="text-sm" />
      </div>

      {/* Label */}
      <span className="flex-1 text-sm">
        {item.name}
      </span>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
      )}

      {/* Hover Effect */}
      <div className={`
        absolute inset-0 rounded-lg transition-all duration-200 opacity-0
        ${!isActive ? 'group-hover:opacity-100 group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent' : ''}
      `} />
    </button>
  );
};

export default NavItem;
