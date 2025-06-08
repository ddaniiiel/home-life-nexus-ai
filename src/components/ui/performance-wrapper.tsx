
import React, { memo } from 'react';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  shouldUpdate?: (prevProps: any, nextProps: any) => boolean;
}

// Memoized wrapper für schwere Komponenten
export const PerformanceWrapper = memo<PerformanceWrapperProps>(({ children }) => {
  return <>{children}</>;
});

PerformanceWrapper.displayName = 'PerformanceWrapper';

// Custom Hook für Image Preloading
export const useImagePreloader = (imageUrls: string[]) => {
  React.useEffect(() => {
    const preloadImages = (urls: string[]) => {
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    if (imageUrls.length > 0) {
      // Preload images after a small delay to not block initial render
      const timeoutId = setTimeout(() => {
        preloadImages(imageUrls);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [imageUrls]);
};
