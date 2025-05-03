
/**
 * Utility functions for image optimization and loading
 */

// Format image URL to use WebP format if supported
export function getOptimizedImageUrl(url: string): string {
  if (!url) return '';
  
  // Check if it's an unsplash image and add optimization parameters
  if (url.includes('unsplash.com')) {
    // Add WebP format and resize parameters
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}fm=webp&q=80&w=800`;
  }
  
  return url;
}

// Helper to determine if an element is in the viewport
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
