import { OptInCard } from './OptInCard'
import { useState } from 'react'

export default { title: 'Chat/Cards/OptInCard', component: OptInCard, tags: ['autodocs'] }

export const Default = {
  render: () => {
    const [value, setValue] = useState(null)
    return <OptInCard count={4} value={value} onChoose={o => setValue(o.id)} />
  },
}
export const Answered = { args: { count: 4, value: 'yes', onChoose: () => {} } }
