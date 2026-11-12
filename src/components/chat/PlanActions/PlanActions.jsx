// PlanActions: The two ways to take the whole plan away: email it, or print it. They sit beside the plan's
// heading, because they act on all of it.
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmailDialog } from '../EmailDialog/EmailDialog'

export function PlanActions({ plan, answers }) {
  return (
    <div className="grid grid-cols-2 gap-1 sm:flex">
      <EmailDialog plan={plan} answers={answers} triggerClassName="w-full sm:w-auto" />
      <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.print()}><Printer />Print</Button>
    </div>
  )
}
