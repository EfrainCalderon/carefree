// EmailPlanForm: Email the plan to yourself. The form posts the answers, not the plan: the server rebuilds
// the plan from them (api/send-plan.js), so the email can only ever contain a real Carefree plan.
import { useState } from 'react'
import { ExternalLink, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buildPlanEmail } from '@/lib/planEmail'

const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

async function postPlan(email, answers) {
  const res = await fetch('/api/send-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, answers }),
  })
  if (!res.ok) throw new Error('send failed')
}

// preview: don't send; show the email instead. On by default when running locally, where there's no mail server.
export function EmailPlanForm({ plan, answers, preview = import.meta.env.DEV, send = postPlan }) {
  const [email, setEmail] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed | preview
  const [previewUrl, setPreviewUrl] = useState(null)

  const submit = async e => {
    e.preventDefault()
    const to = email.trim()
    if (!VALID.test(to)) return setInvalid(true)
    if (preview) {
      setPreviewUrl(URL.createObjectURL(new Blob([buildPlanEmail(plan).html], { type: 'text/html' })))
      return setStatus('preview')
    }
    setStatus('sending')
    try {
      await send(to, answers)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent')
    return (
      <div role="status" className="space-y-1">
        <p className="font-semibold">Sent to {email.trim()}</p>
        <p className="text-muted-foreground">If it isn’t there in a minute, check your spam folder.</p>
        <Button variant="ghost" className="-ml-2" onClick={() => setStatus('idle')}>Send to another address</Button>
      </div>
    )
  if (status === 'preview')
    return (
      <div role="status" className="space-y-1">
        <p className="font-semibold">Preview only</p>
        <p className="text-muted-foreground">Nothing was sent from this local copy. This is the email {email.trim()} would get.</p>
        <Button asChild variant="outline" className="w-full">
          <a href={previewUrl} target="_blank" rel="noreferrer">See the email<ExternalLink /></a>
        </Button>
      </div>
    )

  const sending = status === 'sending'
  const describedBy = [invalid && 'plan-email-error', 'plan-email-help'].filter(Boolean).join(' ')
  return (
    <form className="space-y-1" onSubmit={submit} noValidate>
      <Label htmlFor="plan-email" className="font-semibold">Email it to yourself</Label>
      <div className="flex gap-1">
        <Input
          id="plan-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="you@email.com"
          value={email}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={e => { setEmail(e.target.value); if (invalid && VALID.test(e.target.value.trim())) setInvalid(false) }}
        />
        <Button type="submit" disabled={!email.trim() || sending}><Mail />{sending ? 'Sending…' : 'Send'}</Button>
      </div>
      {invalid && <p id="plan-email-error" role="alert" className="text-destructive">Enter a full email address, like name@example.com.</p>}
      {status === 'failed' && <p role="alert" className="text-destructive">We couldn’t send your plan. Check your connection and try again, or print it instead.</p>}
      <p id="plan-email-help" className="text-muted-foreground">We only use your address to send this plan.</p>
    </form>
  )
}
