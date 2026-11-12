import { fn } from '@storybook/test'
import { PlanView } from './PlanView'
import { OptInCard } from '../OptInCard/OptInCard'
import { PlanActions } from '../PlanActions/PlanActions'
import { lindaAnswers, lindaPlan, marcusAnswers, marcusImprovedAnswers, marcusImprovedPlan, marcusPlan, samAnswers, samPlan } from '../fixtures'

export default { title: 'Plan/PlanView', component: PlanView, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>], args: { onChange: fn(), onAt: fn() } }

const actions = (plan, answers) => <PlanActions plan={plan} answers={answers} />

export const Marcus = { args: { plan: marcusPlan, answers: 'Age 45–49, male, work or own plan', actions: actions(marcusPlan, marcusAnswers), offer: <OptInCard questions={4} onImprove={fn()} /> } }
// The arrival: the three steps appear one at a time.
export const Arriving = { args: { ...Marcus.args, build: true } }
// After the extra questions: rows an answer added are marked, and a closed card's icon gets a dot.
export const AfterQuestions = { args: { plan: marcusImprovedPlan, answers: 'Age 45–49, male, work or own plan', fresh: new Set(marcusImprovedPlan.added.map(r => r.id)), actions: actions(marcusImprovedPlan, marcusImprovedAnswers) } }
export const MedicareLinda = { args: { plan: lindaPlan, answers: 'Age 65–75, female, Medicare', actions: actions(lindaPlan, lindaAnswers) } }
export const Uninsured = { args: { plan: samPlan, answers: 'Age 18–34, male, no insurance', actions: actions(samPlan, samAnswers) } }
// Further along: the call is done, so that step folds to a line you can reopen.
export const AtTheVisit = { args: { ...Marcus.args, at: 1 } }
