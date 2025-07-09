import React, { useEffect, useState } from "react";
import Select from "react-select"; // <-- import react-select
import { getImageUrl, userService } from "../../../../Services/api";

const EditCourseModel = ({ course, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: course.title || "",
    description: course.description || "",
    cover_image: course.cover_image || "",
    instructor_id: course.instructor_id || "",
  });

  const [instructors, setInstructors] = useState([]);
  const [imagePreview, setImagePreview] = useState(course.cover_image ? getImageUrl(course.cover_image) : null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover_image" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        cover_image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInstructorSelect = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      instructor_id: selectedOption ? selectedOption.value : prev.instructor_id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataUpload = new FormData();
    formDataUpload.append("title", formData.title);
    formDataUpload.append("description", formData.description);
    formDataUpload.append("instructor_id", formData.instructor_id);

    if (formData.cover_image instanceof File) {
      formDataUpload.append("cover_image", formData.cover_image);
    }

    onSave(formDataUpload);
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await userService.getInstructors();
      if (response) {
        setInstructors(response.data);
      }
    };

    fetchInstructors();
  }, []);

  // prepare options for react-select
  const instructorOptions = instructors.map((inst) => ({
    value: inst.user_id,
    label: inst.email,
  }));

  const selectedInstructor = instructorOptions.find((opt) => String(opt.value) === String(formData.instructor_id));

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor (search by email)</label>
              <Select
                options={instructorOptions}
                value={selectedInstructor}
                onChange={handleInstructorSelect}
                isClearable
                placeholder="Select instructor by email..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              <input
                type="file"
                name="cover_image"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {imagePreview && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
                <div className="w-32 h-32 border rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Course cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/img/courses/default.jpeg";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModel;
