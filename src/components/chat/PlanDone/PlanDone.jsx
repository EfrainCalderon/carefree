// PlanDone: What the plan shows once every step is ticked off: it's done, when it comes round again, and a
// way to be reminded. The page's one dark green block, used here to mark the finish.
// The reminder is a calendar file made in the browser. Nothing is stored or sent.
import { useMemo } from 'react'
import { CalendarPlus, Check } from 'lucide-react'
import { Grain } from '../Grain/Grain'
import { buildNextVisitReminder, nextVisitDate } from '@/lib/reminder'

const MONTH = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

export function PlanDone({ now }) {
  const reminder = useMemo(() => ({ when: MONTH.format(nextVisitDate(now)), ics: buildNextVisitReminder(now) }), [now])
  return (
    <section aria-labelledby="plan-done" role="status" className="cf-gradient cf-rise relative isolate space-y-2 overflow-hidden rounded-card p-2">
      <Grain />
      <div className="flex items-center gap-2">
        <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-primary"><Check className="size-3" strokeWidth={2.5} /></span>
        <h2 id="plan-done" className="text-title font-bold tracking-tight">You’re done for this year</h2>
      </div>
      <p className="text-[var(--cf-color-green-100)]">A preventive care visit is covered once a year. Your next one is due around {reminder.when}.</p>
      <a
        className="inline-flex min-h-6 w-full items-center justify-center gap-1 rounded-control border border-white/40 px-2 font-semibold transition-colors duration-(--cf-motion-fast) hover:border-white hover:bg-white/10 focus-visible:outline-white sm:w-auto"
        href={`data:text/calendar;charset=utf-8,${encodeURIComponent(reminder.ics)}`}
        download="next-preventive-visit.ics"
      >
        <CalendarPlus aria-hidden className="size-2" />Add a reminder to my calendar
      </a>
    </section>
  )
}
