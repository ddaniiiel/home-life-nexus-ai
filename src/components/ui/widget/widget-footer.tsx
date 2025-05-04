
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { WidgetSize } from './types';

interface WidgetFooterProps {
  footer: React.ReactNode;
  size: WidgetSize;
}

const WidgetFooter: React.FC<WidgetFooterProps> = ({ footer, size }) => {
  const sizeClasses = {
    sm: "px-3 py-2",
    md: "px-5 pb-4 pt-2",
    lg: "px-6 py-3"
  }[size];
  
  return (
    <CardFooter className={cn(
      sizeClasses,
      "border-t border-border"
    )}>
      {footer}
    </CardFooter>
  );
};

export default WidgetFooter;
