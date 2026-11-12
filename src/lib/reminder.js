// A calendar reminder for next year's preventive visit, as an .ics file the person's own calendar opens.
// It's built in the browser and holds no health details, so nothing is stored or sent: the alternative, an
// email a year from now, would mean keeping people's addresses, which Carefree doesn't do.
const pad = n => String(n).padStart(2, '0')
const day = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
const utc = d => `${d.toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`
const esc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
// Lines longer than 75 characters continue on the next line after a space.
const fold = line => line.match(/.{1,73}/gu).join('\r\n ')

// When the next preventive visit is due: a year from now.
export function nextVisitDate(now = new Date()) {
  return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
}

export function buildNextVisitReminder(now = new Date()) {
  const start = nextVisitDate(now)
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
  const title = 'Schedule my preventive care visit'
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Carefree//Next visit reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:carefree-${now.getTime()}@carefree`,
    `DTSTAMP:${utc(now)}`,
    `DTSTART;VALUE=DATE:${day(start)}`,
    `DTEND;VALUE=DATE:${day(end)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc('A preventive care visit is covered once a year. It has been a year since your last one.')}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(title)}`,
    'TRIGGER:PT9H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].map(fold).join('\r\n')
}
