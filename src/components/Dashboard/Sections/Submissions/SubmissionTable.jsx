import React from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Card, Button, Badge } from "../../../ui";

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
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">File</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Submitted</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Score</th>
              {user.role !== "student" && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-[var(--color-background)] divide-y divide-[var(--color-border)]">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.submission_id} className="hover:bg-[var(--color-surface)] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getFileIcon(submission.submitted_file)}</span>
                    <span className="text-sm text-[var(--color-text-secondary)] truncate max-w-xs font-medium">
                      {submission.submitted_file.split("/").pop()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">
                  {formatDate(submission.submitted_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant={submission.status === "Graded" ? "success" : submission.status === "Submitted" ? "primary" : submission.status === "Late" ? "warning" : "danger"}
                  >
                    {submission.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[var(--color-text-primary)]">
                  {submission.score ? `${submission.score}/100` : "-"}
                </td>
                {user.role !== "student" && (
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="small"
                        variant="ghost"
                        as="a"
                        href={submission.submitted_file}
                        download
                      >
                        Download
                      </Button>
                      <Button
                        size="small"
                        variant="primary"
                        onClick={() => setGradingSubmission(submission)}
                      >
                        Grade
                      </Button>
                      <Button
                        size="small"
                        variant="danger"
                        onClick={() => handleDelete(submission.submission_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filteredSubmissions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-[var(--color-text-muted)]">No submissions found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SubmissionTable;
