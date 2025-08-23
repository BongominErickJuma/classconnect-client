import React, { useEffect, useState } from "react";
import { getImageUrl, statisticsService } from "../../../../../Services/api";
import { Card, DashboardSkeleton } from "../../../../ui";

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
    { 
      title: "Total Courses", 
      value: stats.totalCourses, 
      icon: "📚", 
      gradient: "from-indigo-500 to-indigo-600",
      description: "All available courses" 
    },
    { 
      title: "My Courses", 
      value: stats.myCourses, 
      icon: "🎯", 
      gradient: "from-orange-500 to-amber-500",
      description: "Courses you teach" 
    },
    { 
      title: "Students Reached", 
      value: stats.studentsReached, 
      icon: "👥", 
      gradient: "from-green-500 to-emerald-600",
      description: "Total student connections" 
    },
    { 
      title: "Course Reviews", 
      value: stats.totalReviews, 
      icon: "⭐", 
      gradient: "from-pink-500 to-rose-600",
      description: "Reviews received" 
    },
  ];

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

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-[var(--color-error)]/20">
        <div className="flex items-center gap-3 p-4 bg-[var(--color-error)]/5 rounded-lg">
          <div className="text-[var(--color-error)] text-xl">⚠️</div>
          <div>
            <p className="font-semibold text-[var(--color-error)] mb-1">Error Loading Dashboard</p>
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

        {/* Pending Grades */}
        <div className="lg:col-span-1 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <Section title="Pending Grades" icon="⏰" isEmpty={upcoming.length === 0}>
            {upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.slice(0, 4).map((task, idx) => (
                  <div key={idx} className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-[var(--color-text-primary)] text-sm line-clamp-2">{task.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-info)] ml-2">
                        <span>📅</span>
                        <span>{task.due}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">{task.course}</p>
                  </div>
                ))}
                {upcoming.length > 4 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-[var(--color-primary)] hover:underline">
                      View all pending grades →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState 
                icon="✅" 
                message="No pending grades" 
                description="All assignments are graded!" 
              />
            )}
          </Section>
        </div>

        {/* Recent Reviews */}
        <div className="lg:col-span-1 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
          <Section title="Recent Reviews" icon="🎆" isEmpty={recentReviews.length === 0}>
            {recentReviews.length > 0 ? (
              <div className="space-y-4">
                {recentReviews.slice(0, 4).map((review, idx) => (
                  <div key={idx} className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <img
                        src={getImageUrl(review.photo)}
                        alt={review.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-border)]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{review.username}</p>
                          <div className="flex items-center gap-1">
                            {"⭐".repeat(review.rating)}
                            <span className="text-xs text-[var(--color-text-muted)] ml-1">({review.rating}/5)</span>
                          </div>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2 line-clamp-2">{review.content}</p>
                        <p className="text-xs text-[var(--color-text-muted)] italic truncate">{review.course}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {recentReviews.length > 4 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-[var(--color-primary)] hover:underline">
                      View all reviews →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState 
                icon="⭐" 
                message="No reviews yet" 
                description="Reviews will appear here once students rate your courses" 
              />
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default InstructorWidgets;