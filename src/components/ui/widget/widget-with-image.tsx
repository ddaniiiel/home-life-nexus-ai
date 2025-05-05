
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from "@/lib/utils";
import { getVariantClasses, getElevationClasses } from './utils';
import WidgetHeader from './widget-header';
import WidgetContent from './widget-content';
import WidgetFooter from './widget-footer';
import { WidgetProps } from './types';
import { EnhancedLazyImage } from '@/components/ui/enhanced-lazy-image';

const WidgetWithImage: React.FC<WidgetProps> = ({
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
  imageOverlay = 'medium',
  imagePosition = 'top',
  imagePriority = false,
}) => {
  // Bestimme die Klassen basierend auf Variante und Elevation
  const variantClasses = getVariantClasses(variant);
  const elevationClasses = getElevationClasses(elevation);

  // Bestimme, ob das Image als voller Hintergrund oder nur im oberen Bereich angezeigt wird
  const isFullBackgroundImage = imagePosition === 'full';
  
  // Wenn wir ein Bild haben, passe die Styling-Klassen an
  const cardClasses = cn(
    "rounded-lg border",
    variantClasses,
    elevationClasses,
    className,
    backgroundImage && "overflow-hidden",
    isFullBackgroundImage && "relative"
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

  // Wenn ein volles Hintergrundbild verwendet wird
  if (backgroundImage && isFullBackgroundImage) {
    return (
      <Card className={cardClasses}>
        <div className="absolute inset-0 z-0">
          <EnhancedLazyImage
            src={backgroundImage}
            alt={title || "Widget background"}
            className="w-full h-full object-cover"
            overlay={imageOverlay}
            priority={imagePriority}
          />
        </div>
        <div className="relative z-10">
          {(title || description || icon) && (
            <WidgetHeader 
              title={title} 
              description={description} 
              icon={icon} 
              size={size} 
              className={cn(
                "border-b-0 bg-transparent", 
                imageOverlay ? "text-white" : "",
                headerClassName
              )} 
            />
          )}
          <WidgetContent 
            size={size} 
            className={cn(
              "bg-transparent", 
              imageOverlay ? "text-white" : "",
              contentClassName
            )}
          >
            {children}
          </WidgetContent>
          {footer && (
            <WidgetFooter 
              footer={footer} 
              size={size}
              className={cn(
                "border-t border-white/20 bg-transparent", 
                imageOverlay ? "text-white" : "",
                footerClassName
              )}
            />
          )}
        </div>
      </Card>
    );
  }

  // Standard-Widget mit optionalem Bild am oberen Rand
  return (
    <Card className={cardClasses}>
      {backgroundImage && imagePosition === 'top' && (
        <div className="w-full h-40 overflow-hidden">
          <EnhancedLazyImage
            src={backgroundImage}
            alt={title || "Widget header image"}
            className="w-full h-full object-cover"
            overlay={imageOverlay}
            priority={imagePriority}
          />
        </div>
      )}
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

export default WidgetWithImage;
