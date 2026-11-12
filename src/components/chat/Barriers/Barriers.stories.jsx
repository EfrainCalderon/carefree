import { Barriers } from './Barriers'
import { lindaPlan, marcusPlan, samPlan } from '../fixtures'

export default { title: 'Plan/Barriers', component: Barriers, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px] pb-[320px]"><S /></div>] }

export const Default = { args: { barriers: marcusPlan.first.barriers } }
export const Medicare = { args: { barriers: lindaPlan.first.barriers } }
// Without insurance there's no cost link; the first one says where to go.
export const Uninsured = { args: { barriers: samPlan.first.barriers } }
