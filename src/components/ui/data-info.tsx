
import React from 'react';
import { cn } from '@/lib/utils';
import { Info, ExternalLink } from 'lucide-react';

interface DataSourceProps {
  source?: string;
  date?: string | Date;
  description?: string;
  url?: string;
  className?: string;
  variant?: 'small' | 'inline' | 'detailed';
  methodologyInfo?: string;
}

export function DataInfo({
  source,
  date,
  description,
  url,
  className,
  variant = 'small',
  methodologyInfo
}: DataSourceProps) {
  // Format date if it's a Date object
  const formattedDate = date instanceof Date 
    ? date.toLocaleDateString('de-DE', { year: 'numeric', month: 'short', day: 'numeric' }) 
    : date;
  
  // For "small" variant - minimal footprint
  if (variant === 'small') {
    return (
      <div className={cn(
        "text-xs text-gray-500 dark:text-gray-400 flex items-center",
        className
      )}>
        {source && <span className="font-medium mr-1">{source}</span>}
        {formattedDate && (
          <span className="before:content-['•'] before:mx-1 before:text-gray-400">{formattedDate}</span>
        )}
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center text-homepilot-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3 ml-0.5" />
            <span className="sr-only">Externe Quelle</span>
          </a>
        )}
      </div>
    );
  }
  
  // For "inline" variant - fits within text flow
  if (variant === 'inline') {
    return (
      <span className={cn(
        "text-sm text-gray-600 dark:text-gray-300 inline-flex items-center",
        className
      )}>
        <Info className="h-3 w-3 mr-1 text-gray-400" />
        {source && <span className="font-medium">{source}</span>}
        {formattedDate && <span className="ml-1">({formattedDate})</span>}
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center text-homepilot-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3 ml-0.5" />
          </a>
        )}
      </span>
    );
  }
  
  // For "detailed" variant - complete information
  return (
    <div className={cn(
      "p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-700",
      className
    )}>
      <div className="flex items-start">
        <Info className="h-4 w-4 mt-0.5 mr-2 text-homepilot-primary flex-shrink-0" />
        <div>
          <div className="flex items-center flex-wrap gap-x-2">
            {source && (
              <span className="font-medium">
                {source}
              </span>
            )}
            {formattedDate && (
              <span className="text-sm text-gray-500">
                Stand: {formattedDate}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
          
          {methodologyInfo && (
            <details className="mt-2">
              <summary className="text-xs cursor-pointer text-homepilot-primary hover:underline">
                Methodik & Hinweise
              </summary>
              <div className="mt-2 text-xs p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                {methodologyInfo}
              </div>
            </details>
          )}
          
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 text-xs inline-flex items-center text-homepilot-primary hover:underline"
            >
              Zur Quelle
              <ExternalLink className="h-3 w-3 ml-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataInfo;
