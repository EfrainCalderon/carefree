import { Progress } from './Progress'

export default { title: 'Form/Progress', component: Progress, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const First = { args: { step: 0, total: 4, label: 'About you' } }
export const Halfway = { args: { step: 2, total: 4, label: 'About you' } }
export const Done = { args: { step: 4, total: 4, label: 'About you' } }
// The extra questions get their own bar.
export const Improve = { args: { step: 1, total: 3, label: 'Improve your plan' } }
