import { FindDoctorCard } from './FindDoctorCard'

export default { title: 'Plan/FindDoctorCard', component: FindDoctorCard, tags: ['autodocs'], decorators: [S => <div className="max-w-[640px]"><S /></div>] }

// The variant comes from the insurance and doctor answers (findDoctorVariant). Insured with a doctor: no card.
export const Insured = { args: { variant: 'insurer', insurance: 'employer' } }
export const Medicaid = { args: { variant: 'insurer', insurance: 'medicaid' } }
export const Medicare = { args: { variant: 'medicare' } }
export const InsuranceNotSure = { args: { variant: 'unsure' } }
// Uninsured, no doctor: HRSA's health center search.
export const Uninsured = { args: { variant: 'clinic' } }
// Uninsured with a doctor: ask about cost, with health centers as the fallback.
export const UninsuredWithDoctor = { args: { variant: 'cost' } }
