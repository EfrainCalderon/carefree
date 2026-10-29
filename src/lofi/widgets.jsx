// Chat widgets for the lofi. Built on shadcn/ui primitives, themed by --cf-* tokens.
import { useState } from 'react'
import { Check, ChevronDown, Mail, MapPin, Mic, Phone, Plus, SendHorizonal, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/* ── Conversation basics ───────────────────────────────────────── */

export function Bubble({ role, children }) {
  const mine = role === 'user'
  return (
    <div className={cn('flex w-full', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed',
          mine ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-card border rounded-bl-md'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function Typing() {
  return (
    <div className="flex gap-1 px-4 py-3" aria-label="Carefree is typing" role="status">
      {[0, 1, 2].map(i => (
        <span key={i} className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  )
}

// Tap-to-answer options. In the chat they disappear once answered (the reply bubble shows the choice);
// pass keepAfterAnswer to show the locked state instead.
export function Chips({ options, value, onSelect, label, keepAfterAnswer }) {
  const done = value != null
  if (done && !keepAfterAnswer) return null
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(o => {
        const picked = value === o.id
        return (
          <Button
            key={o.id}
            variant={picked ? 'default' : 'outline'}
            className={cn('h-11 rounded-full px-4 text-sm', done && (picked ? 'disabled:opacity-100' : 'opacity-40'))}
            aria-pressed={picked}
            disabled={done}
            onClick={() => onSelect(o)}
          >
            {picked && <Check />}
            {o.label}
          </Button>
        )
      })}
    </div>
  )
}

export function Composer({ onSend, hint }) {
  const [text, setText] = useState('')
  const send = e => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }
  return (
    <form onSubmit={send} className="flex items-center gap-2 rounded-2xl border bg-card p-1.5 pl-4 shadow-sm">
      <Label htmlFor="composer" className="sr-only">Message</Label>
      <input
        id="composer"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={hint || 'Type or tap an option'}
        className="h-10 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
        autoComplete="off"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          {/* aria-disabled keeps it focusable so the tooltip explains why */}
          <Button type="button" variant="ghost" size="icon-lg" aria-disabled="true" className="size-11 opacity-50" aria-label="Voice input (coming later)">
            <Mic />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Voice is coming later</TooltipContent>
      </Tooltip>
      <Button type="submit" size="icon-lg" className="size-11" aria-label="Send" disabled={!text.trim()}>
        <SendHorizonal />
      </Button>
    </form>
  )
}

/* ── Cards ─────────────────────────────────────────────────────── */

// Tells people up front what they'll leave with.
export function OutputPreview() {
  return (
    <Card size="sm" className="max-w-md">
      <CardContent className="flex items-center gap-4">
        <div aria-hidden className="w-16 shrink-0 rounded-md border bg-background p-2 shadow-sm">
          <div className="h-1.5 w-8 rounded bg-foreground/70" />
          {[10, 12, 9, 11].map((w, i) => (
            <div key={i} className="mt-1.5 h-1 rounded bg-muted-foreground/30" style={{ width: `${w * 4}px` }} />
          ))}
        </div>
        <div className="text-sm">
          <p className="font-medium">You’ll leave with a 1-page visit plan</p>
          <p className="text-muted-foreground">What to book, what to say, and what’s covered. Email it to yourself.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatCard({ stat }) {
  if (!stat) return null
  return (
    <Card className="max-w-md">
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{stat.big}</p>
        <p className="mt-1 text-[15px]">{stat.text}</p>
        <p className="mt-2 text-sm font-medium text-success">{stat.action}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Source: {stat.source} <Badge variant="outline" className="ml-1">Draft · verify</Badge>
        </p>
      </CardContent>
    </Card>
  )
}

export function NoteCard({ children }) {
  return (
    <div className="max-w-md rounded-xl border border-l-4 border-l-caution bg-card px-4 py-3 text-sm">{children}</div>
  )
}

// Compact summary of the plan inside the conversation.
export function PlanSnapshot({ visits, askCount, onOpen }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Your visit plan</CardTitle>
        <CardDescription>
          {visits.length} {visits.length === 1 ? 'visit' : 'visits'}
          {askCount > 0 && ` · ${askCount} to ask your doctor about`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2">
          {visits.map((v, i) => (
            <li key={v.id} className="flex items-baseline justify-between gap-3 text-sm">
              <span><span className="text-muted-foreground mr-2">{i + 1}</span>{v.name}</span>
              <span className="text-muted-foreground shrink-0">{v.items.length} {v.items.length === 1 ? 'item' : 'items'}</span>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="h-10 w-full" onClick={onOpen}>Open your plan</Button>
      </CardFooter>
    </Card>
  )
}

export function OptInCard({ count, value, onChoose }) {
  return (
    <Card className="max-w-md">
      <CardContent className="space-y-3">
        <p className="text-[15px]">
          <span className="font-medium">A few quick questions could add up to {count} more free {count === 1 ? 'screening' : 'screenings'}.</span>{' '}
          <span className="text-muted-foreground">Skip any you like. Your answers stay on this device.</span>
        </p>
        <Chips
          label="Improve your plan?"
          keepAfterAnswer
          value={value}
          onSelect={onChoose}
          options={[{ id: 'yes', label: 'Improve my plan' }, { id: 'no', label: 'I’m good' }]}
        />
      </CardContent>
    </Card>
  )
}

export function AddedLine({ added = [], removed = [] }) {
  if (!added.length && !removed.length)
    return <p className="text-sm text-muted-foreground">Got it. No change to your plan.</p>
  return (
    <div className="space-y-1 text-sm">
      {added.map(r => (
        <p key={r.id} className="flex items-center gap-1.5 font-medium text-success"><Plus className="size-4" />{r.plain_name} added</p>
      ))}
      {removed.length > 0 && <p className="text-muted-foreground">{removed.length} {removed.length === 1 ? 'item doesn’t' : 'items don’t'} apply, so we took {removed.length === 1 ? 'it' : 'them'} off.</p>}
    </div>
  )
}

// Passive self-select card. Never records which factor applies.
export function SexualHealthCard({ factors, value, onChoose }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Some free tests depend on your sexual health</CardTitle>
        <CardDescription>If any of these have been true for you in the last year, they’re worth asking about. No need to say which.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {factors.map(f => <li key={f}>{f}</li>)}
        </ul>
        <Chips
          label="Add sexual health tests?"
          keepAfterAnswer
          value={value}
          onSelect={onChoose}
          options={[{ id: 'yes', label: 'Add these tests' }, { id: 'no', label: 'Not for me' }]}
        />
      </CardContent>
    </Card>
  )
}

export function MentalHealthCard() {
  return (
    <Card size="sm" className="max-w-md">
      <CardHeader>
        <CardTitle>Your doctor will likely ask how you’ve been feeling</CardTitle>
        <CardDescription>It’s a normal part of the checkup, and it’s covered. Questions sound like:</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5 text-sm italic text-muted-foreground">
          <li>“Over the last 2 weeks, how often have you felt little interest in doing things?”</li>
          <li>“How often have you felt nervous, anxious, or on edge?”</li>
          <li>“How often do you have 5 or more drinks at once?”</li>
        </ul>
      </CardContent>
    </Card>
  )
}

// Stub: real version reads HRSA health center data and computes distance on-device.
export function DoctorFinderCard({ reason }) {
  const [zip, setZip] = useState('')
  const [shown, setShown] = useState(false)
  const valid = /^\d{5}$/.test(zip)
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Stethoscope className="size-4" />Find a clinic near you</CardTitle>
        <CardDescription>
          {reason === 'none'
            ? 'Community health centers charge based on what you can pay.'
            : 'Community health centers take most insurance, Medicaid, and Medicare, and can be your regular doctor.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!shown ? (
          <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (valid) setShown(true) }}>
            <div className="flex-1">
              <Label htmlFor="zip" className="sr-only">ZIP code</Label>
              <Input id="zip" inputMode="numeric" maxLength={5} placeholder="ZIP code" className="h-10" value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))} />
            </div>
            <Button type="submit" className="h-10" disabled={!valid}>Find</Button>
          </form>
        ) : (
          <div className="space-y-3">
            <Badge variant="outline">Sample results · not real clinics</Badge>
            {['Sample Community Health Center', 'Sample Family Clinic', 'Sample Neighborhood Health'].map((n, i) => (
              <div key={n} className="flex items-start justify-between gap-3 border-t pt-3 text-sm first-of-type:border-t-0">
                <div>
                  <p className="font-medium">{n}</p>
                  <p className="text-muted-foreground flex items-center gap-1"><MapPin className="size-3.5" />{(1.2 + i * 1.7).toFixed(1)} mi · Sliding-scale fees</p>
                </div>
                <Button variant="outline" size="lg" className="h-10" aria-label={`Call ${n}`}><Phone />Call</Button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          ZIP stays on your device. Or search{' '}
          <a className="underline" href="https://findahealthcenter.hrsa.gov/" target="_blank" rel="noreferrer">HRSA’s Find a Health Center</a>.
        </p>
      </CardContent>
    </Card>
  )
}

/* ── Plan ──────────────────────────────────────────────────────── */

export function VisitCard({ visit, index, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <Card size="sm">
      <button
        className="flex w-full items-start gap-3 px-4 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-lg"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{index + 1}</span>
        <span className="flex-1">
          <span className="block font-medium">{visit.name}</span>
          <span className="block text-sm text-muted-foreground">{visit.who}</span>
        </span>
        <ChevronDown className={cn('mt-1 size-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <CardContent className="space-y-3">
          <ul className="space-y-2.5">
            {visit.items.map(({ rec, step, note }) => (
              <li key={rec.id + step.action} className="text-sm">
                <p className="font-medium">{step.action}</p>
                <p className="text-muted-foreground">
                  {rec.plain_name}{note && ` · ${note}`}
                </p>
              </li>
            ))}
          </ul>
          {visit.booking_tip && <p className="rounded-lg bg-muted p-3 text-sm">{visit.booking_tip}</p>}
          <p className="text-xs font-medium text-success">{visit.coverage}</p>
        </CardContent>
      )}
    </Card>
  )
}

export function AskDoctorList({ recs }) {
  if (!recs.length) return null
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Ask your doctor whether these apply</h3>
      <ul className="space-y-2">
        {recs.map(r => (
          <li key={r.id} className="rounded-lg border bg-card p-3 text-sm">
            <p className="font-medium">{r.plain_name}</p>
            <p className="text-muted-foreground">{r.condition_note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Stub: the real version posts to api/send-plan.js (Resend).
export function EmailPlanForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <p role="status" className="rounded-lg bg-success-soft p-3 text-sm text-success">
        Prototype: nothing was sent. The real version emails your plan to {email}.
      </p>
    )
  return (
    <form className="space-y-2" onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSent(true) }}>
      <Label htmlFor="plan-email">Email this plan to yourself</Label>
      <div className="flex gap-2">
        <Input id="plan-email" type="email" placeholder="you@example.com" className="h-10" value={email} onChange={e => setEmail(e.target.value)} />
        <Button type="submit" className="h-10" disabled={!email.includes('@')}><Mail />Send</Button>
      </div>
    </form>
  )
}
