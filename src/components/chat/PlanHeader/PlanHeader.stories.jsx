import { PlanHeader } from './PlanHeader'
import { marcusPlan } from '../fixtures'

export default { title: 'Chat/Plan/PlanHeader', component: PlanHeader, tags: ['autodocs'] }

export const Ready = { args: { plan: marcusPlan, ready: true } }
export const Empty = { args: { plan: { visits: [] }, ready: false } }
