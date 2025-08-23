import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assignmentService, submissionService } from "../../../Services/api";
import Submissions from "../Sections/Submissions/Submissions";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { AssignmentDetailsSkeleton, Card, Button, Badge } from "../../ui";

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
    return <AssignmentDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="text-center border-red-200 bg-red-50" padding="lg">
          <div className="py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Assignment</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getUrgency = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "overdue";
    if (diffDays <= 3) return "urgent";
    if (diffDays <= 7) return "soon";
    return "normal";
  };

  const urgency = getUrgency(assignment.due_date);
  const isOverdue = urgency === "overdue";
  const isUrgent = urgency === "urgent";

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="animate-slide-in-down">
        <Button
          as={Link}
          to={`/dashboard/courses/${assignment.course_id}`}
          variant="ghost"
          size="md"
          className="group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Course
        </Button>
      </div>

      {/* Assignment Hero Section */}
      <div className="animate-slide-in-up">
        <Card 
          className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative" 
          padding="none"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                {/* Assignment Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                      {assignment.title}
                    </h1>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                      >
                        {isOverdue ? 'Overdue' : isUrgent ? 'Due Soon' : 'Active'}
                      </Badge>
                      <span className="text-white/80 text-sm">
                        Assignment #{assignment.assignment_id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-3xl">
                  {assignment.description}
                </p>
              </div>

              {/* Score Indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {assignment.max_score}
                      </div>
                      <div className="text-xs text-white/70">points</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Assignment Details Section */}
      <div className="animate-slide-in-up" style={{ animationDelay: "200ms" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Due Date Card */}
          <Card className="group hover:shadow-lg transition-all duration-200" padding="lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text-primary)]">Due Date</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {formatDate(assignment.due_date)}
                </p>
                <p className="text-xs font-medium text-[var(--color-primary)]">
                  {isOverdue ? 'Assignment is overdue' :
                   isUrgent ? 'Due within 3 days' :
                   'On schedule'}
                </p>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <Card className="group hover:shadow-lg transition-all duration-200" padding="lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text-primary)]">Status</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">Assignment Active</p>
                <p className="text-xs text-green-600 font-medium">Ready for submissions</p>
              </div>
            </div>
          </Card>

          {/* Submissions Count */}
          <Card className="group hover:shadow-lg transition-all duration-200" padding="lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text-primary)]">Submissions</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {submissions?.length || 0} total submissions
                </p>
                <p className="text-xs text-[var(--color-accent)] font-medium">
                  {user.role === "student" ? "Your submissions" : "All submissions"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Submissions Section */}
        <Submissions submissions={submissions} />
      </div>
    </div>
  );
};

export default AssignmentDetails;
