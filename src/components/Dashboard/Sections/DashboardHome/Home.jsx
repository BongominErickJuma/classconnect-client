import React from "react";
import StudentsWidgets from "./widgets/StudentsWidgets";
import InstructorWidgets from "./widgets/InstructorWidgets";

const Home = ({ user }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-base)" }}>
        Dashboard
      </h1>
      <>{user.role === "student" ? <StudentsWidgets /> : <InstructorWidgets />}</>;
    </div>
  );
};

export default Home;
