// Sample data for stories: built from the real recommendations and visits data with the app's own plan logic.
import recsJson from '../../../public/data/recommendations.json'
import visitsJson from '../../../public/data/visits.json'
import { AGE_RANGES, derivePlan, pickStat } from '@/app/logic'

export const data = { recs: recsJson.recommendations, visits: visitsJson.visits }

// Marcus: 47, male, insured through work. This is his plan straight after the three questions.
export const marcusAnswers = { age: '45-49', sex: 'male', insurance: 'private', personal: {} }
export const marcusPlan = derivePlan(data, marcusAnswers)

// Marcus after the extra questions: not sure about blood pressure, used to smoke, a bit over on weight, yes to sexual health.
export const marcusImprovedAnswers = { ...marcusAnswers, personal: { heart: 'unsure', smoking: 'former', weight: 'some' }, sexual: 'yes', improved: true }
export const marcusImprovedPlan = derivePlan(data, marcusImprovedAnswers)

// Linda: 67, female, Medicare, skipped the extra questions.
export const lindaAnswers = { age: '65-75', sex: 'female', insurance: 'medicare', personal: {} }
export const lindaPlan = derivePlan(data, lindaAnswers)

// Sam: 29, no insurance.
export const samAnswers = { age: '18-34', sex: 'male', insurance: 'none', personal: {} }
export const samPlan = derivePlan(data, samAnswers)

export const statFor = (age, sex) => pickStat(AGE_RANGES.find(r => r.id === age), sex)
export { AGE_RANGES }
