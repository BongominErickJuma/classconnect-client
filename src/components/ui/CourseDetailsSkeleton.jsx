import React from "react";
import { Skeleton, SkeletonCard } from "./Skeleton";

export const CourseDetailsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Course Header Section */}
      <SkeletonCard padding="lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Image */}
          <div className="lg:w-1/3">
            <Skeleton width="100%" height="300px" rounded="xl" />
          </div>
          
          {/* Course Info */}
          <div className="lg:w-2/3 space-y-6">
            {/* Title and Rating */}
            <div className="space-y-3">
              <Skeleton width="80%" height="36px" />
              <Skeleton width="60%" height="24px" />
              <div className="flex items-center gap-4">
                <Skeleton width="100px" height="20px" rounded="full" />
                <Skeleton width="80px" height="20px" rounded="full" />
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Skeleton width="100%" height="16px" />
              <Skeleton width="95%" height="16px" />
              <Skeleton width="85%" height="16px" />
              <Skeleton width="90%" height="16px" />
            </div>
            
            {/* Instructor Info */}
            <div className="flex items-center gap-4">
              <Skeleton width="48px" height="48px" rounded="full" />
              <div className="space-y-2">
                <Skeleton width="120px" height="16px" />
                <Skeleton width="80px" height="14px" />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <Skeleton width="150px" height="48px" rounded="lg" />
              <Skeleton width="120px" height="48px" rounded="lg" />
            </div>
          </div>
        </div>
      </SkeletonCard>

      {/* Course Content Tabs */}
      <SkeletonCard>
        <div className="border-b border-[var(--color-border)] mb-6">
          <div className="flex gap-8 px-6">
            <Skeleton width="80px" height="40px" />
            <Skeleton width="100px" height="40px" />
            <Skeleton width="90px" height="40px" />
            <Skeleton width="70px" height="40px" />
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <Skeleton width="200px" height="24px" />
            <Skeleton width="100%" height="16px" />
            <Skeleton width="95%" height="16px" />
            <Skeleton width="88%" height="16px" />
          </div>
          
          <div className="space-y-4">
            <Skeleton width="180px" height="24px" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton width="100%" height="120px" rounded="lg" />
              <Skeleton width="100%" height="120px" rounded="lg" />
              <Skeleton width="100%" height="120px" rounded="lg" />
              <Skeleton width="100%" height="120px" rounded="lg" />
            </div>
          </div>
        </div>
      </SkeletonCard>

      {/* Additional Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkeletonCard padding="lg">
          <div className="space-y-4">
            <Skeleton width="150px" height="20px" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton width="40px" height="40px" rounded="lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="70%" height="16px" />
                    <Skeleton width="50%" height="14px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SkeletonCard>

        <SkeletonCard padding="lg">
          <div className="space-y-4">
            <Skeleton width="120px" height="20px" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton width="32px" height="32px" rounded="full" />
                    <Skeleton width="100px" height="16px" />
                    <Skeleton width="60px" height="16px" />
                  </div>
                  <Skeleton width="90%" height="14px" />
                  <Skeleton width="75%" height="14px" />
                </div>
              ))}
            </div>
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;