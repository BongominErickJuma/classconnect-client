import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courseService, enrollmentService, getImageUrl } from "../../../../Services/api";
import EditCourseModel from "./EditCourseModel";
import useCurrentUser from "../../../Hooks/useCurrentUser";

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
    <div className="flex flex-col md:flex-row gap-6 mb-8 p-6">
      {/* Course Cover Image */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-64  overflow-hidden">
        <img src={getImageUrl(course.cover_image)} alt={course.title} className="w-full h-full object-cover" />
      </div>

      {/* Course Info */}
      <div className="flex-1">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold" style={{ color: "var(--color-text-base)" }}>
            {course.title}
          </h1>
          <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            <span>★</span>
            <span className="ml-1 font-medium">{course.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg mb-4" style={{ color: "var(--color-text-base)" }}>
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm">category</span>
          <span className="px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm">Advanced</span>
          <span className="px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm">48h</span>
        </div>

        {/* Enhanced Instructor Section */}
        <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
          {instructor && (
            <>
              <img
                src={getImageUrl(instructor.profile_photo)}
                alt={instructor.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />

              <div>
                <p className="text-sm text-gray-600">Instructor</p>
                <p className="font-medium" style={{ color: "var(--color-text-base)" }}>
                  {instructor.name}
                </p>
              </div>
            </>
          )}
        </div>

        {/* CTA Button */}
        <div className="flex gap-4 md:justify-end">
          {user.role === "student" && (
            <>
              {isEnrolled ? (
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={handleEnrollment}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  {isLoading ? "Enrolling" : "Enroll Now"}
                </button>
              )}
            </>
          )}

          {(user.role === "admin" || isCourseInstructor) && (
            <button
              onClick={handleEditClick}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          )}

          <Link
            to={"/dashboard/featured"}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Edit Course Modal */}
      {showEditModal && <EditCourseModel course={course} onClose={() => setShowEditModal(false)} onSave={handleSave} />}
    </div>
  );
};

export default CourseInfo;
