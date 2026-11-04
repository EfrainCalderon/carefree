import { NoteCard } from './NoteCard'
import { INSURANCE_NOTES } from '@/app/logic'

export default { title: 'Chat/Cards/NoteCard', component: NoteCard, tags: ['autodocs'] }

export const Medicaid = { args: { children: INSURANCE_NOTES.medicaid } }
export const NotSure = { args: { children: INSURANCE_NOTES.unsure } }
export const Uninsured = { args: { children: INSURANCE_NOTES.none } }
