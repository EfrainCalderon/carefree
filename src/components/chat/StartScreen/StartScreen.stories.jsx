import { fn } from '@storybook/test'
import { StartScreen } from './StartScreen'

export default { title: 'Form/StartScreen', component: StartScreen, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

// The headline, the explanation, the preview and the button arrive one after another, in reading order.
export const Default = { args: { onStart: fn() } }
