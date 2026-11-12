// EmailDialog: The email form, opened from the plan's Email button. It only takes up space when someone wants it.
import { Mail, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EmailPlanForm } from '../EmailPlanForm/EmailPlanForm'

export function EmailDialog({ plan, answers, triggerClassName, defaultOpen = false, ...form }) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerClassName}><Mail />Email</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <DialogTitle className="text-heading font-bold">Email your plan</DialogTitle>
              <DialogDescription className="text-muted-foreground">We don’t save your email address.</DialogDescription>
            </div>
            <DialogClose asChild><Button variant="ghost" size="icon-lg" className="-mt-1 -mr-1 shrink-0" aria-label="Close"><X /></Button></DialogClose>
          </div>
          <EmailPlanForm plan={plan} answers={answers} {...form} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
