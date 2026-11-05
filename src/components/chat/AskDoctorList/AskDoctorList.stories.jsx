import { AskDoctorList } from './AskDoctorList'
import { marcusPlan } from '../fixtures'

export default { title: 'Plan/AskDoctorList', component: AskDoctorList, tags: ['autodocs'] }

export const Marcus = { args: { recs: marcusPlan.askDoctor } }
