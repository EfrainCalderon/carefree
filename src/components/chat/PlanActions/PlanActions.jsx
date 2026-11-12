// PlanActions: Ways to take the plan with you: email it, or print it. On a wide screen this stays in view
// beside the plan; on a phone it follows the plan.
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmailPlanForm } from '../EmailPlanForm/EmailPlanForm'

export function PlanActions({ plan, answers }) {
  return (
    <div className="cf-no-print space-y-2 rounded-card border bg-card p-2">
      <EmailPlanForm plan={plan} answers={answers} />
      <Button variant="outline" className="w-full" onClick={() => window.print()}><Printer />Print or save as PDF</Button>
    </div>
  )
}
