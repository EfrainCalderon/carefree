// Sends the sample plan emails for real, through Resend, so they can be checked in an actual inbox.
//   npm run email:send -- you@example.com
// Uses RESEND_API_KEY from .env.local. Sends three emails to the one address given.
import { readFileSync } from 'node:fs'
import { Resend } from 'resend'
import { prepareEmail } from '../api/send-plan.js'

const to = process.argv[2]
if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to)) {
  console.error(`"${to ?? ''}" isn't a full email address. Put a real one after the dashes, for example:\n  npm run email:send -- name@example.com`)
  process.exit(1)
}
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '')
}

const samples = {
  'Marcus, 47, insured through work, after the extra questions': { age: '45-49', sex: 'male', insurance: 'private', personal: { heart: 'unsure', smoking: 'former', weight: 'some' }, sexual: 'yes', improved: true },
  'Linda, 67, Medicare': { age: '65-75', sex: 'female', insurance: 'medicare', personal: {} },
  'Sam, 29, no insurance': { age: '18-34', sex: 'male', insurance: 'none', personal: {} },
}
const resend = new Resend(process.env.RESEND_API_KEY)
for (const [name, answers] of Object.entries(samples)) {
  const message = prepareEmail({ email: to, answers })
  const { data, error } = await resend.emails.send({ from: 'Carefree <hi@efrain.design>', ...message, subject: `${message.subject} (test: ${name})` })
  console.log(error ? `FAILED ${name}: ${error.message}` : `sent ${name} · id ${data.id}`)
}
