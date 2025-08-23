import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courseService, enrollmentService, getImageUrl } from "../../../../Services/api";
import EditCourseModel from "./EditCourseModel";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Button, Card, Badge } from "../../../ui";

const CourseInfo = ({
  course: initialCourse,
  instructor,
  onCourseUpdate,
  isEnrolled,
  setIsEnrolled,
  isCourseInstructor,
}) => {
  const [course, setCourse] = useState(initialCourse);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id: course_id } = useParams();
  const { user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSave = async (updatedCourse) => {
    const res = await courseService.updateCourse(course.course_id, updatedCourse);
    updatedCourse = res.data;
    setCourse(updatedCourse);
    setShowEditModal(false);
    if (onCourseUpdate) {
      onCourseUpdate(updatedCourse);
    }
  };

  const handleEnrollment = async () => {
    setIsLoading(true);
    const student_id = user?.user_id;
    await enrollmentService.createEnrollment(course_id, student_id);
    setIsEnrolled(true);
    setIsLoading(false);
  };

  return (
    <>
      {/* Modern Course Hero Section */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative" padding="none">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row">
            {/* Course Cover Image */}
            <div className="w-full lg:w-2/5 xl:w-1/3">
              <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden">
                <img 
                  src={getImageUrl(course.cover_image)} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE1MEMxNDAuMzM1IDEyNSAxMzMgMTMyLjMzNSAxMzMgMTQyVjE1OEMxMzMgMTY3LjY2NSAxNDAuMzM1IDE3NSAxNTAgMTc1SDE3NUMxODQuNjY1IDE3NSAxOTIgMTY3LjY2NSAxOTIgMTU4VjE0MkMxOTIgMTMyLjMzNSAxODQuNjY1IDEyNSAxNzUgMTI1WiIgZmlsbD0iIzk0QTNCOCIvPgo8L3N2Zz4K';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Course Info */}
            <div className="flex-1 p-6 lg:p-8 xl:p-10">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 leading-tight">
                      {course.title}
                    </h1>
                  </div>
                  
                  {/* Rating Decorative Pattern */}
                  <div className="relative">
                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-yellow-300">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {course.category || 'General'}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    Advanced Level
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    48h Duration
                  </Badge>
                </div>

                {/* Instructor Section */}
                {instructor && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={getImageUrl(instructor.profile_photo)}
                          alt={instructor.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTI2IDI2VjI0QzI2IDIyLjg5NTQgMjUuMTA0NiAyMiAyNCAyMkgxNkMxNC44OTU0IDIyIDEzIDIyLjg5NTQgMTQgMjRWMjZNMjIgMTZDMjIgMTguMjA5MSAyMC4yMDkxIDIwIDE4IDIwQzE1Ljc5MDkgMjAgMTQgMTguMjA5MSAxNiAxNkMxNiAxMy43OTA5IDE3Ljc5MDkgMTIgMjAgMTJDMjIuMjA5MSAxMiAyNiAxMy43OTA5IDI2IDE2WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+';
                          }}
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      
                      <div className="ml-4">
                        <p className="text-white/70 text-sm font-medium">Course Instructor</p>
                        <p className="text-white font-semibold text-lg">
                          {instructor.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {user.role === "student" && (
                    <>
                      {isEnrolled ? (
                        <Button 
                          variant="secondary" 
                          size="lg"
                          className="bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600 flex-1 sm:flex-none"
                          disabled
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Enrolled
                        </Button>
                      ) : (
                        <Button
                          onClick={handleEnrollment}
                          variant="secondary"
                          size="lg"
                          loading={isLoading}
                          className="bg-white text-[var(--color-primary)] border-white hover:bg-gray-50 flex-1 sm:flex-none font-bold"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 mr-2 border-2 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
                              Enrolling...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Enroll Now
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}

                  {(user.role === "admin" || isCourseInstructor) && (
                    <Button
                      onClick={handleEditClick}
                      variant="secondary"
                      size="lg"
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Course
                    </Button>
                  )}

                  <Button
                    as={Link}
                    to="/dashboard/featured"
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Course Modal */}
      {showEditModal && (
        <EditCourseModel 
          course={course} 
          onClose={() => setShowEditModal(false)} 
          onSave={handleSave} 
        />
      )}
    </>
  );
};

export default CourseInfo;
