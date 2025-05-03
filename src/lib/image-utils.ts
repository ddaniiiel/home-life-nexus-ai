
/**
 * Utility functions for image optimization and loading
 */

// Bildformate, die WebP unterstützen
const supportedWebpBrowsers = ['chrome', 'firefox', 'edge', 'opera', 'safari'];

/**
 * Überprüft, ob der aktuelle Browser WebP unterstützt
 * Verwendet Feature-Detection, falls verfügbar, oder fällt auf User-Agent-Prüfung zurück
 */
export function isWebpSupported(): boolean {
  // Feature-Detection für WebP
  if (typeof document !== 'undefined') {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      // Der Browser unterstützt Canvas, überprüfe ob toDataURL WebP unterstützt
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  }
  
  // Fallback: Überprüfe User-Agent
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    const ua = navigator.userAgent.toLowerCase();
    return supportedWebpBrowsers.some(browser => ua.includes(browser));
  }
  
  // Standard: Konservativ, lieber auf der sicheren Seite sein
  return false;
}

// Format image URL to use WebP format if supported
export function getOptimizedImageUrl(url: string, options: { width?: number; quality?: number } = {}): string {
  if (!url) return '';
  
  const { width = 800, quality = 80 } = options;
  const webpSupported = isWebpSupported();
  
  // Check if it's an unsplash image and add optimization parameters
  if (url.includes('unsplash.com')) {
    // Add WebP format and resize parameters
    const separator = url.includes('?') ? '&' : '?';
    const format = webpSupported ? 'webp' : 'auto';
    return `${url}${separator}fm=${format}&q=${quality}&w=${width}`;
  }
  
  // Für andere Bildtypen (lokale Assets)
  if (webpSupported && !url.includes('.svg') && !url.includes('.gif')) {
    // Für lokale Bilder, die nicht SVG oder GIF sind, füge .webp-Erweiterung hinzu
    // Nur anwenden, wenn es ein bildformat zu sein scheint
    if (/\.(jpe?g|png|bmp)$/i.test(url)) {
      return url.replace(/\.(jpe?g|png|bmp)$/i, '.webp');
    }
  }
  
  return url;
}

/**
 * Bestimmt die optimale Bildgröße basierend auf dem Viewport und der Containerbreite
 * @param containerWidth Die Breite des Containers in Pixeln oder als Prozentsatz der Viewportbreite
 * @returns Die optimierte Bildbreite
 */
export function getOptimalImageWidth(containerWidth: number | string): number {
  // Standard-Breite für Fallbacks
  const defaultWidth = 800;
  
  // Wenn keine Containerbreite angegeben ist
  if (!containerWidth) return defaultWidth;
  
  // Berechne die aktuelle Viewport-Breite
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  
  // Wenn containerWidth ein String ist, behandle es als Prozentsatz
  if (typeof containerWidth === 'string') {
    const percentage = parseInt(containerWidth.replace('%', ''), 10);
    if (isNaN(percentage)) return defaultWidth;
    return Math.round((viewportWidth * percentage) / 100);
  }
  
  // Für bereits berechnete Pixelwerte
  return containerWidth;
}

// Helper to determine if an element is in the viewport
export function isInViewport(element: HTMLElement, threshold = 0): boolean {
  if (!element) return false;
  
  // Verwende IntersectionObserver API, wenn verfügbar
  if (typeof IntersectionObserver !== 'undefined' && element) {
    return new Promise<boolean>(resolve => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          resolve(entry.isIntersecting);
          observer.disconnect();
        },
        { threshold }
      );
      observer.observe(element);
    }) as unknown as boolean;
  }
  
  // Fallback zur rect-Berechnung
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Bestimmt die Priorität eines Bildes basierend auf seiner Position
 * @param position Position des Bildes (z.B. 'hero', 'thumbnail', 'background')
 * @returns True, wenn das Bild mit hoher Priorität geladen werden soll
 */
export function shouldPrioritizeImage(position: 'hero' | 'above-fold' | 'thumbnail' | 'background' | string): boolean {
  switch (position) {
    case 'hero':
    case 'above-fold':
      return true;
    case 'thumbnail':
    case 'background':
    default:
      return false;
  }
}
