import { fn } from '@storybook/test'
import { OptionList } from './OptionList'
import { INSURANCE } from '@/app/logic'

export default { title: 'Form/OptionList', component: OptionList, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const Default = { args: { label: 'Insurance', options: INSURANCE, onSelect: fn() } }
// Going back to a question shows the saved answer.
export const Answered = { args: { label: 'Insurance', options: INSURANCE, value: 'employer', onSelect: fn() } }
