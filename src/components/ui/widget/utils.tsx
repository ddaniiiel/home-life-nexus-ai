
import { WidgetVariant, WidgetElevation } from './types';

export const getVariantClasses = (variant: WidgetVariant): string => {
  const variantClasses = {
    primary: "border-blue-200 dark:border-blue-800",
    secondary: "border-green-200 dark:border-green-800",
    accent: "border-homepilot-accent dark:border-homepilot-accent/50",
    warning: "border-yellow-200 dark:border-yellow-800",
    success: "border-emerald-200 dark:border-emerald-800",
    default: "border-gray-200 dark:border-gray-700"
  };
  
  return variantClasses[variant];
};

export const getElevationClasses = (elevation: WidgetElevation): string => {
  const elevationClasses = {
    none: "",
    xs: "shadow-xs hover:shadow-xs",
    sm: "shadow-sm hover:shadow",
    md: "shadow hover:shadow-md",
    lg: "shadow-md hover:shadow-lg"
  };
  
  return elevationClasses[elevation];
};
