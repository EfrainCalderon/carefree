// EmailPlanForm: Email the plan to yourself (stub).
import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Send is disabled until something is typed. On submit, a malformed address shows a red error
// (the only place Carefree uses red). Stub: the real version posts to api/send-plan.js (Resend).
export function EmailPlanForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <p role="status" className="rounded-control bg-tint p-2">
        Prototype: nothing was sent. The real version emails your plan to {email}.
      </p>
    )
  const submit = e => {
    e.preventDefault()
    if (!VALID.test(email.trim())) return setError(true)
    setSent(true)
  }
  return (
    <form className="space-y-1" onSubmit={submit} noValidate>
      <Label htmlFor="plan-email" className="font-semibold">Email this plan to yourself</Label>
      <div className="flex gap-1">
        <Input
          id="plan-email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          aria-invalid={error}
          aria-describedby={error ? 'plan-email-error' : undefined}
          onChange={e => { setEmail(e.target.value); if (error && VALID.test(e.target.value.trim())) setError(false) }}
        />
        <Button type="submit" disabled={!email.trim()}><Mail />Send</Button>
      </div>
      {error && <p id="plan-email-error" role="alert" className="text-destructive">Enter a full email address, like name@example.com.</p>}
    </form>
  )
}
