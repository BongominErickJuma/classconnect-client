import React, { useState } from "react";
import { Card, Input, Button } from "../../../ui";
import { faTimes, faBook, faTag, faChartLine, faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddCourseModel = ({ onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Programming",
    level: "Beginner",
    duration: "4 weeks",
    rating: 4.5,
    cover_image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Generate a random ID for the new course (in a real app, this would come from your backend)
      const newCourse = {
        ...formData,
        id: Math.floor(Math.random() * 10000),
        instructor_id: 1, // Default instructor ID
        created_at: new Date().toISOString(),
      };
      await onSave(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsLoading(false);
    }
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
                <FontAwesomeIcon icon={faBook} className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Create New Course</h2>
                <p className="text-white/80 text-sm">Add a new course to your platform</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 border-white/30"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Course Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                required
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                  Category
                  <span className="text-[var(--color-error)] ml-1">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg transition-all duration-200 hover:border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  required
                >
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                  Level
                  <span className="text-[var(--color-error)] ml-1">*</span>
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg transition-all duration-200 hover:border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <Input
                label="Duration"
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 4 weeks"
                required
              />
              <Input
                label="Rating"
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                placeholder="4.5"
                required
              />
              <Input
                label="Cover Image URL"
                type="url"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                Description
                <span className="text-[var(--color-error)] ml-1">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg transition-all duration-200 hover:border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] placeholder-[var(--color-text-muted)] resize-none"
                rows="4"
                placeholder="Enter course description"
                required
              />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[var(--color-border)]">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                size="lg"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5 mr-2" />
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
                    Creating...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faBook} className="w-5 h-5 mr-2" />
                    Create Course
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

export default AddCourseModel;
