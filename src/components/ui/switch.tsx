
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: "default" | "sm" | "lg"
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "default", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      {
        "h-4 w-7": size === "sm",
        "h-6 w-11": size === "default",
        "h-8 w-14": size === "lg",
      },
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        {
          "h-3 w-3": size === "sm",
          "h-5 w-5": size === "default",
          "h-7 w-7": size === "lg",
          "data-[state=checked]:translate-x-3": size === "sm",
          "data-[state=checked]:translate-x-5": size === "default",
          "data-[state=checked]:translate-x-7": size === "lg",
        }
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
