import { VisitCard } from './VisitCard'
import { lindaPlan, marcusPlan } from '../fixtures'

export default { title: 'Chat/Plan/VisitCard', component: VisitCard, tags: ['autodocs'] }

export const Open = { args: { visit: marcusPlan.visits[0], index: 0, defaultOpen: true } }
export const Closed = { args: { visit: marcusPlan.visits[1], index: 1 } }
// Medicare renames the checkup to "Annual Wellness Visit".
export const Medicare = { args: { visit: lindaPlan.visits[0], index: 0, defaultOpen: true } }
