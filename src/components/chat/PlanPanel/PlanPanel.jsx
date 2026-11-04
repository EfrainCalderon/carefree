// PlanPanel: The full plan: visits, ask-your-doctor list, email form.
import { VisitCard } from '../VisitCard/VisitCard'
import { AskDoctorList } from '../AskDoctorList/AskDoctorList'
import { EmailPlanForm } from '../EmailPlanForm/EmailPlanForm'

export function PlanPanel({ plan, ready }) {
  if (!ready)
    return (
      <div className="rounded-card border border-dashed border-[var(--cf-color-green-200)] p-6 text-center text-[15px] text-muted-foreground">
        Your plan builds as you answer. It will show each visit to book, what happens there, and what to ask for.
      </div>
    )
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {plan.visits.map((v, i) => <VisitCard key={v.id} visit={v} index={i} defaultOpen={i === 0} />)}
      </div>
      <AskDoctorList recs={plan.askDoctor} />
      <EmailPlanForm />
    </div>
  )
}
