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
import { CourseDetailsSkeleton, Card, Button } from "../../../ui";

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
          const reviews = await reviewService.getReview(`${id}`);
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

  if (loading) {
    return <CourseDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center animate-fade-in">
        <Card className="max-w-md mx-auto text-center" padding="lg">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-[var(--color-error)]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Course Not Found
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              {error}
            </p>
            <Button 
              as={Link} 
              to="/dashboard/featured" 
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Courses
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isCourseInstructor = user.user_id === instructor.user_id;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Course Header Section */}
      <div className="animate-slide-in-down">
        <CourseInfo
          course={course}
          instructor={instructor}
          isEnrolled={isEnrolled}
          setIsEnrolled={setIsEnrolled}
          isCourseInstructor={isCourseInstructor}
        />
      </div>

      {/* Course Metrics */}
      <div className="animate-slide-in-up" style={{animationDelay: '200ms'}}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Students Enrolled" value={totalEnrollments} icon="👥" gradient="bg-gradient-to-br from-blue-500 to-blue-600" />
          <MetricCard title="Resources" value={resources.length} icon="📚" gradient="bg-gradient-to-br from-green-500 to-green-600" />
          <MetricCard title="Assignments" value={assignments.length} icon="📝" gradient="bg-gradient-to-br from-purple-500 to-purple-600" />
          <MetricCard title="Reviews" value={reviews.length} icon="⭐" gradient="bg-gradient-to-br from-yellow-500 to-orange-500" />
        </div>
      </div>

      {/* Course Content Sections */}
      <div className="space-y-8 animate-slide-in-up" style={{animationDelay: '400ms'}}>
        <Resources resources={resources} isCourseInstructor={isCourseInstructor} isEnrolled={isEnrolled} />
        <Assignments assignments={assignments} isCourseInstructor={isCourseInstructor} isEnrolled={isEnrolled} />
        <Reviews reviews={reviews} isEnrolled={isEnrolled} />
      </div>
    </div>
  );
};

// Modern Metric Card Component
const MetricCard = ({ title, value, link, icon, gradient }) => {
  const CardComponent = link ? 'a' : 'div';
  
  return (
    <Card 
      as={CardComponent}
      href={link}
      className={`group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl border-none text-white relative overflow-hidden ${gradient}`}
      padding="lg"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <span className="text-lg">{icon}</span>
          </div>
          <div className="text-right">
            <div className="text-2xl lg:text-3xl font-bold leading-none">
              {value.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-white/90 text-sm lg:text-base">
            {title}
          </h4>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
      </div>
    </Card>
  );
};

export default CourseDetails;
