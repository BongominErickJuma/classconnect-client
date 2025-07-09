import React from "react";

const DeleteUserModal = ({ visible, onClose, onConfirm, student }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Student</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to <strong>permanently delete</strong> <strong>{student.name}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(student.user_id)}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
