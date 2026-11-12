import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

// Fills the screen on a phone; a centered sheet on anything wider. Scrolls inside itself.
function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="cf-fade fixed inset-0 z-50 bg-[rgb(22_41_31/0.5)]" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "cf-fade fixed inset-0 z-50 overflow-y-auto bg-card p-2 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))] text-card-foreground outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[calc(100dvh-48px)] sm:w-[560px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-sheet sm:p-3 sm:shadow-popover",
          className
        )}
        {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription }
