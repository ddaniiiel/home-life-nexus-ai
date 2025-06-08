
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient';
  hover?: boolean;
  children: React.ReactNode;
}

export const EnhancedCard = ({
  title,
  description,
  footer,
  variant = 'default',
  hover = true,
  className,
  children,
  ...props
}: EnhancedCardProps) => {
  const variants = {
    default: 'border bg-card text-card-foreground shadow-sm',
    elevated: 'border-0 shadow-lg bg-card text-card-foreground',
    bordered: 'border-2 border-primary/20 bg-card text-card-foreground shadow-sm',
    gradient: 'border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md'
  };

  const hoverEffect = hover ? 'hover:shadow-md transition-all duration-200 hover:-translate-y-1' : '';

  return (
    <Card 
      className={cn(
        'rounded-lg overflow-hidden',
        variants[variant],
        hoverEffect,
        className
      )}
      {...props}
    >
      {(title || description) && (
        <CardHeader className="pb-3">
          {title && <CardTitle className="text-lg font-semibold">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      <CardContent className={cn(title || description ? 'pt-0' : 'pt-6')}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="pt-3 border-t border-border/50">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
