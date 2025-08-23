import React, { useEffect, useState } from "react";
import { getImageUrl, statisticsService } from "../../../../../Services/api";
import { Card, DashboardSkeleton } from "../../../../ui";

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
    { 
      title: "Total Courses", 
      value: stats.totalCourses, 
      icon: "📚", 
      gradient: "from-blue-500 to-blue-600",
      description: "Available courses" 
    },
    { 
      title: "Enrolled Courses", 
      value: stats.enrolledCourses, 
      icon: "📝", 
      gradient: "from-amber-500 to-orange-500",
      description: "Currently enrolled" 
    },
    { 
      title: "Students Reached", 
      value: stats.studentsReached, 
      icon: "👥", 
      gradient: "from-emerald-500 to-green-600",
      description: "Connections made" 
    },
    { 
      title: "Pending Grades", 
      value: stats.pendingGrades, 
      icon: "⏳", 
      gradient: "from-red-500 to-rose-600",
      description: "Awaiting results" 
    },
  ];

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-[var(--color-error)]/20">
        <div className="flex items-center gap-3 p-4 bg-[var(--color-error)]/5 rounded-lg">
          <div className="text-[var(--color-error)] text-xl">⚠️</div>
          <div>
            <p className="font-semibold text-[var(--color-error)] mb-1">Error Loading Stats</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-up">
        {cards.map(({ title, value, icon, gradient, description }) => (
          <StatsCard key={title} title={title} value={value} icon={icon} gradient={gradient} description={description} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
          <Section title="Recent Activity" icon="🔔" isEmpty={activities.length === 0}>
            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-surface)]/70 transition-colors">
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{item}</p>
                  </div>
                ))}
                {activities.length > 5 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-[var(--color-primary)] hover:underline">
                      View all {activities.length} activities →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState 
                icon="📝" 
                message="No recent activity" 
                description="Your activities will appear here" 
              />
            )}
          </Section>
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-1 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <Section title="Upcoming Deadlines" icon="⏰" isEmpty={upcoming.length === 0}>
            {upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.slice(0, 4).map((task, idx) => (
                  <div key={idx} className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">{task.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-error)]">
                        <span>⏰</span>
                        <span>{task.due}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">{task.course}</p>
                  </div>
                ))}
                {upcoming.length > 4 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-[var(--color-primary)] hover:underline">
                      View all deadlines →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState 
                icon="✅" 
                message="No upcoming deadlines" 
                description="You're all caught up!" 
              />
            )}
          </Section>
        </div>

        {/* Recent Gradings */}
        <div className="lg:col-span-1 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
          <Section title="Recent Grades" icon="📊" isEmpty={recentGradings.length === 0}>
            {recentGradings.length > 0 ? (
              <div className="space-y-4">
                {recentGradings.slice(0, 4).map((grade, idx) => (
                  <div key={idx} className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <img
                        src={getImageUrl(grade.photo)}
                        alt={grade.instructor}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-border)]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{grade.instructor}</p>
                          <div className="flex items-center gap-1 px-2 py-1 bg-[var(--color-success)]/10 rounded-full">
                            <span className="text-xs text-[var(--color-success)] font-bold">{grade.score}</span>
                          </div>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2 line-clamp-2">{grade.remark}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic truncate">{grade.subject}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {recentGradings.length > 4 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-[var(--color-primary)] hover:underline">
                      View all grades →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState 
                icon="📝" 
                message="No grades yet" 
                description="Grades will appear here once available" 
              />
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, gradient, description }) => (
  <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:scale-105">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="relative p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">{value}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
        </div>
      </div>
      <h4 className="font-semibold text-[var(--color-text-primary)]">{title}</h4>
    </div>
  </Card>
);

const Section = ({ title, icon, children, isEmpty }) => (
  <Card className={`h-full ${isEmpty ? 'flex flex-col' : ''}`}>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-[var(--color-text-primary)]">
        <span className="text-xl">{icon}</span>
        <span>{title}</span>
      </h3>
      {children}
    </div>
  </Card>
);

const EmptyState = ({ icon, message, description }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 bg-[var(--color-surface)] rounded-full flex items-center justify-center text-2xl mb-4">
      {icon}
    </div>
    <p className="font-medium text-[var(--color-text-primary)] mb-2">{message}</p>
    <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
  </div>
);

export default StudentsWidgets;
