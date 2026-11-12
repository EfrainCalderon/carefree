import { Progress } from './Progress'

export default { title: 'Form/Progress', component: Progress, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const First = { args: { step: 0, total: 3, label: 'About you' } }
export const Middle = { args: { step: 1, total: 3, label: 'About you' } }
export const Last = { args: { step: 3, total: 4, label: 'Your health' } }
