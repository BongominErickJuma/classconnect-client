import React from "react";
import { Button, Card, Input } from "../../ui";

const EditModel = ({ handleEditSubmit, handleInputChange, formData, setShowEditModal, isLoading = false }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-in-up shadow-2xl border-none" 
        padding="none"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Edit Resource</h2>
                <p className="text-white/80 text-sm">Update resource information and content</p>
              </div>
            </div>
            <Button
              onClick={() => setShowEditModal(false)}
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
          <form onSubmit={handleEditSubmit} className="space-y-6">
            {/* Resource Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Resource Information
                </h3>
              </div>

              <Input
                label="Resource Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter resource title"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                    Resource Type
                    <span className="text-[var(--color-error)] ml-1">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg transition-all duration-200 hover:border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    required
                  >
                    <option value="pdf">📄 PDF Document</option>
                    <option value="document">📝 Document</option>
                    <option value="video">🎬 Video</option>
                    <option value="link">🔗 External Link</option>
                  </select>
                </div>

                <Input
                  label="Upload Date"
                  type="date"
                  name="uploaded_at"
                  value={formData.uploaded_at}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Resource Content Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="p-2 bg-[var(--color-accent)]/10 rounded-lg">
                  <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Resource Content
                </h3>
              </div>

              {/* External Link Field */}
              <Input
                label="External Link (Optional)"
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://example.com/resource"
                helperText="Provide a link to external resources like websites, videos, or online documents"
              />

              {/* File Upload Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text-primary)]">
                  Replace File (Optional)
                </label>
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
                  className="w-full px-4 py-3 border border-dashed border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-green-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-500 file:text-white hover:file:bg-green-600 file:cursor-pointer cursor-pointer"
                />
                <p className="text-xs text-[var(--color-text-muted)]">
                  Choose a new file to replace the current resource
                </p>
                
                {formData.file_url && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-700 truncate flex-1">File selected: {formData.file?.name || 'Current file'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[var(--color-border)]">
              <Button
                type="button"
                onClick={() => setShowEditModal(false)}
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
                className="shadow-lg bg-green-500 hover:bg-green-600"
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

export default EditModel;
