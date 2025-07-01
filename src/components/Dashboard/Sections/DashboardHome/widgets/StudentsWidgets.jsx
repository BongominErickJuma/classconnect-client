import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faTasks,
  faBookOpen,
  faChartLine,
  faBell,
  faClock,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

const StudentsWidgets = ({ user }) => {
  const [stats, setStats] = useState({
    courses: 0,
    upcomingAssignments: 0,
    avgGrade: 0,
    newResources: 0,
  });

  const [activities, setActivities] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Mock summary stats
    setStats({
      courses: 3,
      upcomingAssignments: 2,
      avgGrade: 87.5,
      newResources: 4,
    });

    // Mock recent activity
    setActivities([
      "Submitted Assignment 1 for Logic Design",
      "Joined course: Embedded Systems",
      "Received feedback on Signals Lab Report",
    ]);

    // Mock upcoming assignments
    setUpcoming([
      { title: "Assignment 2 - Flip Flops", due: "July 3, 2025" },
      { title: "Final Project Proposal", due: "July 7, 2025" },
    ]);

    // Mock announcements
    setAnnouncements([
      "📢 Midterm exams start on July 10. Check your schedule!",
      "New resources added for Computer Networks",
    ]);
  }, []);

  const cards = [
    { title: "Courses Enrolled", value: stats.courses, icon: faBook, color: "text-blue-500" },
    { title: "Upcoming Assignments", value: stats.upcomingAssignments, icon: faTasks, color: "text-yellow-500" },
    { title: "Average Grade", value: `${stats.avgGrade}%`, icon: faChartLine, color: "text-green-500" },
    { title: "New Resources", value: stats.newResources, icon: faBookOpen, color: "text-red-500" },
  ];

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
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Right Column (Announcements) */}
        <div className="flex-1 lg:max-w-md">
          <Section title="Announcements" icon={faBullhorn}>
            <ul className="text-sm text-gray-700 list-disc ml-6">
              {announcements.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, color }) => (
  <div className="bg-white shadow-md rounded-xl p-4 flex items-center space-x-3">
    <div className={`text-sm ${color}`}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
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
