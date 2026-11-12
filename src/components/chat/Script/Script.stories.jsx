import { Script } from './Script'

export default { title: 'Plan/Script', component: Script, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const Calling = { args: { label: 'When you call, say', children: 'I’d like to schedule a preventive care visit.' } }
export const OnDark = { render: () => <div className="cf-gradient rounded-card p-3"><Script tone="dark" label="When you call, say">I’d like to schedule a preventive care visit.</Script></div> }
export const FindingADoctor = { args: { label: 'Ask', children: 'Which in-network primary care doctors near me are taking new patients?' } }
