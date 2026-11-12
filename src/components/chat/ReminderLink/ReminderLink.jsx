// ReminderLink: Adds a reminder to book the first visit to the person's own calendar. The plan is only useful
// once the call is made, so this puts the script where they'll see it at a time an office is open.
// It is a plain link to a calendar file, built in the browser: nothing is sent anywhere.
import { useMemo } from 'react'
import { CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildReminder } from '@/lib/reminder'

const DAY = new Intl.DateTimeFormat('en-US', { weekday: 'long' })

export function ReminderLink({ plan }) {
  const reminder = useMemo(() => buildReminder(plan), [plan])
  if (!reminder) return null
  return (
    <Button asChild variant="outline" className="w-full whitespace-normal">
      <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent(reminder.ics)}`} download="book-my-visit.ics">
        <CalendarPlus />Remind me {DAY.format(reminder.start)} at 9
      </a>
    </Button>
  )
}
