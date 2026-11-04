import { AddedLine } from './AddedLine'
import { marcusPlan } from '../fixtures'

export default { title: 'Chat/Conversation/AddedLine', component: AddedLine, tags: ['autodocs'] }

export const Added = { args: { added: marcusPlan.planned.filter(r => r.conditional).slice(0, 2) } }
export const NothingNew = { args: {} }
export const Removed = { args: { removed: [{ id: 'x' }, { id: 'y' }] } }
