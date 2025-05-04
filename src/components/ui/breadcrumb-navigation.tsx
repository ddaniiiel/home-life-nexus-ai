
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbNavigationProps {
  items?: BreadcrumbItem[];
  className?: string;
  homeLink?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
}

export function BreadcrumbNavigation({
  items = [],
  className,
  homeLink = '/',
  showHome = true,
  separator = <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />,
}: BreadcrumbNavigationProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Generate breadcrumbs from the current path if no items are provided
  const breadcrumbItems: BreadcrumbItem[] = items.length 
    ? items 
    : pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        // Capitalize segment and replace hyphens with spaces
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { label, link: path };
      });

  return (
    <nav className={cn("flex items-center text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {showHome && (
          <li className="flex items-center">
            <Link 
              to={homeLink}
              className="flex items-center text-gray-500 hover:text-homepilot-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Start</span>
            </Link>
            {(breadcrumbItems.length > 0) && separator}
          </li>
        )}
        
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const ItemContent = () => (
            <>
              {item.icon && (
                <span className="mr-1.5">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </>
          );
          
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-homepilot-secondary">
                  <ItemContent />
                </span>
              ) : (
                <>
                  <Link 
                    to={item.link || '#'} 
                    className="text-gray-500 hover:text-homepilot-primary transition-colors"
                  >
                    <ItemContent />
                  </Link>
                  {separator}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadcrumbNavigation;
