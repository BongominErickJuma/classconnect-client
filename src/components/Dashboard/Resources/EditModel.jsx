import React from "react";

const EditModel = ({ handleEditSubmit, handleInputChange, formData, setShowEditModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Resource</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Link Field (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Optional Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com/resource"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* File Upload (Optional) */}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="pdf">PDF</option>
              <option value="document">Document</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Optional File Upload</label>
            <input
              type="file"
              accept={formData.type === "video" ? "video/*" : ".pdf,.doc,.docx,.ppt,.pptx"}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const fileURL = URL.createObjectURL(file);
                  handleInputChange({ target: { name: "file_url", value: fileURL } });
                  handleInputChange({ target: { name: "file", value: file } });
                }
              }}
              className="w-full p-2 border rounded"
            />
            {formData.file_url && <p className="text-sm text-gray-500 mt-1 truncate">Selected: {formData.file_url}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload Date</label>
            <input
              type="date"
              name="uploaded_at"
              value={formData.uploaded_at}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
