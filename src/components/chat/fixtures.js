// Sample data for stories: built from the real recommendations and visits data with the app's own plan logic.
import recsJson from '../../../public/data/recommendations.json'
import visitsJson from '../../../public/data/visits.json'
import { AGE_RANGES, derivePlan, pickStat } from '@/app/logic'

export const data = { recs: recsJson.recommendations, visits: visitsJson.visits }

// Marcus: 47, male, insurance through work, said yes to heart + a bit over on weight, used to smoke.
export const marcusAnswers = { age: '45-49', sex: 'male', insurance: 'employer', personal: { heart: 'yes', weight: 'some', smoking: 'former' } }
export const marcusPlan = derivePlan(data, marcusAnswers)

// Linda: 67, female, Medicare, skipped the personal questions.
export const lindaPlan = derivePlan(data, { age: '65-75', sex: 'female', insurance: 'medicare', personal: {} })

export const statFor = (age, sex) => pickStat(AGE_RANGES.find(r => r.id === age), sex)
export { AGE_RANGES }
