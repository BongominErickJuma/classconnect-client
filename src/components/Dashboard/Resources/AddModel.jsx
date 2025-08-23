import React from "react";
import { Button, Card, Input } from "../../ui";

const AddModel = ({ handleAddSubmit, handleInputChange, formData, setShowAddModal, isAddingRes }) => {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Add New Resource</h2>
                <p className="text-white/80 text-sm">Upload learning materials for students</p>
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
                  File Upload (Optional)
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
                  Upload documents, presentations, or other learning materials
                </p>
                
                {formData.file_url && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-700 truncate flex-1">File selected: {formData.file?.name || 'Unknown file'}</p>
                  </div>
                )}
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
                loading={isAddingRes}
                className="shadow-lg bg-green-500 hover:bg-green-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {isAddingRes ? "Adding Resource..." : "Add Resource"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddModel;
