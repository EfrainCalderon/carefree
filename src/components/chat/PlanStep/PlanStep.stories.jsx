import { fn } from '@storybook/test'
import { PlanStep } from './PlanStep'

export default { title: 'Plan/PlanStep', component: PlanStep, tags: ['autodocs'], args: { onSelect: fn() }, decorators: [S => <ol className="max-w-[640px]"><S /></ol>] }

const Box = ({ children }) => <div className="rounded-card border bg-card p-2">{children}</div>

// The step you're on has the filled marker.
export const Current = { args: { label: 'Now', detail: 'about 5 minutes', state: 'current', first: true, children: <Box>Call your primary care doctor to schedule a visit</Box> } }
export const Next = { args: { label: 'At your visit', detail: 'about 30 minutes', children: <Box>Preventive care visit</Box> } }
// A finished step folds to its label. Tap it to open it again.
export const Done = { args: { label: 'Scheduled', state: 'done', first: true, children: <Box>Hidden while done</Box> } }
export const Last = { args: { label: 'After, if your doctor orders it', last: true, children: <Box>Lab work</Box> } }
