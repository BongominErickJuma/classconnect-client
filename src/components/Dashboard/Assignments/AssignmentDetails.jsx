import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assignmentService, submissionService } from "../../../Services/api";
import Submissions from "../Sections/Submissions/Submissions";
import useCurrentUser from "../../Hooks/useCurrentUser";

const AssignmentDetails = () => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const { id } = useParams();
  const { user } = useCurrentUser();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const assignmentData = await assignmentService.getAssignment(id);

        const assignment = assignmentData.data;
        if (assignment) {
          setAssignment(assignment);

          let assignmentSubmissions;

          if (user.role !== "student") {
            assignmentSubmissions = await submissionService.getAllSubmissions(`assignment_id=${id}`);
          } else {
            assignmentSubmissions = await submissionService.getMySubmissions(id, user.user_id);
          }

          setSubmissions(assignmentSubmissions.data);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchAssignment();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading courses: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 rounded-xl shadow-md mt-8">
      <Link
        to={`/dashboard/courses/${assignment.course_id}`}
        className="px-6 py-2 my-6 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
      >
        ← Back to Course
      </Link>

      <div className="mt-20">
        <h2 className="text-2xl mb-2 text-[var(--color-accent)] font-[var(--font-primary)]">{assignment.title}</h2>
        <p className="text-[var(--color-text-base)] font-[var(--font-secondary)] mb-6">{assignment.description}</p>
      </div>

      <Submissions submissions={submissions} />
    </div>
  );
};

export default AssignmentDetails;
