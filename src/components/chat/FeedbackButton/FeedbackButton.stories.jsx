import { FeedbackButton } from './FeedbackButton'

export default { title: 'Form/FeedbackButton', component: FeedbackButton, tags: ['autodocs'], parameters: { layout: 'fullscreen' }, decorators: [S => <div className="h-[480px]"><S /></div>], args: { screen: 'plan', send: () => new Promise(r => setTimeout(r, 800)) } }

// Sits in the corner of every screen.
export const Button = {}
export const Open = { args: { defaultOpen: true } }
export const Fails = { args: { defaultOpen: true, send: () => Promise.reject(new Error('offline')) } }
