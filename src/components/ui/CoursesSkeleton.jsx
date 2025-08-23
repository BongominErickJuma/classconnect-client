import React from "react";
import { Skeleton, SkeletonCard } from "./Skeleton";

export const CourseCardSkeleton = () => {
  return (
    <SkeletonCard className="overflow-hidden">
      {/* Course Image Skeleton */}
      <div className="h-48 bg-[var(--color-surface)] rounded-t-xl relative">
        <Skeleton width="100%" height="100%" rounded="none" />
        {/* Rating Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton width="60px" height="28px" rounded="full" />
        </div>
      </div>

      {/* Course Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton width="85%" height="24px" />
          <Skeleton width="65%" height="24px" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="75%" height="16px" />
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton width="16px" height="16px" rounded="full" />
            <Skeleton width="60px" height="14px" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton width="16px" height="16px" rounded="full" />
            <Skeleton width="50px" height="14px" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton width="100%" height="48px" rounded="lg" />
      </div>
    </SkeletonCard>
  );
};

export const CoursesHeaderSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Header Section Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton width="60px" height="60px" rounded="xl" />
          <div className="space-y-2">
            <Skeleton width="200px" height="32px" />
            <Skeleton width="250px" height="16px" />
          </div>
        </div>

        {/* Search and Stats Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Results Count Skeleton */}
          <div className="bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <Skeleton width="40px" height="32px" />
              <div className="space-y-1">
                <Skeleton width="50px" height="16px" />
                <Skeleton width="70px" height="12px" />
              </div>
            </div>
          </div>

          {/* Search Input Skeleton */}
          <div className="w-full sm:w-80">
            <Skeleton width="100%" height="48px" rounded="lg" />
          </div>
        </div>
      </div>

      {/* Pagination Info Skeleton */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton width="8px" height="8px" rounded="full" />
          <Skeleton width="180px" height="16px" />
        </div>
        <Skeleton width="80px" height="16px" />
      </div>
    </div>
  );
};

export const CoursesSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <CoursesHeaderSkeleton />

      {/* Course Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <SkeletonCard className="bg-[var(--color-surface)]/50" padding="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton width="200px" height="16px" />
          <div className="flex items-center gap-2">
            <Skeleton width="80px" height="36px" rounded="md" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} width="40px" height="40px" rounded="md" />
              ))}
            </div>
            <Skeleton width="70px" height="36px" rounded="md" />
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
};

export default CoursesSkeleton;