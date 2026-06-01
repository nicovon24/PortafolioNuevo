"use client";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-white/[0.04] ${className}`}
      aria-hidden="true"
    >
      <div className="skeleton-shimmer absolute inset-0" />
    </div>
  );
}
