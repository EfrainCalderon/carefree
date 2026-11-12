import { fn } from '@storybook/test'
import { OptionList } from './OptionList'
import { AGE_RANGES, INSURANCE } from '@/app/logic'

export default { title: 'Form/OptionList', component: OptionList, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>], args: { onSelect: fn() } }

// One option per different plan. The first one carries a hint for the cases it folds in.
export const Insurance = { args: { label: 'How do you get health insurance?', options: INSURANCE } }
export const Selected = { args: { label: 'How do you get health insurance?', options: INSURANCE, value: 'medicare' } }
// Short answers sit two across, so seven age ranges take four rows instead of seven.
export const AgeRanges = { args: { label: 'How old are you?', options: AGE_RANGES, columns: 2, value: '45-49' } }
