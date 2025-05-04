
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EnhancedLazyImage, EnhancedLazyImageProps } from '@/components/ui/enhanced-lazy-image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imageProps?: Partial<EnhancedLazyImageProps>;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  aspectRatio?: string;
  variant?: 'default' | 'compact' | 'overlay' | 'horizontal';
}

export function ImageCard({
  title,
  description,
  image,
  imageAlt = "Card image",
  imageProps,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  badge,
  aspectRatio = "16/9",
  variant = 'default',
  ...props
}: ImageCardProps) {
  // Check if using overlay variant (text over image)
  const isOverlay = variant === 'overlay';
  const isHorizontal = variant === 'horizontal';
  const isCompact = variant === 'compact';
  
  // For overlay cards, we want to position the content over the image
  const overlayContent = isOverlay && (
    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
      {badge && (
        <Badge variant={badge.variant || "default"} className="mb-2 self-start">
          {badge.text}
        </Badge>
      )}
      {title && <h3 className="text-xl font-semibold mb-1.5">{title}</h3>}
      {description && <div className="text-sm text-white/80">{description}</div>}
    </div>
  );
  
  // For horizontal layout
  if (isHorizontal) {
    return (
      <Card className={cn("overflow-hidden", className)} {...props}>
        <div className="flex flex-col sm:flex-row">
          {image && (
            <div className="sm:w-1/3 flex-none">
              <EnhancedLazyImage
                src={image}
                alt={imageAlt}
                aspectRatio="1/1"
                className="h-full"
                {...imageProps}
              />
            </div>
          )}
          <div className="sm:w-2/3 flex flex-col">
            <CardHeader className={cn(isCompact ? "p-3" : "p-6", headerClassName)}>
              {badge && (
                <Badge variant={badge.variant || "default"} className="mb-2 self-start">
                  {badge.text}
                </Badge>
              )}
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            {props.children && (
              <CardContent className={cn(isCompact ? "p-3 pt-0" : "p-6 pt-0", contentClassName)}>
                {props.children}
              </CardContent>
            )}
            {footer && (
              <CardFooter className={cn("mt-auto", isCompact ? "p-3 pt-2" : "p-6 pt-3", footerClassName)}>
                {footer}
              </CardFooter>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      {image && (
        <div className="relative">
          <EnhancedLazyImage
            src={image}
            alt={imageAlt}
            aspectRatio={aspectRatio}
            animation="fade"
            className={cn(isCompact ? "rounded-none" : "rounded-t-lg")}
            {...imageProps}
          />
          {overlayContent}
        </div>
      )}
      
      {!isOverlay && (
        <>
          <CardHeader className={cn(isCompact ? "p-3" : "p-6", headerClassName)}>
            <div className="flex justify-between items-start">
              <div>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription className="mt-1.5">{description}</CardDescription>}
              </div>
              {badge && (
                <Badge variant={badge.variant || "default"}>
                  {badge.text}
                </Badge>
              )}
            </div>
          </CardHeader>
          {props.children && (
            <CardContent className={cn(isCompact ? "p-3 pt-0" : "p-6 pt-0", contentClassName)}>
              {props.children}
            </CardContent>
          )}
          {footer && (
            <CardFooter className={cn(isCompact ? "p-3" : "p-6", footerClassName)}>
              {footer}
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
}
