import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export const Primary = { args: { children: 'Continue', variant: 'primary', ready: true } }
export const PrimaryDisabled = { args: { children: 'Continue', variant: 'primary', ready: false } }
export const Ghost = { args: { children: '← Back', variant: 'ghost' } }
export const CallToAction = { args: { children: 'See what\'s covered for me', variant: 'primary', ready: true } }
