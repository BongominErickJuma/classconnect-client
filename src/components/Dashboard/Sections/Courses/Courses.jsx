import React, { useEffect, useState, useMemo } from "react";
import { courseService, getImageUrl } from "../../../../Services/api";
import { Link } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import { Card, Button, CoursesSkeleton } from "../../../ui";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Reset page on search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [courses, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / limit);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * limit, currentPage * limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <CoursesSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="animate-slide-in-down">
          <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative" padding="none">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            </div>
            
            <div className="relative z-10 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                      Featured Courses
                    </h1>
                    <p className="text-white/80 text-sm">
                      Discover and explore our comprehensive course catalog
                    </p>
                  </div>
                </div>

                {/* Decorative Pattern */}
                <div className="relative flex-shrink-0 hidden lg:block">
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Error Content */}
        <div className="animate-slide-in-up">
          <Card className="text-center border-red-200 bg-red-50" padding="lg">
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Courses</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="primary"
                size="lg"
              >
                Refresh Page
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="animate-slide-in-down">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative" padding="none">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      Featured Courses
                    </h1>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                      Discover and explore our course catalog
                    </p>
                  </div>
                </div>

                {/* Decorative Pattern with Course Count - Desktop only */}
                <div className="relative flex-shrink-0 hidden xl:block">
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{filteredCourses.length}</div>
                        <div className="text-xs text-white/70">courses</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Search Input - Full width on mobile */}
              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses by title..."
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Results Info - Mobile optimized */}
              {filteredCourses.length > 0 && (
                <div className="border-t border-white/20 pt-3">
                  <p className="text-white/80 text-xs sm:text-sm">
                    Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, filteredCourses.length)} of {filteredCourses.length} courses
                    {searchTerm && (
                      <span className="ml-1 text-white/60 block sm:inline mt-1 sm:mt-0">
                        Filtered by "{searchTerm}"
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="animate-slide-in-up">
        {filteredCourses.length === 0 ? (
          <Card className="text-center" padding="lg">
            <div className="py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {searchTerm ? "No Matching Courses" : "No Courses Available"}
              </h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-6">
                {searchTerm 
                  ? `No courses found matching "${searchTerm}". Try adjusting your search terms.`
                  : "There are currently no courses available. Check back later for new content."
                }
              </p>
              {searchTerm && (
                <Button 
                  onClick={() => setSearchTerm("")}
                  variant="secondary"
                  size="lg"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course, index) => (
            <div 
              key={course.course_id}
              className="animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card group overflow-hidden hover:scale-105">
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 overflow-hidden">
                  {course.cover_image ? (
                    <img
                      src={getImageUrl(course.cover_image)}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📚</div>
                        <p className="text-sm">No Image Available</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow-sm">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-[var(--color-text-primary)]">{course.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mb-1 sm:mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Meta */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>24 students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⏰</span>
                      <span>8 weeks</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/dashboard/courses/${course.course_id}`}
                    className="block w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <Card className="mt-8 sm:mt-12 bg-[var(--color-surface)]/50" padding="md lg:lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[var(--color-text-secondary)] text-center sm:text-left">
              Page {currentPage} of {totalPages} • {filteredCourses.length} total
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  let page;
                  if (totalPages <= 3) {
                    page = i + 1;
                  } else if (currentPage === 1) {
                    page = i + 1;
                  } else if (currentPage === totalPages) {
                    page = totalPages - 2 + i;
                  } else {
                    page = currentPage - 1 + i;
                  }

                  return (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      variant={page === currentPage ? "primary" : "ghost"}
                      size="sm"
                      className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
                    >
                      {page}
                    </Button>
                  );
                })}
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <>
                    <span className="text-[var(--color-text-muted)] px-1">...</span>
                    <Button
                      onClick={() => handlePageChange(totalPages)}
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Courses;
