// A calendar reminder to book the first visit, as an .ics file the phone or computer's calendar can open.
// It carries the booking script and nothing else: calendars are often shared or synced to work accounts,
// so what the person plans to ask about stays out of it.

// The next weekday at 9:00, when a doctor's office is likely to pick up.
export function nextWeekdayMorning(from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 9, 0, 0)
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  return d
}

const pad = n => String(n).padStart(2, '0')
// "Floating" local time (no time zone), so 9:00 means 9:00 wherever the person is.
const local = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
const utc = d => `${d.toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`
const esc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
// Lines longer than 75 characters continue on the next line after a space.
const fold = line => line.match(/.{1,73}/gu).join('\r\n ')

export function buildReminder(plan, now = new Date()) {
  const visit = plan.visits.find(v => v.kind === 'book') || plan.visits[0]
  if (!visit) return null
  const start = nextWeekdayMorning(now)
  const end = new Date(start.getTime() + 15 * 60000)
  const title = `Book: ${visit.name}`
  const notes = [
    visit.say ? `When you call, say: “${visit.say}”` : visit.how,
    plan.finder?.ask ? `No doctor yet? ${plan.finder.text} Ask: “${plan.finder.ask}”` : plan.finder?.text,
  ].filter(Boolean).join('\n\n')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Carefree//Plan reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:carefree-${now.getTime()}@carefree`,
    `DTSTAMP:${utc(now)}`,
    `DTSTART:${local(start)}`,
    `DTEND:${local(end)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(notes)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(title)}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].map(fold).join('\r\n')
  return { title, start, ics }
}
