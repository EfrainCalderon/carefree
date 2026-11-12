import { PlanActions } from './PlanActions'
import { marcusAnswers, marcusPlan } from '../fixtures'

export default { title: 'Plan/PlanActions', component: PlanActions, tags: ['autodocs'], args: { plan: marcusPlan, answers: marcusAnswers }, decorators: [S => <div className="max-w-[640px]"><S /></div>] }

export const Default = {}
