import React from "react";

const AddSubmission = ({ newSubmission, setNewSubmission, handleAddSubmission, isPending }) => {
  return (
    <div className="mb-4 p-4 border rounded bg-[var(--color-light-bg)]">
      <input
        type="file"
        placeholder="Submission file path"
        className="border px-2 py-1 mr-2 text-sm rounded w-1/3"
        value={newSubmission.submitted_file}
        onChange={(e) => setNewSubmission({ ...newSubmission, submitted_file: e.target.value })}
      />
      <select
        className="border px-2 py-1 mr-2 text-sm rounded"
        value={newSubmission.status}
        onChange={(e) => setNewSubmission({ ...newSubmission, status: e.target.value })}
      >
        <option>Submitted</option>
      </select>
      <button onClick={handleAddSubmission} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
        {isPending ? "Submitting" : "Submit"}
      </button>
    </div>
  );
};

export default AddSubmission;
