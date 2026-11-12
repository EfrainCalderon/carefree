import { PlanActions } from './PlanActions'
import { marcusAnswers, marcusPlan } from '../fixtures'

export default { title: 'Plan/PlanActions', component: PlanActions, tags: ['autodocs'], decorators: [S => <div className="max-w-[320px]"><S /></div>] }

export const Default = { args: { plan: marcusPlan, answers: marcusAnswers } }
