import React from "react";
import StudentsWidgets from "./widgets/StudentsWidgets";
import InstructorWidgets from "./widgets/InstructorWidgets";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const Home = () => {
  const { user } = useCurrentUser();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-base)" }}>
        Dashboard
      </h1>
      <>{user.role === "student" ? <StudentsWidgets /> : <InstructorWidgets />}</>;
    </div>
  );
};

export default Home;
