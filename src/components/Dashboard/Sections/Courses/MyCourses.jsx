import React, { useEffect, useState } from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { enrollmentService, courseService, getImageUrl } from "../../../../Services/api";
import { Link } from "react-router-dom";
import ConfirmModal from "../../ConfirmModal";

const MyCourses = () => {
  const { user } = useCurrentUser();
  const [myCourses, setMyCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (user.role === "student") {
          const enrollmentsRes = await enrollmentService.getEnrollments(user.user_id);
          const enrollments = enrollmentsRes.data;

          const courseIds = enrollments.map((e) => e.course_id);

          if (courseIds.length === 0) {
            setMyCourses([]);
            setLoading(false);
            return;
          }

          const idsParam = courseIds.join(",");
          const coursesRes = await courseService.getEnrolledCourses(idsParam);
          const courses = coursesRes.data;

          const coursesWithEnrollmentId = courses.map((course) => {
            const enrollment = enrollments.find((e) => e.course_id === course.course_id);
            return {
              ...course,
              enrollment_id: enrollment?.enrollment_id,
            };
          });

          setMyCourses(coursesWithEnrollmentId);
        }

        if (user.role !== "student") {
          const mySubjects = await courseService.getInstructorCourses(user.user_id);
          setMyCourses(mySubjects.data);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user.user_id]);

  const handleLeaveClick = (enrollment_id) => {
    setSelectedEnrollmentId(enrollment_id);
    setShowModal(true);
  };

  const handleConfirmLeave = async () => {
    if (!selectedEnrollmentId) return;

    try {
      await enrollmentService.deleteMyEnrollment(selectedEnrollmentId);
      setMyCourses((prev) => prev.filter((c) => c.enrollment_id !== selectedEnrollmentId));
    } catch (err) {
      alert("Failed to leave course. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Courses</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Courses</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading courses: {error}
        </div>
      </div>
    );
  }

  if (myCourses.length === 0) return <div>You is no course to display.</div>;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <div
            key={course.course_id}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img src={getImageUrl(course.cover_image)} alt={course.title} className="w-full h-full object-cover" />
            </div>

            <div className="py-6 px-1">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold line-clamp-2">{course.title}</h2>
                <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  <span>★</span>
                  <span className="ml-1">{course.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

              <div className="flex gap-4 justify-between items-center">
                <Link
                  to={`/dashboard/courses/${course.course_id}`}
                  className="flex-1 px-4 py-2 text-white rounded navLink text-center"
                >
                  View Details
                </Link>
                {user.role === "student" && (
                  <button
                    className="flex-1 px-4 py-2 text-white rounded bg-red-500 hover:bg-red-600 transition"
                    onClick={() => handleLeaveClick(course.enrollment_id)}
                  >
                    Leave
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmLeave}
        message="Are you sure you want to leave this course?"
      />
    </div>
  );
};

export default MyCourses;
