import { fn } from '@storybook/test'
import { AgeInput } from './AgeInput'

export default { title: 'Chat/Conversation/AgeInput', component: AgeInput, args: { onSubmit: fn() } }

// One field instead of eight range chips. Typing 47 maps to the 45–49 range; only the range is kept.
export const Default = {}
