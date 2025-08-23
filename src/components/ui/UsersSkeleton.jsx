import React from "react";
import { Skeleton, SkeletonCard } from "./Skeleton";

export const UserCardSkeleton = () => {
  return (
    <SkeletonCard className="text-center">
      <div className="flex flex-col items-center space-y-4 p-6">
        {/* Profile Image */}
        <Skeleton width="80px" height="80px" rounded="full" />
        
        {/* User Info */}
        <div className="space-y-2 w-full">
          <Skeleton width="60%" height="20px" className="mx-auto" />
          <Skeleton width="40%" height="16px" className="mx-auto" />
          <Skeleton width="50%" height="14px" className="mx-auto" />
        </div>
        
        {/* Status Badge */}
        <Skeleton width="80px" height="24px" rounded="full" className="mx-auto" />
        
        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Skeleton width="50%" height="36px" rounded="md" />
          <Skeleton width="50%" height="36px" rounded="md" />
        </div>
      </div>
    </SkeletonCard>
  );
};

export const UsersHeaderSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Title */}
        <Skeleton width="150px" height="32px" />
        
        {/* Stats */}
        <div className="flex items-center gap-2">
          <Skeleton width="120px" height="16px" />
        </div>
        
        {/* Search */}
        <div className="w-full md:w-64">
          <Skeleton width="100%" height="48px" rounded="lg" />
        </div>
      </div>
    </div>
  );
};

export const UsersSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <UsersHeaderSkeleton />

      {/* Users Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <SkeletonCard className="bg-[var(--color-surface)]/50" padding="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton width="180px" height="16px" />
          <div className="flex items-center gap-2">
            <Skeleton width="80px" height="36px" rounded="md" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
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

export default UsersSkeleton;