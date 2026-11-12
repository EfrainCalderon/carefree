import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

// Opens above its trigger by default and stays 16px inside the screen edge, so it never clips on a phone.
function PopoverContent({ className, side = "top", align = "start", sideOffset = 8, ...props }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={16}
        className={cn(
          "cf-fade z-50 w-[min(320px,calc(100vw-32px))] rounded-card border bg-popover p-2 text-popover-foreground shadow-popover outline-none",
          className
        )}
        {...props} />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent }
