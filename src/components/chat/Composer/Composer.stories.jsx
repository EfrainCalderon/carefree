import { Composer } from './Composer'

export default { title: 'Chat/Conversation/Composer', component: Composer, tags: ['autodocs'] }

export const Default = { args: { onSend: () => {} }, decorators: [S => <div className="max-w-xl"><S /></div>] }
