import { fn } from '@storybook/test'
import { PlanView } from './PlanView'
import { NoteCard } from '../NoteCard/NoteCard'
import { OptInCard } from '../OptInCard/OptInCard'
import { lindaPlan, marcusPlan } from '../fixtures'

export default { title: 'Plan/PlanView', component: PlanView, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

// Sections fade up one by one once the page loads; the email form comes last.
export const Marcus = { args: { plan: marcusPlan, offer: <OptInCard count={4} onImprove={fn()} /> } }
// After the extra questions: "Ask your doctor about" lists what's still open, and there's no offer.
export const AfterQuestions = { args: { plan: marcusPlan, showAskDoctor: true } }
export const MedicareLinda = { args: { plan: lindaPlan, notes: <NoteCard>These are free when your doctor accepts Medicare.</NoteCard> } }
