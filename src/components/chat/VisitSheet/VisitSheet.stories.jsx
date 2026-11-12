import { VisitSheet } from './VisitSheet'
import { lindaPlan, marcusImprovedPlan, marcusPlan } from '../fixtures'

export default { title: 'Plan/VisitSheet', component: VisitSheet, tags: ['autodocs'], decorators: [S => <div className="max-w-[320px]"><S /></div>] }

// The button. The sheet opens over the page: full screen on a phone, a centered sheet on a computer.
export const Button = { args: { plan: marcusPlan } }
// Open, after the extra questions: what to ask for, what to talk about, and what might apply.
export const Open = { args: { plan: marcusImprovedPlan, defaultOpen: true } }
// Two visits to book: one section each.
export const TwoVisits = { args: { plan: lindaPlan, defaultOpen: true } }
