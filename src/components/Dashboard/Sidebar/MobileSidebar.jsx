import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavItem from "./NavItem";

const MobileSidebar = ({ isOpen, navItems, activeItem, setActiveItem, closeMenu }) => {
  return (
    <div
      className={`md:hidden w-full transition-all overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}
      style={{ backgroundColor: "var(--color-accent)", color: "white" }}
    >
      {navItems.map((item) => (
        <NavItem
          key={item.name}
          item={item}
          isActive={activeItem === item.name}
          onClick={() => {
            setActiveItem(item.name);
            closeMenu();
          }}
        />
      ))}
    </div>
  );
};

export default MobileSidebar;
