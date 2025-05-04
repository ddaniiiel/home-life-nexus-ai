
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export interface WidgetProps {
  title: string;
  description?: string | ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  isLoading?: boolean;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  actions?: ReactNode;
  onClick?: () => void;
  isInteractive?: boolean;
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive';
  };
  headerBackgroundImage?: string;
  contextHelp?: string | ReactNode;
}

const Widget = ({ 
  title, 
  description, 
  icon, 
  children, 
  variant = 'default',
  className,
  headerClassName,
  contentClassName,
  isLoading = false,
  footer,
  size = 'md',
  actions,
  onClick,
  isInteractive = false,
  elevation = 'sm',
  badge,
  headerBackgroundImage,
  contextHelp
}: WidgetProps) => {
  // Standardisierte Abstandswerte für verschiedene Größen
  const sizeClasses = {
    sm: {
      header: "pb-2 px-3 pt-3", 
      content: "p-3",
      iconSize: "p-1 text-sm"
    },
    md: {
      header: "pb-2 px-5 pt-4", 
      content: "p-5 pt-3",
      iconSize: "p-1.5 text-base"
    },
    lg: {
      header: "pb-3 px-6 pt-5", 
      content: "p-6 pt-4",
      iconSize: "p-2 text-lg"
    }
  }[size];
  
  // Varianten-basierte Styles für konsistentes Farbschema
  const variantClasses = {
    primary: "border-blue-200 dark:border-blue-800",
    secondary: "border-green-200 dark:border-green-800",
    accent: "border-homepilot-accent dark:border-homepilot-accent/50",
    warning: "border-yellow-200 dark:border-yellow-800",
    success: "border-emerald-200 dark:border-emerald-800",
    default: "border-gray-200 dark:border-gray-700"
  }[variant];
  
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
  
  const elevationClasses = {
    none: "",
    xs: "shadow-xs hover:shadow-xs",
    sm: "shadow-sm hover:shadow",
    md: "shadow hover:shadow-md",
    lg: "shadow-md hover:shadow-lg"
  }[elevation];
  
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

  // Overlay für Hintergrundbild-Header
  const headerOverlay = headerBackgroundImage ? 
    "after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/60 after:to-black/40 after:z-0 after:rounded-t-lg" : "";

  const CardHeaderComponent = () => (
    <CardHeader 
      className={cn(
        sizeClasses.header,
        headerVariantClasses,
        actions && "flex-row justify-between items-start",
        headerBackgroundImage && "relative z-10 text-white",
        headerClassName
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
              <Badge variant={badge.variant || "default"} className="ml-2">
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
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border transition-all duration-200",
        variantClasses,
        elevationClasses,
        headerBackgroundImage && headerOverlay,
        isInteractive && "cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
        className
      )}
      onClick={isInteractive ? onClick : undefined}
    >
      <CardHeaderComponent />
      
      <CardContent className={cn(
        sizeClasses.content,
        contentClassName
      )}>
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
      
      {footer && (
        <CardFooter className={cn(
          "px-5 pb-4 pt-2 border-t border-border",
          size === 'sm' && "px-3 py-2", 
          size === 'lg' && "px-6 py-3"
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default Widget;
