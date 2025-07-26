import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClipboardList,
  faUserGraduate,
  faHourglassHalf,
  faBell,
  faClock,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getImageUrl, statisticsService } from "../../../../../Services/api";

const StudentsWidgets = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    studentsReached: 0,
    pendingGrades: 0,
  });

  const [activities, setActivities] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [recentGradings, setRecentGradings] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setIsPending(true);
      try {
        const dashbboardRes = await statisticsService.getStudentDashboardMetrics();
        setStats({
          totalCourses: dashbboardRes.data.total_courses,
          enrolledCourses: dashbboardRes.data.enrolled_courses,
          studentsReached: dashbboardRes.data.students_reached,
          pendingGrades: dashbboardRes.data.pending_grades,
        });

        const recentActivitiesRes = await statisticsService.getStudentRecentActivities();
        setActivities(
          recentActivitiesRes.data.map((activity) => {
            if (activity.type === "rating") {
              return `Rated course: ${activity.reference}`;
            } else if (activity.type === "enrollment") {
              return `Enrolled in : ${activity.reference}`;
            } else if (activity.type === "submission") {
              return `Submitted: ${activity.reference}`;
            } else {
              return activity.reference;
            }
          })
        );

        const upcomingDeadLinesRes = await statisticsService.getStudentUpcomingDeadlines();
        setUpcoming(
          upcomingDeadLinesRes.data.map((item) => ({
            title: item.title,
            due: new Date(item.due_date).toLocaleDateString(),
            course: item.course_title,
          }))
        );

        const recentGradingsRes = await statisticsService.getStudentRecentGrades();
        setRecentGradings(
          recentGradingsRes.data.map((grade) => ({
            instructor: grade.name,
            photo: grade.profile_photo,
            score: `${grade.score}%`,
            remark: grade.feedback,
            subject: grade.title,
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
    { title: "Total Courses", value: stats.totalCourses, icon: faBook, color: "text-blue-500" },
    { title: "Courses Enrolled in", value: stats.enrolledCourses, icon: faClipboardList, color: "text-yellow-500" },
    { title: "Students Reached", value: stats.studentsReached, icon: faUserGraduate, color: "text-green-500" },
    { title: "Pending Grades", value: stats.pendingGrades, icon: faHourglassHalf, color: "text-red-500" },
  ];

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
          Error loading Stats: {error}
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
          <Section title="Upcoming Deadlines" icon={faClock}>
            <ul className="text-sm text-gray-700 space-y-1">
              {upcoming.map((task, idx) => (
                <li key={idx}>
                  <span className="font-medium">{task.title}</span> —{" "}
                  <span className="text-red-500">by {task.due}</span>
                  <span className="block text-xs text-gray-500">{task.course}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Right Column (Recent gradings) */}
        <div className="flex-1">
          <Section title="Recent gradings" icon={faFileAlt}>
            <ul className="space-y-4">
              {recentGradings.map((grade, idx) => (
                <li key={idx} className="flex items-start space-x-4">
                  <img
                    src={getImageUrl(grade.photo)}
                    alt={grade.instructor}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <p className="text-gray-800 font-semibold flex items-center gap-2">{grade.instructor}</p>
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      Score: <span className="font-medium">{grade.score}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">{grade.remark}</p>
                    <p className="text-xs text-gray-500 italic flex items-center gap-2">{grade.subject}</p>
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

export default StudentsWidgets;
