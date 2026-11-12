import { VisitCard } from './VisitCard'
import { FindDoctorHelp } from '../FindDoctorHelp/FindDoctorHelp'
import { findDoctor } from '@/app/logic'
import { lindaPlan, marcusPlan, marcusImprovedPlan } from '../fixtures'

export default { title: 'Plan/VisitCard', component: VisitCard, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

const visit = (plan, id) => plan.visits.find(v => v.id === id)

// The first visit opens by default: the booking script, then what to ask for, then what happens anyway.
export const FirstVisit = { args: { visit: marcusPlan.visits[0], defaultOpen: true, finder: <FindDoctorHelp help={findDoctor('private')} /> } }
export const Closed = { args: { visit: marcusPlan.visits[0] } }
// After the extra questions, anything still open is listed on the first visit with who it's for.
export const WithAskIfTheseApply = { args: { visit: marcusImprovedPlan.visits[0], defaultOpen: true, askIf: marcusImprovedPlan.askDoctor } }
// A follow-up: how you get it, one list, one thing to know about cost.
export const LabWork = { args: { visit: visit(marcusImprovedPlan, 'lab'), defaultOpen: true } }
export const Pharmacy = { args: { visit: visit(marcusImprovedPlan, 'pharmacy'), defaultOpen: true } }
// Medicare renames the visit and changes the script.
export const Medicare = { args: { visit: lindaPlan.visits[0], defaultOpen: true } }
