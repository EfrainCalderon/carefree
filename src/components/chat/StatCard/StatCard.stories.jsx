import { StatCard } from './StatCard'
import { statFor } from '../fixtures'

export default { title: 'Extras/StatCard', component: StatCard, tags: ['autodocs'] }

export const Men45to49 = { args: { stat: statFor('45-49', 'male') } }
export const Men35to39 = { args: { stat: statFor('35-39', 'male') } }
export const Women40to44 = { args: { stat: statFor('40-44', 'female') } }
export const Over65 = { args: { stat: statFor('65-75', 'male') } }
