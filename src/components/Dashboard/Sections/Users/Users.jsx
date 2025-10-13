import React, { useState, useEffect, useMemo } from "react";
import { userService } from "../../../../Services/api";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import Head from "./Head";
import UpdateUserModel from "./UpdateUserModel";
import DeleteUserModal from "./DeleteUserModel";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { UsersSkeleton, Card, Button } from "../../../ui";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const { user } = useCurrentUser();

  const limit = 6;

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
    setIsUpdatingUser(true);
    try {
      await userService.updateUserRole(userId, { role });
      const response = await userService.getAllUsers();
      setUsers(response.data);
      handleCloseModals();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsUpdatingUser(false);
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
    return <UsersSkeleton />;
  }

  // Error UI
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Users</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="animate-slide-in-down">
        <Head
          currentPage={currentPage}
          limit={limit}
          filteredUsers={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Users Grid */}
      <div className="animate-slide-in-up">
        <Desktop paginatedUsers={paginatedUsers} onUpdateClick={handleOpenUpdate} onDeleteClick={handleOpenDelete} />
      </div>

      {/* Mobile View */}
      <div className="animate-slide-in-up" style={{ animationDelay: "100ms" }}>
        <Mobile paginatedUsers={paginatedUsers} />
      </div>

      {/* No Users Found */}
      {filteredUsers.length === 0 && !loading && (
        <div className="animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <Card className="text-center" padding="lg">
            <div className="py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                No {user.role === "student" ? "Instructors" : "Users"} Found
              </h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                {searchTerm 
                  ? "Try adjusting your search criteria to find more users." 
                  : "No users are currently available in the system."}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="animate-slide-in-up" style={{ animationDelay: "300ms" }}>
          <Card className="bg-[var(--color-surface)]/50" padding="md lg:lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-[var(--color-text-secondary)] text-center sm:text-left">
                Page {currentPage} of {totalPages} • {filteredUsers.length} total
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                    let page;
                    if (totalPages <= 3) {
                      page = i + 1;
                    } else if (currentPage === 1) {
                      page = i + 1;
                    } else if (currentPage === totalPages) {
                      page = totalPages - 2 + i;
                    } else {
                      page = currentPage - 1 + i;
                    }

                    return (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        variant={page === currentPage ? "primary" : "ghost"}
                        size="sm"
                        className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <>
                      <span className="text-[var(--color-text-muted)] px-1">...</span>
                      <Button
                        onClick={() => handlePageChange(totalPages)}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* models */}

      <UpdateUserModel
        visible={showUpdateModal}
        onClose={handleCloseModals}
        onConfirm={handleUpdateConfirm}
        student={selectedStudent}
        isLoading={isUpdatingUser}
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
