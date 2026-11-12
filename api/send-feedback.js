// Emails anonymous feedback to the person who makes Carefree. The note is plain text, sent as plain text,
// with the name of the screen it came from. No answers, no address, nothing that says who wrote it.
// FEEDBACK_TO (an environment variable) is where it goes, so the address isn't in the repository.
import { Resend } from 'resend'
import { allowTotal, guard } from './_guard.js'

const SCREEN = /^[a-z:-]{1,40}$/

// Returns the email to send, or throws with a message that's safe to show.
export function prepareFeedback(body) {
  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  if (!message) throw new Error('Write something before sending.')
  if (message.length > 4000) throw new Error('That’s a little long. Keep it under 4,000 characters.')
  const screen = typeof body?.screen === 'string' && SCREEN.test(body.screen) ? body.screen : 'unknown'
  return { subject: 'Carefree feedback', text: `${message}\n\n—\nSent from the "${screen}" screen.` }
}

export default async function handler(req, res) {
  // At most 5 notes an hour from one visitor.
  if (!guard(req, res, { name: 'feedback', max: 5 })) return
  // A field people never see. Anything that fills it in is a script: say thanks and send nothing.
  if (req.body?.website) return res.status(200).json({ ok: true })

  let message
  try {
    message = prepareFeedback(req.body)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
  // And at most 30 notes an hour in total, so the inbox can't be flooded from many places at once.
  if (!allowTotal(res, 'feedback', 30)) return
  if (!process.env.FEEDBACK_TO) {
    console.error('FEEDBACK_TO is not set')
    return res.status(500).json({ error: 'Feedback is not set up' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: 'Carefree <hi@efrain.design>', to: process.env.FEEDBACK_TO, ...message })
    if (error) throw new Error(error.message)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send feedback' })
  }
}
