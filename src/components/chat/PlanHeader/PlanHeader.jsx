// PlanHeader: The plan in three lines: what it is, the one thing to do, and what it costs.
// Coverage is stated here and nowhere else on the page.
import { Grain } from '../Grain/Grain'
import { RichText } from '../Term/Term'
import { cn } from '@/lib/utils'

// headingRef: lets the page move focus to the heading when the plan appears.
export function PlanHeader({ plan, className, headingRef }) {
  return (
    <div className={cn('cf-gradient relative isolate overflow-hidden p-3', className)}>
      <Grain />
      <h1 ref={headingRef} tabIndex={-1} className="text-title font-bold tracking-tight focus:outline-none">Your plan</h1>
      <p className="font-semibold">{plan.summary}</p>
      <p className="text-[var(--cf-color-green-100)]"><RichText>{plan.coverage}</RichText></p>
    </div>
  )
}
