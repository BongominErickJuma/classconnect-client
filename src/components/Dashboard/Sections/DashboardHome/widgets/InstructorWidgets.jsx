import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClipboardCheck,
  faUsers,
  faBookOpen,
  faBell,
  faClock,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

const InstructorWidgets = ({ user }) => {
  const [stats, setStats] = useState({
    coursesCreated: 0,
    assignmentsDue: 0,
    studentsReached: 0,
    newResources: 0,
  });

  const [activities, setActivities] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Mock summary stats
    setStats({
      coursesCreated: 4,
      assignmentsDue: 3,
      studentsReached: 78,
      newResources: 2,
    });

    // Mock recent activity
    setActivities([
      "Created new assignment: OS Lab Report",
      "Graded Assignment 2 for AI",
      "Uploaded new video for Digital Logic",
    ]);

    // Mock upcoming tasks
    setUpcoming([
      { title: "Grade Quiz 1 - Embedded", due: "July 2, 2025" },
      { title: "Lecture: Signals & Systems", due: "July 4, 2025" },
    ]);

    // Mock announcements
    setAnnouncements(["📢 Staff meeting scheduled for July 6 at 2PM", "Midterms to be uploaded by July 8"]);
  }, []);

  const cards = [
    { title: "Courses Created", value: stats.coursesCreated, icon: faBook, color: "text-indigo-600" },
    { title: "Assignments Due", value: stats.assignmentsDue, icon: faClipboardCheck, color: "text-orange-500" },
    { title: "Students Reached", value: stats.studentsReached, icon: faUsers, color: "text-green-600" },
    { title: "New Resources", value: stats.newResources, icon: faBookOpen, color: "text-pink-500" },
  ];

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
export default InstructorWidgets;
