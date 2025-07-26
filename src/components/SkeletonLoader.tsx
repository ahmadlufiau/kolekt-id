import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

export const CategorySkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <Skeleton className="w-16 h-16 rounded-full mb-3" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <div className="flex items-center mb-2">
          <Skeleton className="h-4 w-16 mr-2" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
            <section className="relative bg-[#0A2647] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4 bg-white/20" />
                <Skeleton className="h-12 w-1/2 bg-white/20" />
              </div>
              <Skeleton className="h-6 w-full bg-white/20" />
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 w-32 bg-white/30 rounded-lg" />
                <Skeleton className="h-12 w-32 bg-white/20 rounded-lg" />
              </div>
            </div>
            <div className="relative">
              <Skeleton className="w-full h-64 md:h-80 bg-white/20 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionHeaderSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  );
};