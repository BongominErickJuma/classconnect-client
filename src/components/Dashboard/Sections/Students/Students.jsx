import React from "react";

const Students = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-base)" }}>
        Students
      </h1>
      <div className="p-6 rounded-lg shadow" style={{ backgroundColor: "white" }}>
        <p style={{ color: "var(--color-text-base)" }}>This would show Students List when connected to real data.</p>
      </div>
    </div>
  );
};

export default Students;
