// PlanPanel: The plan body (visits, ask-your-doctor) that scrolls, with the email form in a sticky bar.
import { VisitCard } from '../VisitCard/VisitCard'
import { AskDoctorList } from '../AskDoctorList/AskDoctorList'
import { EmailPlanForm } from '../EmailPlanForm/EmailPlanForm'

// showAskDoctor: only after the extra questions. nudge: ring the email field to suggest it's next.
// Sections fade up one after another (after the panel has opened), so the plan reads as it arrives.
const rise = i => ({ className: 'cf-rise', style: { animationDelay: `${200 + i * 120}ms` } })

export function PlanPanel({ plan, ready, showAskDoctor, nudge, onEmailFocus }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto bg-tint-subtle p-2">
        {ready ? (
          <div className="space-y-3">
            <div className="space-y-1">
              {plan.visits.map((v, i) => <div key={v.id} {...rise(i)}><VisitCard visit={v} index={i} /></div>)}
            </div>
            {showAskDoctor && <div {...rise(plan.visits.length)}><AskDoctorList recs={plan.askDoctor} /></div>}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-[var(--cf-color-green-200)] p-3 text-center text-muted-foreground">
            Your plan builds as you answer. It will show each visit to book, what happens there, and what to ask for.
          </div>
        )}
      </div>
      {ready && (
        <div className="shrink-0 border-t bg-card p-2 pb-[max(env(safe-area-inset-bottom),16px)]">
          <EmailPlanForm nudge={nudge} onFocus={onEmailFocus} />
        </div>
      )}
    </div>
  )
}
