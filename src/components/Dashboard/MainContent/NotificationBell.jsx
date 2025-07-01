import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationBell = () => {
  return (
    <div className="relative">
      <FontAwesomeIcon icon={faBell} />
      <span
        className="absolute -top-1 -right-1"
        style={{
          backgroundColor: "var(--color-alert)",
          color: "white",
          fontSize: "0.75rem",
          borderRadius: "9999px",
          height: "1rem",
          width: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        3
      </span>
    </div>
  );
};

export default NotificationBell;
