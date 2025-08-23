import React from "react";
import { Skeleton, SkeletonCard } from "./Skeleton";

export const AssignmentDetailsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Back Navigation */}
      <Skeleton width="120px" height="40px" rounded="lg" />

      {/* Assignment Header */}
      <SkeletonCard padding="lg">
        <div className="space-y-6">
          {/* Title and Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <Skeleton width="70%" height="32px" />
              <Skeleton width="50%" height="20px" />
            </div>
            <div className="flex gap-3">
              <Skeleton width="100px" height="36px" rounded="full" />
              <Skeleton width="80px" height="36px" rounded="full" />
            </div>
          </div>

          {/* Assignment Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Skeleton width="80px" height="16px" />
              <Skeleton width="120px" height="20px" />
            </div>
            <div className="space-y-2">
              <Skeleton width="70px" height="16px" />
              <Skeleton width="100px" height="20px" />
            </div>
            <div className="space-y-2">
              <Skeleton width="90px" height="16px" />
              <Skeleton width="80px" height="20px" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Skeleton width="100px" height="20px" />
            <div className="space-y-2">
              <Skeleton width="100%" height="16px" />
              <Skeleton width="95%" height="16px" />
              <Skeleton width="88%" height="16px" />
              <Skeleton width="92%" height="16px" />
            </div>
          </div>
        </div>
      </SkeletonCard>

      {/* Assignment Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instructions */}
        <SkeletonCard padding="lg">
          <div className="space-y-4">
            <Skeleton width="120px" height="24px" />
            <div className="space-y-3">
              <Skeleton width="100%" height="16px" />
              <Skeleton width="90%" height="16px" />
              <Skeleton width="95%" height="16px" />
            </div>
            
            {/* Resources */}
            <div className="space-y-3 pt-4">
              <Skeleton width="80px" height="20px" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width="24px" height="24px" rounded="md" />
                    <Skeleton width="60%" height="16px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SkeletonCard>

        {/* Submissions/Actions */}
        <SkeletonCard padding="lg">
          <div className="space-y-6">
            <Skeleton width="100px" height="24px" />
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8">
              <div className="text-center space-y-4">
                <Skeleton width="60px" height="60px" rounded="lg" className="mx-auto" />
                <Skeleton width="200px" height="16px" className="mx-auto" />
                <Skeleton width="150px" height="40px" rounded="lg" className="mx-auto" />
              </div>
            </div>

            {/* Submission History */}
            <div className="space-y-4">
              <Skeleton width="150px" height="20px" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Skeleton width="32px" height="32px" rounded="md" />
                      <div className="space-y-1">
                        <Skeleton width="120px" height="16px" />
                        <Skeleton width="80px" height="14px" />
                      </div>
                    </div>
                    <Skeleton width="60px" height="32px" rounded="md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SkeletonCard>
      </div>

      {/* Additional Info */}
      <SkeletonCard padding="lg">
        <div className="space-y-4">
          <Skeleton width="180px" height="20px" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton width="40px" height="40px" rounded="full" />
              <div className="space-y-1">
                <Skeleton width="100px" height="16px" />
                <Skeleton width="80px" height="14px" />
              </div>
            </div>
            <Skeleton width="120px" height="36px" rounded="lg" />
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
};

export default AssignmentDetailsSkeleton;