// components/ConfirmDeleteModal.jsx

import React from "react";
import { Button, Card } from "../ui";

const ConfirmDeleteModal = ({ onConfirm, onCancel, title = "Delete Item", message, isLoading = false }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card 
        className="w-full max-w-md animate-slide-in-up shadow-2xl border-none" 
        padding="none"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[var(--color-error)] to-red-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
              <p className="text-white/80 text-sm">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-error)]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {title}
            </h3>
            
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {message || "Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed."}
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-[var(--color-error)]/5 border border-[var(--color-error)]/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-[var(--color-error)] mb-1">
                  Warning: Irreversible Action
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Once deleted, this data cannot be recovered. Please make sure this is what you want to do.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            
            <Button
              onClick={onConfirm}
              variant="danger"
              size="lg"
              className="flex-1 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Forever
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmDeleteModal;
