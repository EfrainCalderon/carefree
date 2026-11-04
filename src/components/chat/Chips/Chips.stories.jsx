import { Chips } from './Chips'
import { useState } from 'react'
import { AGE_RANGES } from '../fixtures'

export default { title: 'Chat/Conversation/Chips', component: Chips, tags: ['autodocs'] }

export const Unanswered = { args: { label: 'Age range', options: AGE_RANGES, value: null } }

// Cards keep the row after answering; it locks and offers "Change answer".
export const Answered = {
  render: () => {
    const [value, setValue] = useState('45-49')
    return <Chips keepAfterAnswer label="Age range" options={AGE_RANGES} value={value} onSelect={o => setValue(o.id)} onChange={() => setValue(null)} />
  },
}

export const Interactive = {
  render: () => {
    const [value, setValue] = useState(null)
    return <Chips keepAfterAnswer label="Age range" options={AGE_RANGES} value={value} onSelect={o => setValue(o.id)} onChange={() => setValue(null)} />
  },
}
