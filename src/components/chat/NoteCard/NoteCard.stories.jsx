import { Plus } from 'lucide-react'
import { NoteCard } from './NoteCard'

export default { title: 'Plan/NoteCard', component: NoteCard, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

export const Insurance = { args: { children: 'To check your state, call the number on your Medicaid card and ask about preventive care.' } }
// After the extra questions: what the answers added.
export const Added = { args: { icon: Plus, children: <><strong>Added from your answers:</strong> Diabetes screening, Lung cancer screening (low-dose CT scan).</> } }
