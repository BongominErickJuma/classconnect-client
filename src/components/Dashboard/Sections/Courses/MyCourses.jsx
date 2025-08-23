import React, { useEffect, useState } from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { enrollmentService, courseService, getImageUrl } from "../../../../Services/api";
import { Link } from "react-router-dom";
import ConfirmModal from "../../ConfirmModal";
import { CoursesSkeleton, Card, Button } from "../../../ui";

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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                      My Courses
                    </h1>
                    <p className="text-white/80 text-sm">
                      {user.role === "student" ? "Your enrolled courses and learning progress" : "Courses you're teaching and managing"}
                    </p>
                  </div>
                </div>

                {/* Decorative Pattern */}
                <div className="relative flex-shrink-0 hidden lg:block">
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-4xl">📚</span>
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
              <p className="text-red-600">{error}</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (myCourses.length === 0) {
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                      My Courses
                    </h1>
                    <p className="text-white/80 text-sm">
                      {user.role === "student" ? "Your enrolled courses and learning progress" : "Courses you're teaching and managing"}
                    </p>
                  </div>
                </div>

                {/* Decorative Pattern with Course Count */}
                <div className="relative flex-shrink-0 hidden lg:block">
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">0</div>
                        <div className="text-xs text-white/70">courses</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Empty State */}
        <div className="animate-slide-in-up">
          <Card className="text-center" padding="lg">
            <div className="py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                No Courses Yet
              </h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-6">
                {user.role === "student" 
                  ? "You haven't enrolled in any courses yet. Explore our course catalog to get started!" 
                  : "You haven't created any courses yet. Start sharing your knowledge with students!"}
              </p>
              <Button 
                as={Link}
                to="/dashboard/featured"
                variant="primary"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {user.role === "student" ? "Browse Courses" : "View All Courses"}
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
          
          <div className="relative z-10 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                    My Courses
                  </h1>
                  <p className="text-white/80 text-sm">
                    {user.role === "student" ? "Your enrolled courses and learning progress" : "Courses you're teaching and managing"}
                  </p>
                </div>
              </div>

              {/* Decorative Pattern with Course Count */}
              <div className="relative flex-shrink-0 hidden lg:block">
                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{myCourses.length}</div>
                      <div className="text-xs text-white/70">courses</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="animate-slide-in-up">
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
