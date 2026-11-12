import { PlanDone } from './PlanDone'

export default { title: 'Plan/PlanDone', component: PlanDone, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

// Shown when every step on the timeline is ticked off.
export const Default = { args: { now: new Date(2026, 10, 12) } }
