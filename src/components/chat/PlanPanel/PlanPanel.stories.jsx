import { PlanPanel } from './PlanPanel'
import { PlanHeader } from '../PlanHeader/PlanHeader'
import { lindaPlan, marcusPlan } from '../fixtures'

export default { title: 'Chat/Plan/PlanPanel', component: PlanPanel, tags: ['autodocs'] }

// The plan as it appears in the desktop side panel and the sheets: the body scrolls, the email bar stays.
const frame = S => <div className="flex h-[640px] w-(--cf-size-plan) flex-col overflow-hidden rounded-card border bg-card"><S /></div>

export const Marcus = {
  render: () => (<><PlanHeader plan={marcusPlan} ready /><PlanPanel plan={marcusPlan} ready /></>),
  decorators: [frame],
}
// After the extra questions, "Ask your doctor about" lists what's still open.
export const AfterQuestions = {
  render: () => (<><PlanHeader plan={marcusPlan} ready /><PlanPanel plan={marcusPlan} ready showAskDoctor /></>),
  decorators: [frame],
}
// When the plan is done, the email field is nudged as the next step.
export const Nudge = {
  render: () => (<><PlanHeader plan={marcusPlan} ready /><PlanPanel plan={marcusPlan} ready nudge /></>),
  decorators: [frame],
}
export const MedicareLinda = {
  render: () => (<><PlanHeader plan={lindaPlan} ready /><PlanPanel plan={lindaPlan} ready /></>),
  decorators: [frame],
}
