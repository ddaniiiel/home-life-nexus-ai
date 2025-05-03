
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/image-utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=50&q=20&blur=15', 
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const optimizedSrc = getOptimizedImageUrl(src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
      {!isLoaded && (
        <img
          src={placeholder}
          alt="Loading placeholder"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-0" : "opacity-100",
            className
          )}
          loading="lazy"
        />
      )}
      <img
        ref={imgRef}
        src={isInView ? optimizedSrc : placeholder}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export { LazyImage };
