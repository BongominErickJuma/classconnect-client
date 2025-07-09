import { Link, useParams } from "react-router-dom";
import {
  assignmentService,
  courseService,
  enrollmentService,
  resourcesService,
  reviewService,
  userService,
} from "../../../../Services/api";
import { useEffect, useState } from "react";
import Reviews from "../../Reviews/Reviews";
import Resources from "../../Resources/Resources";
import Assignments from "../../Assignments/Assignments";
import CourseInfo from "./CourseInfo";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useCurrentUser();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviews, setReviews] = useState(null);
  const [resources, setResources] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch course and then instructor
  useEffect(() => {
    const fetchCourseAndInstructor = async () => {
      try {
        const courseRes = await courseService.getCourse(id);
        const courseData = courseRes.data;
        setCourse(courseData);

        // Now fetch instructor using instructor_id from course
        if (courseData.instructor_id) {
          const instructorRes = await userService.getUser(courseData.instructor_id);
          setInstructor(instructorRes.data);
        }

        if (courseData) {
          const reviews = await reviewService.getReview(`course_id=${id}`);
          setReviews(reviews.data);

          const resource = await resourcesService.getAllresources(`course_id=${id}`);
          setResources(resource.data);

          const assignments = await assignmentService.getAllAssignments(`course_id=${id}`);
          setAssignments(assignments.data);

          const enrollments = await enrollmentService.getCourseTotalEntollments(id);
          if (enrollments) {
            setTotalEnrollments(enrollments.data.length);
          }

          if (user.role === "student") {
            // 1. Fetch all enrollments for the active user
            const checkEnrollments = await enrollmentService.getEnrollments(user.user_id);

            const enrolledIDs = checkEnrollments.data;
            // 3. Check if any of the enrollments match the current course ID
            const isEnrolled = enrolledIDs.some((enrollment) => enrollment.course_id === id);

            // 4. Update state accordingly
            setIsEnrolled(isEnrolled);
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourseAndInstructor();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isCourseInstructor = user.user_id === instructor.user_id;

  return (
    <div className="p-6  mx-auto">
      {/* Course Header Section */}
      <CourseInfo
        course={course}
        instructor={instructor}
        isEnrolled={isEnrolled}
        setIsEnrolled={setIsEnrolled}
        isCourseInstructor={isCourseInstructor}
      />

      {/* Course Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Students Enrolled" value={totalEnrollments} icon="👥" />
        <MetricCard title="Resources" value={resources.length} icon="📚" />
        <MetricCard title="Assignments" value={assignments.length} icon="📝" />
        <MetricCard title="Reviews" value={reviews.length} icon="⭐" />
      </div>

      <Resources resources={resources} isCourseInstructor={isCourseInstructor} />
      <Assignments assignments={assignments} isCourseInstructor={isCourseInstructor} />
      <Reviews reviews={reviews} isEnrolled={isEnrolled} />
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, link, icon }) => {
  return (
    <a href={link} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl font-bold" style={{ color: "var(--color-text-base)" }}>
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </a>
  );
};

export default CourseDetails;
