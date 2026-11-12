// FindDoctorHelp: How to find someone to book with, inside the first visit and one tap away.
// The copy comes from the insurance answer (findDoctor in src/app/logic.js).
import { useId, useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Collapse } from '../Collapse/Collapse'
import { Script } from '../Script/Script'

export function FindDoctorHelp({ help, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? !!help.open)
  const id = useId()
  return (
    <div className="rounded-control border">
      <button
        type="button"
        className="flex min-h-6 w-full items-center justify-between gap-2 rounded-control px-2 py-1 text-left font-semibold"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
      >
        {help.title}
        <ChevronDown aria-hidden className={cn('cf-no-print size-3 shrink-0 text-outline transition-transform duration-(--cf-motion-base)', open && 'rotate-180')} />
      </button>
      <Collapse open={open} id={id}>
        <div className="space-y-2 px-2 pb-2">
          <p>{help.text}</p>
          {help.ask && <Script label="Ask">{help.ask}</Script>}
          {help.more && <p className="text-muted-foreground">{help.more}</p>}
          {help.link && (
            <Button asChild variant="outline" className="w-full whitespace-normal sm:w-auto">
              <a href={help.link.href} target="_blank" rel="noreferrer">{help.link.label}<ExternalLink /><span className="sr-only">(opens in a new tab)</span></a>
            </Button>
          )}
        </div>
      </Collapse>
    </div>
  )
}
