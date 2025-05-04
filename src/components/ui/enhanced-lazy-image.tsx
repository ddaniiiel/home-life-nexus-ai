
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl, getOptimalImageWidth } from "@/lib/image-utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface EnhancedLazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  width?: number | string;
  priority?: boolean;
  position?: 'hero' | 'above-fold' | 'thumbnail' | 'background' | string;
  fallback?: React.ReactNode;
  aspectRatio?: string; // Format: "16/9", "4/3", "1/1", etc.
  animation?: 'fade' | 'scale' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const EnhancedLazyImage = ({ 
  src, 
  alt, 
  className, 
  containerClassName,
  placeholder = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=50&q=20&blur=15', 
  width,
  priority = false,
  position = 'thumbnail',
  fallback,
  aspectRatio,
  animation = 'fade',
  rounded = 'none',
  ...props 
}: EnhancedLazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Berechne optimierte Bildbreite und URL
  const containerWidth = width || (containerRef.current?.clientWidth || 800);
  const optimizedWidth = getOptimalImageWidth(containerWidth);
  const optimizedSrc = src ? getOptimizedImageUrl(src, { width: optimizedWidth }) : placeholder;
  const optimizedPlaceholder = placeholder ? getOptimizedImageUrl(placeholder, { width: 50, quality: 20 }) : undefined;
  
  // Bestimme, ob das Bild sofort oder lazy geladen werden soll
  const shouldPrioritize = priority || position === 'hero' || position === 'above-fold';
  
  // Einrichten des Intersection Observers
  useEffect(() => {
    if (shouldPrioritize) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Laden Sie Bilder früher (200px vor dem Viewport)
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [shouldPrioritize]);
  
  // Berechne dynamische Stile für das Aspectratio-Verhältnis
  const aspectRatioStyle = aspectRatio ? { 
    aspectRatio, 
    objectFit: 'cover' as const
  } : {};

  // Rounded-Corners Klassen
  const roundedClasses = {
    none: "",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  
  // Animation-Klassen
  const getAnimationClasses = () => {
    if (animation === 'fade') {
      return isLoaded ? "opacity-100" : "opacity-0";
    } else if (animation === 'scale') {
      return isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95";
    }
    return "";
  };
  
  // Rendert ein Fallback, wenn das Bild nicht geladen werden kann
  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden", 
        roundedClasses[rounded],
        containerClassName
      )} 
      style={{ width: '100%', height: '100%', ...aspectRatioStyle }}
    >
      {!isLoaded && !error && (
        <>
          {optimizedPlaceholder ? (
            <img
              src={optimizedPlaceholder}
              alt="Loading placeholder"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 scale-105 blur-sm",
                roundedClasses[rounded],
                className
              )}
              loading="eager"
              style={aspectRatioStyle}
            />
          ) : (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
        </>
      )}
      <img
        ref={imgRef}
        src={isInView || shouldPrioritize ? optimizedSrc : placeholder}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          getAnimationClasses(),
          roundedClasses[rounded],
          animation === 'scale' && "transform",
          className
        )}
        style={aspectRatioStyle}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={shouldPrioritize ? "eager" : "lazy"}
        {...props}
      />

      {/* Overlay-Schatteneffekt für Text-Lesbarkeit bei Verwendung als Hintergrund */}
      {position === 'background' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
