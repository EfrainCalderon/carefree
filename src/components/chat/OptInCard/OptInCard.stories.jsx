import { fn } from '@storybook/test'
import { OptInCard } from './OptInCard'

export default { title: 'Plan/OptInCard', component: OptInCard, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

export const Default = { args: { questions: 4, onImprove: fn() } }
