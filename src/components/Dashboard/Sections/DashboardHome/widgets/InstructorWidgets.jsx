import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClipboardCheck,
  faUsers,
  faBookOpen,
  faBell,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { getImageUrl, statisticsService } from "../../../../../Services/api";

const InstructorWidgets = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    myCourses: 0,
    studentsReached: 0,
    totalReviews: 0,
  });

  const [activities, setActivities] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setIsPending(true);
      try {
        const dashbboardRes = await statisticsService.getInstructorDashboardMetrics();
        setStats({
          totalCourses: dashbboardRes.data.total_courses,
          myCourses: dashbboardRes.data.my_courses,
          studentsReached: dashbboardRes.data.students_reached,
          totalReviews: dashbboardRes.data.total_reviews,
        });

        const recentReviewsRes = await statisticsService.getInstructorRecentReviews();
        setRecentReviews(
          recentReviewsRes.data.map((review) => ({
            username: review.name,
            rating: review.rating,
            content: review.review,
            photo: review.profile_photo,
            course: review.title,
          }))
        );

        const recentActivitiesRes = await statisticsService.getInstructorRecentActivities();
        setActivities(recentActivitiesRes.data.map((activity) => activity.reference));

        const upcomingDeadLinesRes = await statisticsService.getInstructorUpcomingDeadlines();
        setUpcoming(
          upcomingDeadLinesRes.data.map((item) => ({
            title: `${item.title} - ${item.student_name}`,
            due: new Date(item.submitted_at).toLocaleDateString(),
            course: item.course_title,
          }))
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Courses", value: stats.totalCourses, icon: faBook, color: "text-indigo-600" },
    { title: "My Courses", value: stats.myCourses, icon: faClipboardCheck, color: "text-orange-500" },
    { title: "Students Reached", value: stats.studentsReached, icon: faUsers, color: "text-green-600" },
    { title: "Reviews for my courses", value: stats.totalReviews, icon: faBookOpen, color: "text-pink-500" },
  ];

  const Card = ({ title, value, icon, color }) => (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-start md:items-center space-y-1">
      <div className="flex items-start space-x-2">
        <div className={`text-2xl ${color}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
      </div>
      <h4 className="text-sm text-gray-500">{title}</h4>
    </div>
  );

  const Section = ({ title, icon, children }) => (
    <div className="bg-white shadow-sm rounded-xl p-5">
      <h3 className="text-md font-semibold mb-3 flex items-center space-x-2 text-gray-800">
        <FontAwesomeIcon icon={icon} className="text-gray-500" />
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );

  if (isPending) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ title, value, icon, color }) => (
          <Card key={title} title={title} value={value} icon={icon} color={color} />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column (Recent Activity + Tasks) */}
        <div className="flex-1 space-y-6">
          {/* Recent Activity */}
          <Section title="Recent Activity" icon={faBell}>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {activities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Section>

          {/* Upcoming Tasks */}
          <Section title="Pending Grades" icon={faClock}>
            <ul className="text-sm text-gray-700 space-y-1">
              {upcoming.map((task, idx) => (
                <li key={idx}>
                  <span className="font-medium">{task.title}</span> —{" "}
                  <span className="text-red-500">submitted on {task.due}</span>
                  <span className="block text-xs text-gray-500">{task.course}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Right Column (Recent Reviews) */}
        <div className="flex-1 lg:max-w-md">
          <Section title="Recent Reviews" icon={faStar}>
            <ul className="space-y-4">
              {recentReviews.map((review, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <img
                    src={getImageUrl(review.photo)}
                    alt={review.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{review.username}</p>
                    <p className="text-gray-800 text-sm">
                      {"⭐".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                      <span className="ml-2 text-xs text-gray-500">{review.course}</span>
                    </p>
                    <p className="text-gray-700 text-sm">{review.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default InstructorWidgets;
