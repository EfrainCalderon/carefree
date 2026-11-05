import { DoctorFinderCard } from './DoctorFinderCard'

export default { title: 'Plan/DoctorFinderCard', component: DoctorFinderCard, tags: ['autodocs'] }

// Stub: shows labeled sample results after any 5-digit ZIP.
export const NoDoctor = { args: { reason: 'no-doctor' } }
export const Uninsured = { args: { reason: 'none' } }
