import React from "react";

const Logo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-8 h-8">
      <circle cx="64" cy="64" r="45" fill="#4e8ea8" />
      <text
        x="64"
        y="64"
        fontSize="48"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        dominantBaseline="middle"
        dy="4"
      >
        Cc
      </text>
    </svg>
  );
};

export default Logo;
