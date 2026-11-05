// VisitCard: A collapsible visit in the plan. Items are grouped by kind (questions, checks, tests…);
// the icon and the grouping say what kind, so there are no per-item labels.
import { useState } from 'react'
import { ChevronDown, FlaskConical, Gauge, MessageCircle, Pill, Split } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VisitNumber } from '../VisitNumber/VisitNumber'

// journey.as → group. Order here is the order shown.
const GROUPS = [
  { id: 'questions', label: 'Questions', Icon: MessageCircle, as: ['question', 'counseling'] },
  { id: 'checks', label: 'Checks', Icon: Gauge, as: ['measurement', 'exam'] },
  { id: 'tests', label: 'Tests', Icon: FlaskConical, as: ['lab', 'order'] },
  { id: 'choices', label: 'Choices', Icon: Split, as: ['procedure'] },
  { id: 'rx', label: 'Prescriptions', Icon: Pill, as: ['prescription'] },
]
const groupOf = as => GROUPS.find(g => g.as.includes(as)) || GROUPS[0]

const Tip = ({ label, children }) => (
  <p className="rounded-control bg-tint p-2"><strong>{label}</strong> {children}</p>
)

export function VisitCard({ visit, index, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const groups = GROUPS
    .map(g => ({ ...g, items: visit.items.filter(it => groupOf(it.step.as) === g) }))
    .filter(g => g.items.length)
  return (
    // Hover darkens the border instead of filling the card, so the number keeps its contrast.
    <div className="rounded-card border bg-card transition-colors duration-(--cf-motion-fast) has-[>button:hover]:border-outline">
      <button
        className="flex min-h-8 w-full items-center gap-2 rounded-card p-2 text-left"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <VisitNumber n={index + 1} on={open} size="lg" />
        <span className="flex-1">
          <span className="block text-heading font-bold">{visit.name}</span>
          <span className="block text-muted-foreground">{visit.who}</span>
        </span>
        <ChevronDown className={cn('size-3 shrink-0 text-outline transition-transform duration-(--cf-motion-base)', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="space-y-2 px-2 pb-2">
          <div className="divide-y divide-tint border-t border-tint">
            {groups.map(g => (
              <ul key={g.id} aria-label={g.label} className="space-y-2 py-2">
                {g.items.map(({ rec, step, note }) => (
                  <li key={rec.id + step.action} className="flex items-center gap-2">
                    <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><g.Icon className="size-3" strokeWidth={1.75} /></span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{rec.plain_name}</p>
                      <p className="text-muted-foreground">{step.action}{note && ` · ${note}`}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          {visit.booking_tip && <Tip label="When you book:">{visit.booking_tip}</Tip>}
          {visit.coverage_tip && <Tip label="Tip:">{visit.coverage_tip}</Tip>}
        </div>
      )}
    </div>
  )
}
