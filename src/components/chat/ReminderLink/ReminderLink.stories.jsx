import { ReminderLink } from './ReminderLink'
import { lindaPlan, marcusPlan } from '../fixtures'

export default { title: 'Plan/ReminderLink', component: ReminderLink, tags: ['autodocs'], decorators: [S => <div className="max-w-[320px]"><S /></div>] }

// Downloads a calendar file for the next weekday at 9:00, holding only the booking script.
export const Default = { args: { plan: marcusPlan } }
export const Medicare = { args: { plan: lindaPlan } }
