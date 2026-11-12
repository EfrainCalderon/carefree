import { PrintSheet } from './PrintSheet'
import { lindaPlan, marcusImprovedPlan } from '../fixtures'

// On screen this component is hidden; the story shows it the way it prints, on a letter-size page.
export default { title: 'Plan/PrintSheet', component: PrintSheet, tags: ['autodocs'], decorators: [S => <div className="cf-print-preview border bg-white" style={{ width: '8.5in', minHeight: '11in', padding: '12mm' }}><S /></div>] }

export const Marcus = { args: { plan: marcusImprovedPlan } }
// The longest common case: two visits to schedule and five follow-ups.
export const Linda = { args: { plan: lindaPlan } }
