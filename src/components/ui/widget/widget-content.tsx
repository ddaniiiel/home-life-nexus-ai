
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from "@/lib/utils";
import { WidgetSize } from './types';

interface WidgetContentProps {
  children: React.ReactNode;
  isLoading?: boolean;
  contextHelp?: React.ReactNode;
  contentClassName?: string;
  size: WidgetSize;
}

const WidgetContent: React.FC<WidgetContentProps> = ({
  children,
  isLoading,
  contextHelp,
  contentClassName,
  size
}) => {
  // Size-based classes
  const sizeClasses = {
    sm: "p-3",
    md: "p-5 pt-3",
    lg: "p-6 pt-4"
  }[size];
  
  return (
    <CardContent className={cn(sizeClasses, contentClassName)}>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : (
        <>
          {children}
          
          {contextHelp && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-md text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-homepilot-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <div className="ml-2">{contextHelp}</div>
              </div>
            </div>
          )}
        </>
      )}
    </CardContent>
  );
};

export default WidgetContent;
