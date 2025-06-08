
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const LazyComponent = ({ 
  children, 
  fallback,
  className = "w-full h-32"
}: LazyComponentProps) => {
  const defaultFallback = (
    <div className={className}>
      <Skeleton className="w-full h-full" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Hook für Performance-Monitoring
export const usePerformanceMonitor = () => {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            // Type guard to ensure we have a PerformanceEventTiming entry
            const eventEntry = entry as PerformanceEventTiming;
            if (eventEntry.processingStart) {
              console.log('FID:', eventEntry.processingStart - eventEntry.startTime);
            }
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      
      return () => observer.disconnect();
    }
  }, []);
};
