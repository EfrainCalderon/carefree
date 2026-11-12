import { FindDoctorHelp } from './FindDoctorHelp'
import { findDoctor } from '@/app/logic'

export default { title: 'Plan/FindDoctorHelp', component: FindDoctorHelp, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

// Closed by default: people with a doctor never need it, people without one are a tap away.
export const Closed = { args: { help: findDoctor('private') } }
export const Insured = { args: { help: findDoctor('private'), defaultOpen: true } }
export const Medicare = { args: { help: findDoctor('medicare'), defaultOpen: true } }
export const NotSure = { args: { help: findDoctor('unsure'), defaultOpen: true } }
// Without insurance the health center is the main route, so it starts open.
export const Uninsured = { args: { help: findDoctor('none') } }
