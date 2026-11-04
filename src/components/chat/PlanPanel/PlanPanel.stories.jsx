import { PlanPanel } from './PlanPanel'
import { PlanHeader } from '../PlanHeader/PlanHeader'
import { lindaPlan, marcusPlan } from '../fixtures'

export default { title: 'Chat/Plan/PlanPanel', component: PlanPanel, tags: ['autodocs'] }

// The plan as it appears in the desktop side panel and the mobile/tablet sheets.
const frame = S => <div className="w-(--cf-size-plan) overflow-hidden rounded-card border bg-card"><S /></div>

export const Marcus = {
  render: () => (<><PlanHeader plan={marcusPlan} ready /><div className="bg-tint-subtle p-2"><PlanPanel plan={marcusPlan} ready /></div></>),
  decorators: [frame],
}
export const MedicareLinda = {
  render: () => (<><PlanHeader plan={lindaPlan} ready /><div className="bg-tint-subtle p-2"><PlanPanel plan={lindaPlan} ready /></div></>),
  decorators: [frame],
}
export const BeforeAnswers = {
  render: () => (<><PlanHeader plan={{ visits: [] }} /><div className="bg-tint-subtle p-2"><PlanPanel plan={{ visits: [] }} /></div></>),
  decorators: [frame],
}
