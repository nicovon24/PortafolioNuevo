"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_20px_56px_rgba(0,0,0,0.22)]">
      <Skeleton className="h-[200px] w-full rounded-none rounded-t-3xl" />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-4/5 rounded-md" />
        <div className="flex gap-1.5 mt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <Skeleton className="h-8 flex-1 rounded-full" />
          <Skeleton className="h-8 flex-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}
