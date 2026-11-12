import { VisitCard } from './VisitCard'
import { lindaPlan, marcusPlan, marcusImprovedPlan } from '../fixtures'

export default { title: 'Plan/VisitCard', component: VisitCard, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

const visit = (plan, id) => plan.visits.find(v => v.id === id)

// Closed is the default: name, who, how much is in it, how long, and the cost tip.
export const Closed = { args: { visit: marcusPlan.visits[0], showSay: false } }
export const Open = { args: { visit: marcusPlan.visits[0], showSay: false, defaultOpen: true } }
// After the extra questions, anything still open is listed on the first visit with who it's for.
export const WithAskIfTheseApply = { args: { visit: marcusImprovedPlan.visits[0], showSay: false, defaultOpen: true, askIf: marcusImprovedPlan.askDoctor } }
// A follow-up: how you get it, one list, one thing to know about cost.
export const LabWork = { args: { visit: visit(marcusImprovedPlan, 'lab'), defaultOpen: true } }
// An answer just added a row: it is tinted, and a closed card's icon gets a dot until the next answer.
export const NewRow = { args: { visit: marcusImprovedPlan.visits[0], showSay: false, defaultOpen: true, fresh: new Set(['diabetes-screening']) } }
export const NewWhileClosed = { args: { visit: visit(marcusImprovedPlan, 'lab'), fresh: new Set(['diabetes-screening']) } }
// A second visit to schedule keeps its own script.
export const SecondVisit = { args: { visit: lindaPlan.visits[1], defaultOpen: true } }
