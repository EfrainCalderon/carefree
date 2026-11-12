import { EmailPlanForm } from './EmailPlanForm'
import { marcusAnswers, marcusPlan } from '../fixtures'

export default { title: 'Plan/EmailPlanForm', component: EmailPlanForm, tags: ['autodocs'], decorators: [S => <div className="max-w-[320px]"><S /></div>], args: { plan: marcusPlan, answers: marcusAnswers } }

// Running locally there's no mail server, so Send shows the email instead of sending it.
export const Preview = { args: { preview: true } }
// The live form: Sending…, then a confirmation.
export const Sends = { args: { preview: false, send: () => new Promise(r => setTimeout(r, 800)) } }
// If the send fails, the form says what to do and keeps the address.
export const Fails = { args: { preview: false, send: () => Promise.reject(new Error('offline')) } }
