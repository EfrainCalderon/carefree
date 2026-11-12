import { PlanGhost } from './PlanGhost'

export default { title: 'Form/PlanGhost', component: PlanGhost, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const TwoToGo = { args: { remaining: 2 } }
export const OneToGo = { args: { remaining: 1 } }
