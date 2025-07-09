import React, { useState, useEffect } from "react";

const UpdateUserModel = ({ visible, onClose, onConfirm, student }) => {
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
    <div className="fixed inset-0 z-50 bg-white bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Update Role</h2>

        <p className="text-gray-700 mb-4">
          Change role for <strong>{student.name}</strong>:
        </p>

        <select
          className="w-full border rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring focus:border-blue-300"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModel;
