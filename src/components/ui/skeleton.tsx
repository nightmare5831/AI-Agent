'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative rounded-md bg-muted',
        {
          'overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent':
            shimmer,
          'animate-pulse': !shimmer,
        },
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
