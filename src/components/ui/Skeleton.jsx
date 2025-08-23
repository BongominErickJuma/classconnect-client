import React from "react";

export const Skeleton = ({ className = "", width = "100%", height = "1rem", rounded = "md" }) => {
  return (
    <div
      className={`animate-pulse bg-[var(--color-surface)] rounded-${rounded} ${className}`}
      style={{ width, height }}
    />
  );
};

export const SkeletonCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] p-6 animate-pulse ${className}`}>
      {children}
    </div>
  );
};

export const SkeletonStatsCard = () => {
  return (
    <SkeletonCard>
      <div className="flex items-center justify-between mb-4">
        <Skeleton width="48px" height="48px" rounded="xl" />
        <div className="text-right">
          <Skeleton width="60px" height="32px" className="mb-2" />
          <Skeleton width="80px" height="16px" />
        </div>
      </div>
      <Skeleton width="120px" height="20px" />
    </SkeletonCard>
  );
};

export const SkeletonSection = ({ itemCount = 3 }) => {
  return (
    <SkeletonCard className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton width="24px" height="24px" rounded="full" />
        <Skeleton width="120px" height="24px" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: itemCount }).map((_, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-[var(--color-surface)] rounded-lg">
            <Skeleton width="8px" height="8px" rounded="full" />
            <div className="flex-1 space-y-2">
              <Skeleton width="100%" height="16px" />
              <Skeleton width="60%" height="12px" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
};

export const SkeletonWelcomeHeader = () => {
  return (
    <SkeletonCard className="bg-gradient-to-br from-gray-300 to-gray-400">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton width="48px" height="48px" rounded="full" className="bg-white/20" />
            <div>
              <Skeleton width="280px" height="32px" className="mb-2 bg-white/20" />
              <Skeleton width="80px" height="16px" className="bg-white/20" />
            </div>
          </div>
          <Skeleton width="400px" height="20px" className="mb-6 bg-white/20" />
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Skeleton width="60px" height="24px" className="mb-1 bg-white/20" />
              <Skeleton width="40px" height="12px" className="bg-white/20" />
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <Skeleton width="80px" height="24px" className="mb-1 bg-white/20" />
              <Skeleton width="40px" height="12px" className="bg-white/20" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Skeleton width="128px" height="128px" rounded="full" className="bg-white/20" />
        </div>
      </div>
    </SkeletonCard>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header Skeleton */}
      <div className="animate-slide-in-down">
        <SkeletonWelcomeHeader />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-up">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonStatsCard key={idx} />
        ))}
      </div>

      {/* Sections Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SkeletonSection itemCount={4} />
        <SkeletonSection itemCount={3} />
        <SkeletonSection itemCount={3} />
      </div>
    </div>
  );
};

export default Skeleton;