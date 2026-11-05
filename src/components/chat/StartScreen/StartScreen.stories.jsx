import { fn } from '@storybook/test'
import { StartScreen } from './StartScreen'

export default { title: 'Form/StartScreen', component: StartScreen, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

export const Default = { args: { onStart: fn() } }
