
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from "@/lib/utils";
import { WidgetProps } from './types';
import { getVariantClasses, getElevationClasses } from './utils';
import WidgetHeader from './widget-header';
import WidgetContent from './widget-content';
import WidgetFooter from './widget-footer';
import WidgetWithImage from './widget-with-image';

const Widget: React.FC<WidgetProps> = (props) => {
  const {
    title,
    description,
    icon,
    children,
    footer,
    isLoading = false,
    className,
    variant = 'default',
    size = 'md',
    elevation = 'sm',
    headerClassName,
    contentClassName,
    footerClassName,
    backgroundImage,
  } = props;

  // Wenn ein Hintergrundbild vorhanden ist, verwende die erweiterte Widget-Komponente
  if (backgroundImage) {
    return <WidgetWithImage {...props} />;
  }

  // Bestimme die Klassen basierend auf Variante und Elevation
  const variantClasses = getVariantClasses(variant);
  const elevationClasses = getElevationClasses(elevation);
  
  const cardClasses = cn(
    "rounded-lg border",
    variantClasses,
    elevationClasses,
    className
  );

  if (isLoading) {
    return (
      <Card className={cardClasses}>
        <div className={cn("p-5", size === 'sm' ? 'p-3' : size === 'lg' ? 'p-6' : 'p-5')}>
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cardClasses}>
      {(title || description || icon) && (
        <WidgetHeader 
          title={title} 
          description={description} 
          icon={icon} 
          size={size} 
          className={headerClassName} 
        />
      )}
      <WidgetContent size={size} className={contentClassName}>
        {children}
      </WidgetContent>
      {footer && (
        <WidgetFooter footer={footer} size={size} className={footerClassName} />
      )}
    </Card>
  );
};

export default Widget;
