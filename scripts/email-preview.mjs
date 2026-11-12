// Writes sample plan emails to dist/email/ (HTML and plain text) without sending anything.
// Open them in a browser, or upload the HTML to an email testing tool to see it in real mail clients.
//   npm run email:preview
import { mkdirSync, writeFileSync } from 'node:fs'
import { prepareEmail } from '../api/send-plan.js'

const out = new URL('../dist/email/', import.meta.url)
mkdirSync(out, { recursive: true })

const samples = {
  'marcus-47-private': { age: '45-49', sex: 'male', insurance: 'private', personal: {} },
  'marcus-after-questions': { age: '45-49', sex: 'male', insurance: 'private', personal: { heart: 'unsure', smoking: 'former', weight: 'some' }, sexual: 'yes', improved: true },
  'linda-67-medicare': { age: '65-75', sex: 'female', insurance: 'medicare', personal: {} },
  'sam-29-uninsured': { age: '18-34', sex: 'male', insurance: 'none', personal: {} },
  'ana-36-pregnant': { age: '35-39', sex: 'female', insurance: 'unsure', personal: { pregnancy: 'pregnant', family: 'yes' }, sexual: 'no', improved: true },
}

for (const [name, answers] of Object.entries(samples)) {
  const { subject, html, text } = prepareEmail({ email: 'preview@example.com', answers })
  writeFileSync(new URL(`${name}.html`, out), html)
  writeFileSync(new URL(`${name}.txt`, out), text)
  console.log(`${name}: "${subject}" · ${(html.length / 1024).toFixed(1)} KB`)
}
console.log(`\nWritten to ${out.pathname}`)
