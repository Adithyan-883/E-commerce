import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      {/* Image Skeleton */}
      <div className="h-48 w-full rounded-2xl bg-gray-200"></div>
      
      {/* Title Skeleton */}
      <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
      
      {/* Description Skeleton */}
      <div className="h-4 w-full rounded-md bg-gray-200"></div>
      <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
      
      {/* Price and Button Skeleton */}
      <div className="flex items-center justify-between pt-4">
        <div className="h-6 w-1/4 rounded-md bg-gray-200"></div>
        <div className="h-10 w-24 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};
