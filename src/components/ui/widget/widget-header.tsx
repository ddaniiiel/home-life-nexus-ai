
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from "@/lib/utils";
import { WidgetSize, WidgetVariant } from './types';

interface WidgetHeaderProps {
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  isLoading?: boolean;
  headerClassName?: string;
  size: WidgetSize;
  variant?: WidgetVariant;
  headerBackgroundImage?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive';
  };
  className?: string; // Hinzugefügt, um das Problem zu beheben
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  description,
  icon,
  actions,
  isLoading,
  headerClassName,
  size,
  variant = 'default',
  headerBackgroundImage,
  badge,
  className, // Hinzugefügt, um das Problem zu beheben
}) => {
  // Size-based classes
  const sizeClasses = {
    sm: { header: "pb-2 px-3 pt-3", iconSize: "p-1 text-sm" },
    md: { header: "pb-2 px-5 pt-4", iconSize: "p-1.5 text-base" },
    lg: { header: "pb-3 px-6 pt-5", iconSize: "p-2 text-lg" }
  }[size];
  
  // Variant-based classes
  const headerVariantClasses = {
    primary: "bg-blue-50 dark:bg-blue-900/20",
    secondary: "bg-green-50 dark:bg-green-900/20",
    accent: "bg-homepilot-accent/10 dark:bg-homepilot-accent/5",
    warning: "bg-yellow-50 dark:bg-yellow-900/20",
    success: "bg-emerald-50 dark:bg-emerald-900/20",
    default: ""
  }[variant];
  
  const iconVariantClasses = {
    primary: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    secondary: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    accent: "bg-homepilot-accent/20 text-homepilot-primary dark:bg-homepilot-accent/10 dark:text-homepilot-accent",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
  }[variant];
  
  // Header background image styles
  const headerWithBgImage = headerBackgroundImage ? {
    backgroundImage: `url(${headerBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: 'white',
    padding: '2rem',
    borderTopLeftRadius: 'var(--radius)',
    borderTopRightRadius: 'var(--radius)',
  } as React.CSSProperties : {};
  
  // Overlay for background image header
  const headerOverlay = headerBackgroundImage ? 
    "after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/60 after:to-black/40 after:z-0 after:rounded-t-lg" : "";
  
  return (
    <CardHeader 
      className={cn(
        sizeClasses.header,
        headerVariantClasses,
        actions && "flex-row justify-between items-start",
        headerBackgroundImage && "relative z-10 text-white",
        headerOverlay,
        headerClassName,
        className // Hinzugefügt, um das Problem zu beheben
      )}
      style={headerWithBgImage}
    >
      <div className={cn(
        "flex items-center relative z-10",
        actions && "flex-1"
      )}>
        {icon && !isLoading && (
          <div className={cn(
            "mr-2 rounded-full",
            sizeClasses.iconSize,
            headerBackgroundImage ? "bg-white/20 text-white" : iconVariantClasses
          )}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <CardTitle className={cn(
                "text-lg leading-tight",
                size === 'sm' && "text-base", 
                size === 'lg' && "text-xl"
              )}>
                {title}
              </CardTitle>
            )}
            
            {badge && !isLoading && (
              <Badge 
                variant={badge.variant === 'primary' ? 'default' : badge.variant} 
                className="ml-2"
              >
                {badge.text}
              </Badge>
            )}
          </div>
          
          {description && !isLoading && (
            <CardDescription className={cn(
              "text-sm mt-1",
              headerBackgroundImage ? "text-white/80" : "text-muted-foreground"
            )}>
              {description}
            </CardDescription>
          )}
          {description && isLoading && (
            <Skeleton className="h-4 w-2/3 mt-1" />
          )}
        </div>
      </div>
      
      {actions && !isLoading && (
        <div className="shrink-0 ml-4 relative z-10">
          {actions}
        </div>
      )}
    </CardHeader>
  );
};

export default WidgetHeader;
