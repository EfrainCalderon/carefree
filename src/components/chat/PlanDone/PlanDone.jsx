// PlanDone: What the plan shows once every step is ticked off: it's done, and when it comes round again.
// The page's one dark green block, used here to mark the finish. There's no calendar button: an .ics file
// downloads as a file on most phones and browsers, and we can't know which calendar someone uses.
import { useMemo } from 'react'
import { Check } from 'lucide-react'
import { Grain } from '../Grain/Grain'
import { nextVisitDate } from '@/lib/reminder'

const MONTH = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

export function PlanDone({ now }) {
  const when = useMemo(() => MONTH.format(nextVisitDate(now)), [now])
  return (
    <section aria-labelledby="plan-done" role="status" className="cf-gradient cf-rise relative isolate space-y-2 overflow-hidden rounded-card p-2">
      <Grain />
      <div className="flex items-center gap-2">
        <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-primary"><Check className="size-3" strokeWidth={2.5} /></span>
        <h2 id="plan-done" className="text-title font-bold tracking-tight">You’re done for this year</h2>
      </div>
      <p className="text-[var(--cf-color-green-100)]">A preventive care visit is covered once a year. Your next one is due around {when}, so it’s worth setting a reminder.</p>
    </section>
  )
}
