import React, { useState, useEffect } from "react";
import { Button, Card } from "../../../ui";

const UpdateUserModel = ({ visible, onClose, onConfirm, student, isLoading = false }) => {
  const [selectedRole, setSelectedRole] = useState(student?.role || "student");

  useEffect(() => {
    if (student) {
      setSelectedRole(student.role);
    }
  }, [student]);

  if (!visible || !student) return null;

  const handleConfirm = () => {
    onConfirm(student.user_id, selectedRole); // Pass selected role to parent
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card 
        className="w-full max-w-md animate-slide-in-up shadow-2xl border-none" 
        padding="none"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white p-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Update User Role</h2>
              <p className="text-white/80 text-sm">Change user permissions and access</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">{student.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Current role: {student.role}</p>
              </div>
            </div>
            
            <p className="text-[var(--color-text-secondary)] mb-4">
              Select a new role for this user:
            </p>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                New Role
                <span className="text-[var(--color-error)] ml-1">*</span>
              </label>
              <select
                className="w-full px-4 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg transition-all duration-200 hover:border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                disabled={isLoading}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Role Description */}
          <div className="bg-[var(--color-surface)] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-[var(--color-text-primary)] mb-1">
                  {selectedRole === 'admin' && 'Administrator'}
                  {selectedRole === 'instructor' && 'Instructor'}
                  {selectedRole === 'student' && 'Student'}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedRole === 'admin' && 'Full access to all platform features and user management'}
                  {selectedRole === 'instructor' && 'Can create courses, assignments, and manage students'}
                  {selectedRole === 'student' && 'Can enroll in courses and submit assignments'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="secondary"
              size="lg"
              className="flex-1"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            
            <Button
              onClick={handleConfirm}
              variant="primary"
              size="lg"
              className="flex-1 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Role
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateUserModel;
