import { Script } from './Script'

export default { title: 'Plan/Script', component: Script, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const Booking = { args: { label: 'When you book, say', children: 'I’d like to book a preventive care visit.' } }
export const FindingADoctor = { args: { label: 'Ask', children: 'Which in-network primary care doctors near me are taking new patients?' } }
