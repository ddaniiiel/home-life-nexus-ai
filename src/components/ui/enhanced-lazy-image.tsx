
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl, getOptimalImageWidth } from "@/lib/image-utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  quality?: number; // Image quality (1-100)
  overlay?: boolean | 'light' | 'medium' | 'dark'; // Optional overlay for text readability
  caption?: string; // Optional image caption
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
  quality = 80,
  overlay = false,
  caption,
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
  const optimizedSrc = src ? getOptimizedImageUrl(src, { width: optimizedWidth, quality }) : placeholder;
  const optimizedPlaceholder = placeholder ? getOptimizedImageUrl(placeholder, { width: 50, quality: 20 }) : undefined;
  
  // Bestimme, ob das Bild sofort oder lazy geladen werden soll
  const shouldPrioritize = priority || position === 'hero' || position === 'above-fold';
  
  // Verbesserte Einrichtung des Intersection Observers mit Threshold-Optionen
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
      { 
        threshold: [0.1, 0.5], // Ein Bild wird geladen, wenn es 10% oder 50% sichtbar ist
        rootMargin: '200px' // Laden Sie Bilder früher (200px vor dem Viewport)
      }
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
  
  // Verwende AspectRatio für konsistentes Layout, wenn angegeben
  const useAspectRatio = !!aspectRatio;
  
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
  
  // Overlay-Stile für bessere Lesbarkeit von Text auf Bildern
  const getOverlayClass = () => {
    if (!overlay) return "";
    
    if (overlay === 'light') {
      return "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent after:pointer-events-none";
    } else if (overlay === 'medium') {
      return "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none";
    } else if (overlay === 'dark') {
      return "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/70 after:to-black/10 after:pointer-events-none";
    }
    
    // Default overlay (wenn overlay === true)
    return "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/60 after:to-transparent after:pointer-events-none";
  };
  
  // Rendert ein Fallback, wenn das Bild nicht geladen werden kann
  if (error && fallback) {
    return <>{fallback}</>;
  }

  const imageContent = (
    <>
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
              style={useAspectRatio ? { objectFit: 'cover' } : {}}
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
        style={useAspectRatio ? { objectFit: 'cover' } : {}}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={shouldPrioritize ? "eager" : "lazy"}
        {...props}
      />

      {/* Dynamischer Overlay-Effekt für Text-Lesbarkeit */}
      {position === 'background' || overlay ? (
        <div className={cn(
          "absolute inset-0 pointer-events-none",
          position === 'background' && !overlay && "bg-gradient-to-t from-black/60 to-transparent"
        )} />
      ) : null}
    </>
  );

  // Container mit oder ohne AspectRatio
  const containerElement = (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden", 
        roundedClasses[rounded],
        getOverlayClass(),
        containerClassName
      )} 
      style={!useAspectRatio ? { width: '100%', height: '100%' } : {}}
    >
      {imageContent}
      
      {/* Optional: Bildunterschrift */}
      {caption && isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
          {caption}
        </div>
      )}
    </div>
  );

  // Entscheide, ob AspectRatio verwendet werden soll
  if (useAspectRatio) {
    return (
      <div className={cn("w-full", containerClassName)}>
        <AspectRatio ratio={Number(aspectRatio.split('/')[0]) / Number(aspectRatio.split('/')[1])}>
          {containerElement}
        </AspectRatio>
      </div>
    );
  }

  return containerElement;
};
