
export type WidgetSize = 'sm' | 'md' | 'lg';
export type WidgetVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
export type WidgetElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export interface WidgetProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  variant?: WidgetVariant;
  size?: WidgetSize;
  elevation?: WidgetElevation;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backgroundImage?: string; // Neue Prop für Hintergrundbild
  imageOverlay?: boolean | 'light' | 'medium' | 'dark'; // Overlay-Stärke für bessere Textlesbarkeit
  imagePosition?: 'top' | 'full'; // Position des Bildes: nur oben oder voller Hintergrund
  imagePriority?: boolean; // Ob das Bild mit hoher Priorität geladen werden soll
}
