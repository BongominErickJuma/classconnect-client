import React, { useState } from "react";
import EditModel from "./EditModel";
import AddModel from "./AddModel";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { assignmentService } from "../../../Services/api";
import { Link, useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { Card, Button, Badge } from "../../ui";

const Assignments = ({ assignments: initialAssignments, isCourseInstructor, isEnrolled }) => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [isEditingAssignment, setIsEditingAssignment] = useState(false);
  const [isDeletingAssignment, setIsDeletingAssignment] = useState(false);
  const { id } = useParams();
  const { user } = useCurrentUser();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    max_score: 100,
  });

  // Function to get status variant for Badge component
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  // Function to determine assignment urgency
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteClick = (assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteModal(true);
  };

  const handleAddClick = () => {
    setFormData({
      title: "",
      description: "",
      due_date: "",
      max_score: 100,
    });
    setShowAddModal(true);
  };

  const handleEditClick = (assignment) => {
    setCurrentAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      due_date: assignment.due_date.split("T")[0],
      max_score: 100,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsAddingAssignment(true);

    try {
      const res = await assignmentService.createAssignments(id, formData);
      setAssignments([...assignments, res.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
    } finally {
      setIsAddingAssignment(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditingAssignment(true);

    try {
      formData.due_date = new Date(formData.due_date).toISOString();

      await assignmentService.UpdateAssignments(currentAssignment.assignment_id, formData);

      const updatedAssignments = assignments.map((assignment) =>
        assignment.assignment_id === currentAssignment.assignment_id ? { ...assignment, ...formData } : assignment
      );

      setAssignments(updatedAssignments);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating assignment:", error);
    } finally {
      setIsEditingAssignment(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeletingAssignment(true);
    try {
      await assignmentService.deleteAssignment(assignmentToDelete.assignment_id);
      setAssignments(assignments.filter((r) => r.assignment_id !== assignmentToDelete.assignment_id));
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    } catch (error) {
      console.error("Error deleting assignment:", error);
    } finally {
      setIsDeletingAssignment(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Course Assignments
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              {assignments.length} assignment{assignments.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {isCourseInstructor && (
          <Button
            onClick={handleAddClick}
            variant="primary"
            size="md"
            className="shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Assignment
          </Button>
        )}
      </div>

      {/* Assignments Grid */}
      {assignments.length === 0 ? (
        <Card className="text-center" padding="lg">
          <div className="py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              No Assignments Available
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              {isCourseInstructor 
                ? "Create your first assignment to help students practice and learn." 
                : "No assignments have been posted yet. Check back later for updates!"}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignments.map((assignment) => {
            const urgency = getUrgency(assignment.due_date);
            const isOverdue = urgency === "overdue";
            const isUrgent = urgency === "urgent";
            
            return (
              <Card 
                key={assignment.assignment_id}
                className={`group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-full ${
                  isOverdue ? 'ring-2 ring-red-200 bg-red-50' : 
                  isUrgent ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''
                }`}
                padding="lg"
              >
                {/* Assignment Header - Fixed height */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors leading-tight min-h-[2.5rem]">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(assignment.status)} size="sm">
                        {assignment.status || 'pending'}
                      </Badge>
                      {isOverdue && (
                        <Badge variant="danger" size="sm">
                          Overdue
                        </Badge>
                      )}
                      {isUrgent && !isOverdue && (
                        <Badge variant="warning" size="sm">
                          Due Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Score indicator */}
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-lg font-bold text-[var(--color-primary)]">
                      {assignment.max_score}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">points</div>
                  </div>
                </div>

                {/* Description - Fixed height with consistent spacing */}
                <div className="flex-1 mb-4">
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                    {assignment.description}
                  </p>
                </div>

                {/* Due Date - Consistent positioning */}
                <div className={`flex items-center gap-2 mb-6 p-3 rounded-lg ${
                  isOverdue ? 'bg-red-100 text-red-800' :
                  isUrgent ? 'bg-yellow-100 text-yellow-800' :
                  'bg-[var(--color-surface)]'
                }`}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {isOverdue ? 'Was due' : 'Due'} {formatDate(assignment.due_date)}
                    </div>
                    <div className="text-xs opacity-75">
                      {isOverdue ? 'Overdue' :
                       urgency === "urgent" ? "In next 3 days" : 
                       urgency === "soon" ? "This week" : 
                       "Upcoming"}
                    </div>
                  </div>
                </div>

                {/* Assignment Actions - Always at bottom */}
                <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)] mt-auto">
                  {/* Student/Instructor View */}
                  {((user.role === "student" && isEnrolled) || isCourseInstructor) && (
                    <Button
                      as={Link}
                      to={`/dashboard/assignments/${assignment.assignment_id}`}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {isCourseInstructor ? 'View & Grade' : 'View Assignment'}
                    </Button>
                  )}

                  {/* Instructor Actions */}
                  {isCourseInstructor && (
                    <>
                      <Button
                        onClick={() => handleEditClick(assignment)}
                        variant="secondary"
                        size="sm"
                        className="p-2 min-w-0"
                        title="Edit Assignment"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(assignment)}
                        variant="danger"
                        size="sm"
                        className="p-2 min-w-0"
                        title="Delete Assignment"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </>
                  )}

                  {/* Not enrolled message */}
                  {user.role === "student" && !isEnrolled && (
                    <div className="flex-1 text-center">
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Enroll to view assignments
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Assignment Modal */}
      {showAddModal && (
        <AddModel
          handleAddSubmit={handleAddSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          setShowAddModal={setShowAddModal}
          isLoading={isAddingAssignment}
        />
      )}

      {/* Edit Assignment Modal */}
      {showEditModal && (
        <EditModel
          handleEditSubmit={handleEditSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          setShowEditModal={setShowEditModal}
          isLoading={isEditingAssignment}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setAssignmentToDelete(null);
          }}
          isLoading={isDeletingAssignment}
          title="Delete Assignment"
          message="Are you sure you want to delete this assignment? This action cannot be undone and all submissions will be permanently removed."
        />
      )}
    </div>
  );
};

export default Assignments;
