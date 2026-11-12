// Emails a plan. The browser posts an address and the answers; the plan is rebuilt here from the same
// data and logic the app uses. Nothing in the email comes from the request, so this can't be used to
// send someone arbitrary content, and the email always matches a real plan.
import { createRequire } from 'node:module'
import { Resend } from 'resend'
import { allowRecipient, guard } from './_guard.js'
import { cleanAnswers, derivePlan } from '../src/app/logic.js'
import { buildPlanEmail } from '../src/lib/planEmail.js'

const require = createRequire(import.meta.url)
const data = {
  recs: require('../public/data/recommendations.json').recommendations,
  visits: require('../public/data/visits.json').visits,
}

const VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Returns { to, subject, html, text }, or throws with a message that's safe to show.
export function prepareEmail(body) {
  const to = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!VALID_EMAIL.test(to) || to.length > 254) throw new Error('Enter a full email address.')
  const answers = cleanAnswers(body?.answers)
  if (!answers.age || !answers.sex || !answers.insurance) throw new Error('The plan is missing an answer.')
  const plan = derivePlan(data, answers)
  if (!plan.visits.length) throw new Error('There is nothing in this plan to send.')
  return { to, ...buildPlanEmail(plan) }
}

export default async function handler(req, res) {
  // At most 5 plan emails an hour from one visitor, and 3 an hour to any one address.
  if (!guard(req, res, { name: 'plan', max: 5 })) return

  let message
  try {
    message = prepareEmail(req.body)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
  if (!allowRecipient(res, message.to)) return

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: 'Carefree <hi@efrain.design>', ...message })
    if (error) throw new Error(error.message)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
