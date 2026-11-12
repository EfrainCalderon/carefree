import { EmailPlanForm } from './EmailPlanForm'
import { marcusAnswers } from '../fixtures'

export default { title: 'Plan/EmailPlanForm', component: EmailPlanForm, tags: ['autodocs'], decorators: [S => <div className="max-w-[400px]"><S /></div>], args: { answers: marcusAnswers } }

// Sending…, then a confirmation. (A stand-in: nothing is sent from Storybook.)
export const Sends = { args: { send: () => new Promise(r => setTimeout(r, 800)) } }
// If the send fails, the form says what to do and keeps the address.
export const Fails = { args: { send: () => Promise.reject(new Error('offline')) } }
