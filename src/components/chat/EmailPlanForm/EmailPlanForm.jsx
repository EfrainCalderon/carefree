// EmailPlanForm: Email the plan to yourself. The form posts the answers, not the plan: the server rebuilds
// the plan from them (api/send-plan.js), so the email can only ever contain a real Carefree plan.
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

async function postPlan(email, answers) {
  const res = await fetch('/api/send-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, answers }),
  })
  if (!res.ok) throw Object.assign(new Error('send failed'), { status: res.status })
}

// send: how the plan is sent. Stories pass a stand-in so nothing leaves Storybook.
export function EmailPlanForm({ answers, send = postPlan }) {
  const [email, setEmail] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed | limited

  const submit = async e => {
    e.preventDefault()
    const to = email.trim()
    if (!VALID.test(to)) return setInvalid(true)
    setStatus('sending')
    try {
      await send(to, answers)
      setStatus('sent')
    } catch (err) {
      setStatus(err?.status === 429 ? 'limited' : 'failed')
    }
  }

  if (status === 'sent')
    return (
      <div role="status">
        <p className="font-semibold">Sent to {email.trim()}</p>
        <p className="text-muted-foreground">If it isn’t there in a minute, check your spam folder.</p>
        <Button variant="link" className="px-0" onClick={() => setStatus('idle')}>Send to another address</Button>
      </div>
    )

  const sending = status === 'sending'
  return (
    <form className="space-y-1" onSubmit={submit} noValidate>
      <Label htmlFor="plan-email" className="font-semibold">Your email address</Label>
      <div className="flex gap-1">
        <Input
          id="plan-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="name@example.com"
          value={email}
          aria-invalid={invalid}
          aria-describedby={invalid ? 'plan-email-error' : undefined}
          onChange={e => { setEmail(e.target.value); if (invalid && VALID.test(e.target.value.trim())) setInvalid(false) }}
        />
        <Button type="submit" disabled={!email.trim() || sending}>{sending ? 'Sending…' : 'Send'}</Button>
      </div>
      {invalid && <p id="plan-email-error" role="alert" className="text-destructive">Enter a full email address, like name@example.com.</p>}
      {status === 'failed' && <p role="alert" className="text-destructive">We couldn’t send your plan. Check your connection and try again, or print it instead.</p>}
      {status === 'limited' && <p role="alert" className="text-destructive">That’s the limit for now. You can send it again in an hour, or print it instead.</p>}
    </form>
  )
}
