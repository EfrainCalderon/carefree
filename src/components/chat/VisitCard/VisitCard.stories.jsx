import { VisitCard } from './VisitCard'
import { lindaPlan, marcusPlan } from '../fixtures'

export default { title: 'Chat/Plan/VisitCard', component: VisitCard, tags: ['autodocs'], decorators: [S => <div className="w-(--cf-size-plan)"><S /></div>] }

// Cards start closed in the app. Items are grouped by kind; the icon says which.
export const Open = { args: { visit: marcusPlan.visits[0], index: 0, defaultOpen: true } }
export const Closed = { args: { visit: marcusPlan.visits[0], index: 0 } }
// Lab work carries a coverage tip: not every blood test counts as preventive.
export const LabWork = { args: { visit: marcusPlan.visits.find(v => v.id === 'lab') ?? marcusPlan.visits[1], index: 1, defaultOpen: true } }
// Medicare renames the visit to "Annual Wellness Visit".
export const Medicare = { args: { visit: lindaPlan.visits[0], index: 0, defaultOpen: true } }
