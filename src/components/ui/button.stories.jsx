import { Mail } from 'lucide-react'
import { Button } from './button'

export default { title: 'Primitives/Button', component: Button, tags: ['autodocs'], args: { children: 'Open your plan' } }

export const Primary = {}
export const Secondary = { args: { variant: 'outline', children: 'I’m good' } }
export const Ghost = { args: { variant: 'ghost', children: 'Start over' } }
export const WithIcon = { args: { children: <><Mail />Send</> } }
export const Disabled = { args: { disabled: true } }
// Nudge: a soft ring that suggests the next step (e.g. open the plan once it's ready). Static under reduced motion.
export const Nudge = { args: { variant: 'outline', nudge: true, children: 'Your plan' } }
export const AllStates = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      <Button>Primary</Button><Button variant="outline">Secondary</Button><Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button><Button disabled>Disabled</Button><Button variant="outline" disabled>Disabled</Button>
    </div>
  ),
}
