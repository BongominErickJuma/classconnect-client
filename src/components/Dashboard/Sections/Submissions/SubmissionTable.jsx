import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const SubmissionTable = ({
  filteredSubmissions,
  getFileIcon,
  getStatusBadge,
  formatDate,
  handleDelete,
  setGradingSubmission,
}) => {
  const { user } = useCurrentUser();
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              {user.role !== "student" && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.submission_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">{getFileIcon(submission.submitted_file)}</span>
                    <span className="text-sm text-gray-500 truncate max-w-xs">
                      {submission.submitted_file.split("/").pop()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(submission.submitted_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(submission.status)}`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{submission.score}</td>
                {user.role !== "student" && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <a href={submission.submitted_file} className="text-blue-600 hover:text-blue-900" download>
                      Download
                    </a>
                    <button className="rounded px-1" onClick={() => setGradingSubmission(submission)}>
                      Grade
                    </button>
                    <button className="rounded px-1 btnDelete" onClick={() => handleDelete(submission.submission_id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {filteredSubmissions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-sm text-gray-400">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
