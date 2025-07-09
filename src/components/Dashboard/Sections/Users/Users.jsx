import React, { useState, useEffect, useMemo } from "react";
import { userService } from "../../../../Services/api";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import Head from "./Head";
import UpdateUserModel from "./UpdateUserModel";
import DeleteUserModal from "./DeleteUserModel";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useCurrentUser();

  const limit = 9;

  // Fetch students once on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let response;
        if (user.role === "student") {
          response = await userService.getInstructors();
        } else {
          response = await userService.getAllUsers();
          response = response.data;
        }

        setUsers(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtered students (memoized for performance)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const lowerSearch = searchTerm.toLowerCase();
      return user.name.toLowerCase().includes(lowerSearch) || user.email.toLowerCase().includes(lowerSearch);
    });
  }, [users, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / limit);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * limit, currentPage * limit);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenUpdate = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const handleOpenDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const handleUpdateConfirm = async (userId, role) => {
    try {
      await userService.updateUserRole(userId, { role });
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      handleCloseModals();
    }
  };

  const handleDeleteConfirm = async (userId) => {
    try {
      await userService.deleteUser(userId);
      setUsers((prev) => prev.filter((s) => s.user_id !== userId));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      handleCloseModals();
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Students</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Students</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading students: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col justify-between">
      {/* Header and Search */}
      <Head
        currentPage={currentPage}
        limit={limit}
        filteredUsers={filteredUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Students Grid */}
      <Desktop paginatedUsers={paginatedUsers} onUpdateClick={handleOpenUpdate} onDeleteClick={handleOpenDelete} />

      {/* Mobile View */}
      <Mobile paginatedUsers={paginatedUsers} />

      {/* No Students */}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Users found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${page === currentPage && "btn-active"}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* models */}

      <UpdateUserModel
        visible={showUpdateModal}
        onClose={handleCloseModals}
        onConfirm={handleUpdateConfirm}
        student={selectedStudent}
      />

      <DeleteUserModal
        visible={showDeleteModal}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        student={selectedStudent}
      />
    </div>
  );
};

export default Users;
