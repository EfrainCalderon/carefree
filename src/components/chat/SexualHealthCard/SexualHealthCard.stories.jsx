import { SexualHealthCard } from './SexualHealthCard'
import { useState } from 'react'
import { SEXUAL_HEALTH } from '@/app/logic'

export default { title: 'Chat/Cards/SexualHealthCard', component: SexualHealthCard, tags: ['autodocs'] }

export const Men = {
  render: () => {
    const [value, setValue] = useState(null)
    return <SexualHealthCard factors={[...SEXUAL_HEALTH.factors, SEXUAL_HEALTH.maleFactor]} value={value} onChoose={o => setValue(o.id)} />
  },
}
export const Women = { args: { factors: SEXUAL_HEALTH.factors, value: null, onChoose: () => {} } }
