import { EmailPlanForm } from './EmailPlanForm'

export default { title: 'Plan/EmailPlanForm', component: EmailPlanForm, tags: ['autodocs'], decorators: [S => <div className="max-w-md"><S /></div>] }

// Send stays disabled until something is typed. Type "marcus@" and press Send to see the error.
export const Default = {}
