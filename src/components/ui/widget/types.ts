
import { ReactNode } from 'react';

export interface WidgetProps {
  title: string;
  description?: string | ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  isLoading?: boolean;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  actions?: ReactNode;
  onClick?: () => void;
  isInteractive?: boolean;
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive';
  };
  headerBackgroundImage?: string;
  contextHelp?: string | ReactNode;
}

export type WidgetSize = 'sm' | 'md' | 'lg';
export type WidgetVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
export type WidgetElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg';
