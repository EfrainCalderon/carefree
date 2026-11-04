// EmailPlanForm: Email the plan to yourself (stub).
import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Stub: the real version posts to api/send-plan.js (Resend).
export function EmailPlanForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <p role="status" className="rounded-control bg-tint p-2">
        Prototype: nothing was sent. The real version emails your plan to {email}.
      </p>
    )
  return (
    <form className="space-y-1" onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSent(true) }}>
      <Label htmlFor="plan-email" className="text-body font-semibold">Email this plan to yourself</Label>
      <div className="flex gap-1">
        <Input id="plan-email" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Button type="submit" disabled={!email.includes('@')}><Mail />Send</Button>
      </div>
      <p className="text-body text-muted-foreground">Sent once. No account, no mailing list.</p>
    </form>
  )
}
