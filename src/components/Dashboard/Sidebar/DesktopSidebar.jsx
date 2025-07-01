import React from "react";
import Logo from "../../../svgs/Logo";
import NavItem from "./NavItem";

const DesktopSidebar = ({ navItems, activeItem, setActiveItem }) => {
  return (
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
          <NavItem
            key={item.name}
            item={item}
            isActive={activeItem === item.name}
            onClick={() => setActiveItem(item.name)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
