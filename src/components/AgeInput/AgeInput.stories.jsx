import { AgeInput } from './AgeInput'

export default {
  title: 'Components/AgeInput',
  component: AgeInput,
  tags: ['autodocs'],
}

export const Empty = { args: { value: null, onChange: () => {} } }
export const WithValue = { args: { value: 42, onChange: () => {} } }
