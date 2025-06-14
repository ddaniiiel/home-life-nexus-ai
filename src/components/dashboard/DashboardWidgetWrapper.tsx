
import React from 'react';
import { LazyComponent } from '@/components/performance/LazyComponent';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardWidgetWrapperProps {
  children: React.ReactNode;
  fallbackClassName?: string; // e.g., "h-96" or "h-[400px]"
  skeletonClassName?: string; // e.g., "w-[95%] h-[90%]"
}

const DashboardWidgetWrapper: React.FC<DashboardWidgetWrapperProps> = ({
  children,
  fallbackClassName = "h-96", // Default height
  skeletonClassName = "w-[95%] h-[90%]" // Default skeleton size
}) => {
  return (
    <div className="mb-6">
      <LazyComponent
        fallback={
          <div className={`w-full bg-card rounded-lg border animate-pulse flex items-center justify-center ${fallbackClassName}`}>
            <Skeleton className={skeletonClassName} />
          </div>
        }
      >
        {children}
      </LazyComponent>
    </div>
  );
};

export default DashboardWidgetWrapper;
