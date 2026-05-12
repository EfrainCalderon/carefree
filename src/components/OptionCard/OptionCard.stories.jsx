import { OptionCard } from './OptionCard'

export default {
  title: 'Components/OptionCard',
  component: OptionCard,
  tags: ['autodocs'],
  decorators: [Story => <div style={{ width: 480 }}><Story /></div>],
}

export const Default = { args: { label: 'Employer', sub: 'Coverage through a job', selected: false } }
export const Selected = { args: { label: 'Employer', sub: 'Coverage through a job', selected: true } }
export const NoSub = { args: { label: 'Male', selected: false } }
export const NoSubSelected = { args: { label: 'Female', selected: true } }
