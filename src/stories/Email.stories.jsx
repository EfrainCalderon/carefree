// The emailed plan, rendered from the same builder the mail function uses (src/lib/planEmail.js).
// Each story shows it at phone width and at the 600px maximum, the way a mail client would.
import { buildPlanEmail } from '@/lib/planEmail'
import { lindaPlan, marcusImprovedPlan, marcusPlan, samPlan } from '@/components/chat/fixtures'

export default { title: 'Plan/Email', parameters: { layout: 'fullscreen' } }

const Email = ({ plan }) => {
  const { subject, html } = buildPlanEmail(plan)
  return (
    <div className="space-y-2 p-2">
      <p><span className="cf-label">Subject</span> {subject}</p>
      <div className="flex flex-wrap items-start gap-3">
        {[375, 680].map(w => <iframe key={w} title={`Email at ${w}px`} srcDoc={html} width={w} height={900} className="rounded-card border bg-card" />)}
      </div>
    </div>
  )
}

export const Marcus = { render: () => <Email plan={marcusPlan} /> }
// After the extra questions: more to ask for, plus "ask if these apply to you".
export const AfterQuestions = { render: () => <Email plan={marcusImprovedPlan} /> }
export const Medicare = { render: () => <Email plan={lindaPlan} /> }
export const Uninsured = { render: () => <Email plan={samPlan} /> }
