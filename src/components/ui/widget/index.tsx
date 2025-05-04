
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import WidgetHeader from './widget-header';
import WidgetContent from './widget-content';
import WidgetFooter from './widget-footer';
import { getVariantClasses, getElevationClasses } from './utils';
import { WidgetProps } from './types';

const Widget: React.FC<WidgetProps> = ({
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
}) => {
  // Get variant and elevation classes
  const variantClasses = getVariantClasses(variant);
  const elevationClasses = getElevationClasses(elevation);
  
  // Header background image overlay
  const headerOverlay = headerBackgroundImage ? 
    "after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/60 after:to-black/40 after:z-0 after:rounded-t-lg" : "";
  
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
      <WidgetHeader
        title={title}
        description={description}
        icon={icon}
        actions={actions}
        isLoading={isLoading}
        headerClassName={headerClassName}
        size={size}
        variant={variant}
        headerBackgroundImage={headerBackgroundImage}
        badge={badge}
      />
      
      <WidgetContent
        isLoading={isLoading}
        contextHelp={contextHelp}
        contentClassName={contentClassName}
        size={size}
      >
        {children}
      </WidgetContent>
      
      {footer && <WidgetFooter footer={footer} size={size} />}
    </Card>
  );
};

export default Widget;
