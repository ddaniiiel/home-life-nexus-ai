
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface EnhancedSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  label?: string;
  description?: string;
  isLoading?: boolean;
  onLabel?: string;
  offLabel?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  showLabels?: boolean;
}

const EnhancedSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  EnhancedSwitchProps
>(({ 
  className, 
  size = 'md', 
  variant = 'default',
  label,
  description,
  isLoading = false,
  checked,
  onLabel,
  offLabel,
  labelPosition = 'right',
  showLabels = false,
  ...props 
}, ref) => {
  // Größe des Switches
  const sizeClasses = {
    sm: "h-4 w-8",
    md: "h-5 w-10",
    lg: "h-6 w-12"
  }[size];
  
  const thumbSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }[size];
  
  const translationDistance = {
    sm: "translate-x-4",
    md: "translate-x-5",
    lg: "translate-x-6"
  }[size];
  
  // Farbe des Switches basierend auf der Variante
  const variantClasses = {
    default: "bg-input data-[state=checked]:bg-primary",
    primary: "bg-blue-200 dark:bg-blue-900/50 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500",
    success: "bg-green-200 dark:bg-green-900/50 data-[state=checked]:bg-green-600 dark:data-[state=checked]:bg-green-500",
    warning: "bg-yellow-200 dark:bg-yellow-900/50 data-[state=checked]:bg-yellow-600 dark:data-[state=checked]:bg-yellow-500",
    danger: "bg-red-200 dark:bg-red-900/50 data-[state=checked]:bg-red-600 dark:data-[state=checked]:bg-red-500"
  }[variant];
  
  const variantLabelClasses = {
    default: "text-primary",
    primary: "text-blue-600 dark:text-blue-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    danger: "text-red-600 dark:text-red-400"
  }[variant];
  
  // Wrapper-Klasse für vertikales oder horizontales Layout
  const wrapperClasses = {
    left: "flex flex-row-reverse items-center justify-end gap-2",
    right: "flex items-center gap-2",
    top: "flex flex-col-reverse items-start gap-1.5",
    bottom: "flex flex-col items-start gap-1.5",
  }[labelPosition];
  
  const labelClasses = {
    left: "text-right",
    right: "text-left",
    top: "text-center self-center",
    bottom: "text-center self-center",
  }[labelPosition];
  
  // Der eigentliche Switch mit Labels
  const switchElement = (
    <SwitchPrimitives.Root
      className={cn(
        "peer relative rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-none",
        sizeClasses,
        variantClasses,
        isLoading && "opacity-70 cursor-wait",
        className
      )}
      checked={checked}
      disabled={isLoading || props.disabled}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5",
          thumbSizeClasses,
          `data-[state=checked]:${translationDistance}`,
          isLoading && "flex items-center justify-center"
        )}
      >
        {isLoading && (
          <Loader2 className={cn(
            "animate-spin",
            size === 'sm' && "h-2 w-2",
            size === 'md' && "h-3 w-3",
            size === 'lg' && "h-4 w-4"
          )} />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
  
  // Labels für An/Aus, wenn aktiviert
  const statusLabels = showLabels && (
    <div className={cn(
      "text-xs",
      labelPosition === 'top' || labelPosition === 'bottom' ? "w-full flex justify-center space-x-1 mt-1" : "flex space-x-1"
    )}>
      {checked ? (
        <span className={variantLabelClasses}>{onLabel || "An"}</span>
      ) : (
        <span className="text-muted-foreground">{offLabel || "Aus"}</span>
      )}
    </div>
  );
  
  // Wenn kein Label vorhanden ist, gib nur den Switch zurück
  if (!label) {
    return (
      <div className="inline-block">
        {switchElement}
        {statusLabels}
      </div>
    );
  }
  
  // Andernfalls gib den Switch mit Label zurück
  return (
    <div className={wrapperClasses}>
      {switchElement}
      <div>
        <label
          htmlFor={props.id}
          className={cn(
            "text-sm font-medium leading-none cursor-pointer select-none",
            props.disabled && "cursor-not-allowed opacity-70",
            isLoading && "cursor-wait",
            labelClasses
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {statusLabels}
      </div>
    </div>
  );
});

EnhancedSwitch.displayName = SwitchPrimitives.Root.displayName;

export { EnhancedSwitch };
