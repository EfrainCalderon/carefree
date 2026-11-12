import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

// A short form: centered, with a margin, at every width.
function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="cf-fade fixed inset-0 z-50 bg-[rgb(22_41_31/0.5)]" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "cf-fade fixed inset-x-2 top-1/2 z-50 mx-auto max-h-[calc(100dvh-32px)] max-w-[448px] -translate-y-1/2 overflow-y-auto rounded-card bg-card p-2 text-card-foreground shadow-popover outline-none sm:p-3",
          className
        )}
        {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription }
