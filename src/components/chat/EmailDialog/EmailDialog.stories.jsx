import { EmailDialog } from './EmailDialog'
import { marcusAnswers, marcusPlan } from '../fixtures'

export default { title: 'Plan/EmailDialog', component: EmailDialog, tags: ['autodocs'], args: { plan: marcusPlan, answers: marcusAnswers, send: () => new Promise(r => setTimeout(r, 800)) } }

export const Button = {}
export const Open = { args: { defaultOpen: true } }
