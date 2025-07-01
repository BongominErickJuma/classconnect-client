import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = ({ item, isActive, onClick }) => {
  return (
    <a
      href="#"
      className={`flex items-center p-4 w-full text-left ${isActive ? "opacity-90" : "hover:opacity-90"}`}
      style={{ backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "transparent" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={item.icon} className="mr-3" />
      <span>{item.name}</span>
    </a>
  );
};

export default NavItem;
