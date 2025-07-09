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
      className={`flex items-center p-4 w-full text-left ${isActive ? "opacity-90" : "hover:opacity-90"}`}
      style={{ backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "transparent" }}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={item.icon} className="mr-3" />
      <span>{item.name}</span>
    </button>
  );
};

export default NavItem;
