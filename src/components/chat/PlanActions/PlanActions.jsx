// PlanActions: Ways to take the plan with you, after the plan. Email is the main one. The others cover the
// two moments after this page: making the call (a reminder) and being in the room (a sheet to show).
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmailPlanForm } from '../EmailPlanForm/EmailPlanForm'
import { ReminderLink } from '../ReminderLink/ReminderLink'
import { VisitSheet } from '../VisitSheet/VisitSheet'

export function PlanActions({ plan, answers }) {
  return (
    <div className="cf-no-print space-y-2 rounded-card border bg-card p-2">
      <h2 className="text-heading font-bold">Take it with you</h2>
      <EmailPlanForm plan={plan} answers={answers} />
      <div className="grid gap-1 sm:grid-cols-3">
        <ReminderLink plan={plan} />
        <VisitSheet plan={plan} />
        <Button variant="outline" className="w-full whitespace-normal" onClick={() => window.print()}><Printer />Print or save PDF</Button>
      </div>
    </div>
  )
}
