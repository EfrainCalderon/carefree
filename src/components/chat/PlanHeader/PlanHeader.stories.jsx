import { PlanHeader } from './PlanHeader'
import { lindaPlan, marcusPlan, samPlan } from '../fixtures'

export default { title: 'Plan/PlanHeader', component: PlanHeader, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

export const Default = { args: { plan: marcusPlan, className: 'rounded-card' } }
export const Medicare = { args: { plan: lindaPlan, className: 'rounded-card' } }
export const Uninsured = { args: { plan: samPlan, className: 'rounded-card' } }
