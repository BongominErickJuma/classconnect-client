import React, { useEffect, useState } from "react";
import Select from "react-select"; // <-- import react-select
import { getImageUrl, userService } from "../../../../Services/api";
import { Button, Card, Input } from "../../../ui";

const EditCourseModel = ({ course, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("title", formData.title);
      formDataUpload.append("description", formData.description);
      formDataUpload.append("instructor_id", formData.instructor_id);

      if (formData.cover_image instanceof File) {
        formDataUpload.append("cover_image", formData.cover_image);
      }

      await onSave(formDataUpload);
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setIsLoading(false);
    }
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
  const instructorOptions = (instructors || []).map((inst) => ({
    value: inst.user_id,
    label: inst.email,
  }));

  const selectedInstructor = instructorOptions.find((opt) => String(opt.value) === String(formData.instructor_id));

  // Custom styles for react-select to match design system
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: `1px solid var(--color-border)`,
      borderRadius: '0.5rem',
      padding: '0.25rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none',
      borderColor: state.isFocused ? 'var(--color-primary)' : 'var(--color-border)',
      '&:hover': {
        borderColor: 'var(--color-primary)',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--color-surface-hover)' : 'transparent',
      color: 'var(--color-text-primary)',
      '&:hover': {
        backgroundColor: 'var(--color-surface-hover)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-background)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-lg)',
    }),
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-in-up shadow-2xl border-none" 
        padding="none"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Edit Course</h2>
                <p className="text-white/80 text-sm">Update course information and settings</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Course Information
                </h3>
              </div>

              <Input
                type="text"
                name="title"
                label="Course Title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                  Course Description
                  <span className="text-[var(--color-error)] ml-1">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-200 resize-none"
                  rows="4"
                  placeholder="Describe what students will learn in this course..."
                  required
                />
              </div>
            </div>

            {/* Instructor Assignment Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-[var(--color-accent)]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Instructor Assignment
                </h3>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                  Course Instructor
                </label>
                <Select
                  options={instructorOptions}
                  value={selectedInstructor}
                  onChange={handleInstructorSelect}
                  isClearable
                  placeholder="Search instructor by email..."
                  styles={selectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                <p className="text-xs text-[var(--color-text-muted)]">
                  Start typing to search for instructors by their email address
                </p>
              </div>
            </div>

            {/* Course Image Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-[var(--color-success)]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Course Image
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    name="cover_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-dashed border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary-dark)] file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Upload a high-quality image (JPG, PNG). Recommended: 1200x800px
                  </p>
                </div>

                {imagePreview && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                      Image Preview
                    </label>
                    <div className="relative group">
                      <div className="w-full max-w-xs aspect-[3/2] border border-[var(--color-border)] rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
                        <img
                          src={imagePreview}
                          alt="Course cover preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE1MEMxNDAuMzM1IDEyNSAxMzMgMTMyLjMzNSAxMzMgMTQyVjE1OEMxMzMgMTY3LjY2NSAxNDAuMzM1IDE3NSAxNTAgMTc1SDE3NUMxODQuNjY1IDE3NSAxOTIgMTY3LjY2NSAxOTIgMTU4VjE0MkMxOTIgMTMyLjMzNSAxODQuNjY1IDEyNSAxNzUgMTI1WiIgZmlsbD0iIzk0QTNCOCIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[var(--color-border)]">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditCourseModel;
