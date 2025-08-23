import React from "react";
import { Input } from "../../../ui";

const CourseHeader = ({ currentPage, limit, filteredCourses, searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-8 animate-slide-in-down">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">
              All Courses
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Discover and explore our course catalog
            </p>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Results Count */}
          <div className="bg-[var(--color-surface)] px-4 py-2 rounded-lg border border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[var(--color-primary)]">
                {filteredCourses.length}
              </span>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <div>course{filteredCourses.length !== 1 ? 's' : ''}</div>
                {searchTerm && (
                  <div className="text-xs text-[var(--color-text-muted)]">
                    matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-80">
            <Input
              type="text"
              placeholder="Search courses by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Pagination Info */}
      {filteredCourses.length > 0 && (
        <div className="mt-6 flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
            <span>
              Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, filteredCourses.length)} of {filteredCourses.length} results
            </span>
          </div>
          
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="flex items-center gap-1 text-[var(--color-error)] hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseHeader;
