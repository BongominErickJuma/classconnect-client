import React from "react";

const GradingSubmission = ({ gradingSubmission, setNewScore, newScore, setGradingSubmission, handleGrade }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">
          Grade Submission:{" "}
          <span className="text-sm text-gray-600">{gradingSubmission.submitted_file.split("/").pop()}</span>
        </h2>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter score (%)"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-1 text-sm bg-gray-200 rounded" onClick={() => setGradingSubmission(null)}>
            Cancel
          </button>
          <button
            className="px-4 py-1 text-sm bg-green-600 text-white rounded"
            onClick={() => handleGrade(gradingSubmission.submission_id)}
          >
            Submit Grade
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradingSubmission;
