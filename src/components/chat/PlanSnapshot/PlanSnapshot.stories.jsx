import { PlanSnapshot } from './PlanSnapshot'
import { marcusPlan } from '../fixtures'

export default { title: 'Chat/Cards/PlanSnapshot', component: PlanSnapshot, tags: ['autodocs'] }

export const Marcus = { args: { visits: marcusPlan.visits, onOpen: () => {} } }
