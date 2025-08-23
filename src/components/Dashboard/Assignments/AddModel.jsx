import React from "react";
import { Button, Card, Input } from "../../ui";

const AddModel = ({ handleAddSubmit, formData, handleInputChange, setShowAddModal, isLoading = false }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-in-up shadow-2xl border-none" 
        padding="none"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Create New Assignment</h2>
                <p className="text-white/80 text-sm">Add a new assignment for students</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddModal(false)}
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
          <form onSubmit={handleAddSubmit} className="space-y-6">
            {/* Assignment Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Assignment Information
                </h3>
              </div>

              <Input
                label="Assignment Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter assignment title"
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                  Assignment Description
                  <span className="text-[var(--color-error)] ml-1">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 resize-none"
                  rows="4"
                  placeholder="Describe what students need to do for this assignment..."
                  required
                />
              </div>
            </div>

            {/* Assignment Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-[var(--color-warning)]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Assignment Settings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Due Date"
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Maximum Score"
                  type="number"
                  name="max_score"
                  value={formData.max_score}
                  onChange={handleInputChange}
                  placeholder="100"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[var(--color-border)]">
              <Button
                type="button"
                onClick={() => setShowAddModal(false)}
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
                className="shadow-lg bg-purple-500 hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Assignment
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

export default AddModel;
