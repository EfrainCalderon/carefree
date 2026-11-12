import { fn } from '@storybook/test'
import { PlanView } from './PlanView'
import { OptInCard } from '../OptInCard/OptInCard'
import { PlanActions } from '../PlanActions/PlanActions'
import { lindaAnswers, lindaPlan, marcusAnswers, marcusImprovedAnswers, marcusImprovedPlan, marcusPlan, samAnswers, samPlan } from '../fixtures'

export default { title: 'Plan/PlanView', component: PlanView, tags: ['autodocs'], parameters: { layout: 'fullscreen' }, decorators: [S => <div className="mx-auto max-w-[1040px] p-2"><S /></div>] }

// Straight after the three questions. Sections fade up in order; on a wide screen email and print stay beside the plan.
export const Marcus = { args: { plan: marcusPlan, offer: <OptInCard count={8} questions={4} onImprove={fn()} />, actions: <PlanActions plan={marcusPlan} answers={marcusAnswers} /> } }
// After the extra questions: a note says what was added, and what's still open sits on the first visit.
export const AfterQuestions = { args: { plan: marcusImprovedPlan, actions: <PlanActions plan={marcusImprovedPlan} answers={marcusImprovedAnswers} /> } }
export const MedicareLinda = { args: { plan: lindaPlan, actions: <PlanActions plan={lindaPlan} answers={lindaAnswers} /> } }
// Without insurance: the cost line changes and the health center help starts open.
export const Uninsured = { args: { plan: samPlan, actions: <PlanActions plan={samPlan} answers={samAnswers} /> } }
