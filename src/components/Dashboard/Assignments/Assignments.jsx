import React, { useState } from "react";
import EditModel from "./EditModel";
import AddModel from "./AddModel";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { assignmentService } from "../../../Services/api";
import { Link, useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";

const Assignments = ({ assignments: initialAssignments, isCourseInstructor, isEnrolled }) => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const { id } = useParams();
  const { user } = useCurrentUser();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    max_score: 100,
  });

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

    const res = await assignmentService.createAssignments(id, formData);
    setAssignments([...assignments, res.data]);
    setShowAddModal(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    formData.due_date = new Date(formData.due_date).toISOString();

    await assignmentService.UpdateAssignments(currentAssignment.assignment_id, formData);

    const updatedAssignments = assignments.map((assignment) =>
      assignment.assignment_id === currentAssignment.assignment_id ? { ...assignment, ...formData } : assignment
    );

    setAssignments(updatedAssignments);
    setShowEditModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await assignmentService.deleteAssignment(assignmentToDelete.assignment_id);
      setAssignments(assignments.filter((r) => r.assignment_id !== assignmentToDelete.assignment_id));
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="p-6 shadow my-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-base)" }}>
          Assignments
        </h1>
        {isCourseInstructor && (
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Assignment
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.assignment_id} className="p-6 rounded-lg border ">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-base)" }}>
                {assignment.title}
              </h2>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
            </div>

            <p className="text-sm mb-4" style={{ color: "var(--color-text-base)" }}>
              {assignment.description}
            </p>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <p className="text-sm font-medium">
                Due: <span className="text-gray-600">{assignment.due_date.split("T")[0]}</span>
              </p>
              <div className="flex gap-2">
                {((user.role === "student" && isEnrolled) || isCourseInstructor) && (
                  <Link
                    to={`/dashboard/assignments/${assignment.assignment_id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm navLink"
                  >
                    View
                  </Link>
                )}

                {isCourseInstructor && (
                  <>
                    <button
                      onClick={() => handleEditClick(assignment)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(assignment)} className="px-3 py-1 rounded btnDelete">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Assignment Modal */}
      {showAddModal && (
        <AddModel
          handleAddSubmit={handleAddSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          setShowAddModal={setShowAddModal}
        />
      )}

      {/* Edit Assignment Modal */}
      {showEditModal && (
        <EditModel
          handleEditSubmit={handleEditSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          setShowEditModal={setShowEditModal}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setAssignmentToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Assignments;
