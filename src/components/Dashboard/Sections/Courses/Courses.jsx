import React, { useEffect, useState, useMemo } from "react";
import { courseService, getImageUrl } from "../../../../Services/api";
import { Link } from "react-router-dom";
import CourseHeader from "./CourseHeader";

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
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Courses</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Courses</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading courses: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col justify-between">
      <CourseHeader
        currentPage={currentPage}
        limit={limit}
        filteredCourses={filteredCourses}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Courses Found</h3>
          <p className="mt-1 text-sm text-gray-500">Try searching by a different title</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => (
            <div
              key={course.course_id}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                {course.cover_image ? (
                  <img
                    src={getImageUrl(course.cover_image)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Image Available</div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold line-clamp-2">{course.title}</h2>
                  <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    <span>★</span>
                    <span className="ml-1">{course.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex justify-end items-center">
                  <Link to={`/dashboard/courses/${course.course_id}`} className="px-4 py-2 text-white rounded navLink">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${page === currentPage ? "btn-active" : ""}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
