import React from "react";
import StudentsWidgets from "./widgets/StudentsWidgets";
import InstructorWidgets from "./widgets/InstructorWidgets";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Card } from "../../../ui";

const Home = () => {
  const { user } = useCurrentUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="animate-slide-in-down">
        <Card
          className="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-indigo-800 border-none text-white relative overflow-hidden"
          padding="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">
                      {user.role === "student" ? "🎓" : user.role === "instructor" ? "👨‍🏫" : "⚙️"}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">
                      {getGreeting()}, {user.name}!
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white/80 capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                  {user.role === "student"
                    ? "Ready to continue your learning journey? Your courses are waiting!"
                    : user.role === "instructor"
                    ? "Your students are eager to learn from your expertise and guidance!"
                    : "Manage your platform effectively with powerful tools and insights!"}
                </p>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">
                      {user.role === "student" ? "Active" : "Teaching"}
                    </div>
                    <div className="text-xs text-white/70">Status</div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">
                      {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                    <div className="text-xs text-white/70">Today</div>
                  </div>
                </div>
              </div>

              {/* Decorative Pattern */}
              <div className="hidden lg:block relative">
                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">
                      {user.role === "student" ? "📚" : user.role === "instructor" ? "🎯" : "📊"}
                    </span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Widgets */}
      <div className="animate-slide-in-up" style={{ animationDelay: "200ms" }}>
        {user.role === "student" ? <StudentsWidgets /> : <InstructorWidgets />}
      </div>
    </div>
  );
};

export default Home;
