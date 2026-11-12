import { PlanView } from './PlanView'
import { PlanActions } from '../PlanActions/PlanActions'
import { lindaAnswers, lindaPlan, marcusAnswers, marcusImprovedAnswers, marcusImprovedPlan, marcusPlan, samAnswers, samPlan } from '../fixtures'

export default { title: 'Plan/PlanView', component: PlanView, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

// Straight after the three taps. Sections fade up in order.
export const Marcus = { args: { plan: marcusPlan, actions: <PlanActions plan={marcusPlan} answers={marcusAnswers} /> } }
// An answer just added diabetes screening: its rows are marked, and the closed Lab work card's icon gets a dot.
export const JustAdded = { args: { plan: marcusImprovedPlan, fresh: new Set(['diabetes-screening']), actions: <PlanActions plan={marcusImprovedPlan} answers={marcusImprovedAnswers} /> } }
export const MedicareLinda = { args: { plan: lindaPlan, actions: <PlanActions plan={lindaPlan} answers={lindaAnswers} /> } }
// Without insurance: the cost line changes and the health center help starts open.
export const Uninsured = { args: { plan: samPlan, actions: <PlanActions plan={samPlan} answers={samAnswers} /> } }
