import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const SubmissionHeader = ({ filterStatus, setFilterStatus, setShowAddForm, showAddForm }) => {
  const { user } = useCurrentUser();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold">Submissions</h1>
      {user.role === "student" && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <select
            className="border rounded-md px-3 py-1 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Submitted</option>
            <option>Graded</option>
            <option>Late</option>
            <option>Missing</option>
          </select>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[var(--color-accent)] text-white text-sm px-4 py-1 rounded"
          >
            {showAddForm ? "Cancel" : "Add Submission"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmissionHeader;
