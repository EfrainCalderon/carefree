// VisitCard: A collapsible visit in the plan.
import { useState } from 'react'
import { ChevronDown, FlaskConical, Gauge, MessageCircle, Pill, Split } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VisitNumber } from '../VisitNumber/VisitNumber'

// What kind of thing happens at a visit step (journey.as), shown as a small icon + label.
const CATEGORY = {
  measurement: { label: 'Check', Icon: Gauge },
  exam: { label: 'Check', Icon: Gauge },
  question: { label: 'Questions', Icon: MessageCircle },
  counseling: { label: 'Questions', Icon: MessageCircle },
  lab: { label: 'Test', Icon: FlaskConical },
  order: { label: 'Test', Icon: FlaskConical },
  procedure: { label: 'Choice', Icon: Split },
  prescription: { label: 'Rx', Icon: Pill },
}

export function VisitCard({ visit, index, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="rounded-card border bg-card">
      <button
        className="flex min-h-8 w-full items-center gap-2 rounded-card p-2 text-left hover:bg-tint-subtle"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <VisitNumber n={index + 1} on={open} size="lg" />
        <span className="flex-1">
          <span className="block text-heading font-bold">{visit.name}</span>
          <span className="block text-muted-foreground">{visit.who}</span>
        </span>
        <ChevronDown className={cn('size-2 shrink-0 transition-transform duration-(--cf-motion-base)', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-2 pb-2">
          <p className="cf-label pb-1">What should happen</p>
          <ul>
            {visit.items.map(({ rec, step, note }) => {
              const cat = CATEGORY[step.as] || CATEGORY.question
              return (
                <li key={rec.id + step.action} className="flex items-start gap-2 border-t border-tint py-2">
                  <span className="flex size-3 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><cat.Icon className="size-2" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-1">
                      <p className="font-semibold">{rec.plain_name}</p>
                      <span className="cf-label shrink-0">{cat.label}</span>
                    </div>
                    <p className="text-body text-muted-foreground">{step.action}{note && ` · ${note}`}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          {visit.booking_tip && <p className="mt-2 rounded-control bg-tint p-2"><strong>When you book:</strong> {visit.booking_tip}</p>}
          <p className="pt-2 text-muted-foreground">{visit.coverage}</p>
        </div>
      )}
    </div>
  )
}
