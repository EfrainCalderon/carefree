// Chat widgets for the lofi. Built on shadcn/ui primitives, themed by --cf-* tokens.
import { useState } from 'react'
import { ArrowUp, Check, ChevronDown, FlaskConical, Gauge, Info, Mail, MapPin, MessageCircle, Mic, Phone, Pill, Plus, Split, Stethoscope } from 'lucide-react'
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
          'max-w-[85%] px-3.5 py-2.5 text-base leading-normal',
          mine ? 'cf-gradient-bubble rounded-bubble rounded-br-tail' : 'bg-card border rounded-bubble rounded-bl-tail'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function Typing() {
  return (
    <div className="flex w-fit gap-1.5 rounded-bubble rounded-bl-tail border bg-card px-4 py-3.5" aria-label="Carefree is typing" role="status">
      {[0, 1, 2].map(i => (
        <span key={i} className="size-2 rounded-full bg-outline animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  )
}

// Tap-to-answer options. In the chat they disappear once answered (the reply bubble shows the choice);
// pass keepAfterAnswer to show the locked state instead.
export function Chips({ options, value, onSelect, label, keepAfterAnswer, onChange }) {
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
            className={cn('rounded-full px-4', done && picked && 'disabled:bg-primary disabled:text-primary-foreground', done && !picked && 'disabled:bg-tint disabled:border-tint disabled:text-muted-foreground')}
            aria-pressed={picked}
            disabled={done}
            onClick={() => onSelect(o)}
          >
            {picked && <Check />}
            {o.label}
          </Button>
        )
      })}
      {done && onChange && (
        <button type="button" onClick={onChange} className="min-h-11 px-1 text-[15px] font-semibold text-primary underline underline-offset-3">Change answer</button>
      )}
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
    <form onSubmit={send} className="flex items-center gap-1 rounded-composer border border-outline bg-card p-1 pl-4.5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
      <Label htmlFor="composer" className="sr-only">Message</Label>
      <input
        id="composer"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={hint || 'Tap an answer above, or type here'}
        className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:outline-none placeholder:text-muted-foreground"
        autoComplete="off"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          {/* aria-disabled keeps it focusable so the tooltip explains why */}
          <Button type="button" variant="ghost" size="icon-lg" aria-disabled="true" className="rounded-full text-faint hover:bg-transparent hover:text-faint" aria-label="Voice input, coming later">
            <Mic />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Voice is coming later</TooltipContent>
      </Tooltip>
      <Button type="submit" size="icon-lg" className="rounded-full" aria-label="Send" disabled={!text.trim()}>
        <ArrowUp className="size-5" />
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
        <div aria-hidden className="flex h-[66px] w-[52px] shrink-0 flex-col overflow-hidden rounded-[6px] border bg-card">
          <div className="cf-gradient h-4" />
          <div className="flex flex-col gap-1 p-1.5">
            {['100%', '70%', '100%', '60%'].map((w, i) => <div key={i} className="h-1 rounded-sm bg-[var(--cf-color-green-200)]" style={{ width: w }} />)}
          </div>
        </div>
        <div>
          <p className="font-extrabold">You’ll leave with a 1-page visit plan</p>
          <p className="text-muted-foreground">What to book, what to say, and what’s covered. Email it to yourself, no account needed.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatCard({ stat }) {
  if (!stat) return null
  return (
    <div className="cf-gradient relative isolate flex max-w-md flex-col gap-1.5 overflow-hidden rounded-card p-5">
      <Grain />
      <p className="text-[40px] leading-none font-extrabold tracking-tight">{stat.big}</p>
      <p className="text-base text-[var(--cf-color-green-100)]">{stat.text}</p>
      <p className="text-[15px] font-semibold">{stat.action}</p>
      <p className="mt-1 text-[13px] text-[var(--cf-color-green-200)]">
        Source: {stat.source} <span className="ml-1 rounded-full border border-white/40 px-2 py-0.5 text-xs">Draft · verify</span>
      </p>
    </div>
  )
}

export function NoteCard({ children }) {
  return (
    <div className="flex max-w-md gap-3 rounded-card border bg-card p-4 text-[15px]">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><Info className="size-4" /></span>
      <div className="pt-1">{children}</div>
    </div>
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
        <ol className="space-y-2.5">
          {visits.map((v, i) => (
            <li key={v.id} className="flex items-center gap-2.5">
              <Num n={i + 1} />
              <span className="flex-1">{v.name}</span>
              <span className="shrink-0 text-sm text-muted-foreground">{v.items.length} {v.items.length === 1 ? 'thing' : 'things'}</span>
            </li>
          ))}
        </ol>
        <Button className="mt-4 w-full" onClick={onOpen}>Open your plan</Button>
      </CardContent>
    </Card>
  )
}

export function OptInCard({ count, value, onChoose }) {
  return (
    <Card className="max-w-md">
      <CardContent className="space-y-3">
        <p className="text-[15px]">
          <span className="block text-[17px] leading-snug font-extrabold">A few quick questions could add up to {count} more free {count === 1 ? 'screening' : 'screenings'}.</span>
          <span className="text-muted-foreground">About a minute. Skip any question. Your answers stay on this device.</span>
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

const pill = 'inline-flex min-h-8 items-center gap-2 rounded-full py-1 pr-3 pl-2 text-sm font-semibold text-foreground'

export function AddedLine({ added = [], removed = [] }) {
  if (!added.length && !removed.length)
    return <p role="status" className={cn(pill, 'border bg-card')}><Check className="size-4" />Got it. Nothing new to add.</p>
  return (
    <div role="status" className="flex flex-col items-start gap-1.5">
      {added.map(r => (
        <p key={r.id} className={cn(pill, 'bg-tint')}><Plus className="size-4" />{r.plain_name} added</p>
      ))}
      {removed.length > 0 && <p className="text-sm text-muted-foreground">{removed.length} {removed.length === 1 ? 'item doesn’t' : 'items don’t'} apply, so we took {removed.length === 1 ? 'it' : 'them'} off.</p>}
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
        <ul className="list-disc space-y-1 pl-5">
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
        <ul className="space-y-1.5 rounded-control bg-tint-subtle py-3 pr-3.5 pl-7.5 list-disc">
          <li>“Over the last 2 weeks, how often have you felt little interest in doing things?”</li>
          <li>“How often have you felt nervous, anxious, or on edge?”</li>
          <li>“How often do you have 5 or more drinks at once?”</li>
        </ul>
        <p className="mt-3 text-muted-foreground">Share as much or as little as you want. If you’re struggling right now, you can call or text 988 any time.</p>
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
              <Input id="zip" inputMode="numeric" maxLength={5} placeholder="e.g. 07052" value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))} />
            </div>
            <Button type="submit" disabled={!valid}>Find</Button>
          </form>
        ) : (
          <div className="space-y-3">
            <span className="cf-label">Sample results · not real clinics</span>
            {['Sample Community Health Center', 'Sample Family Clinic', 'Sample Neighborhood Health'].map((n, i) => (
              <div key={n} className="flex items-center justify-between gap-3 border-t border-tint pt-3">
                <div>
                  <p className="font-semibold">{n}</p>
                  <p className="flex items-center gap-1 text-[13px] text-muted-foreground"><MapPin className="size-3.5" />{(1.2 + i * 1.7).toFixed(1)} mi · Call to check hours</p>
                  <span className="mt-1 inline-flex rounded-full bg-tint px-2.5 py-0.5 text-xs font-semibold">Sliding-scale fees</span>
                </div>
                <Button variant="outline" aria-label={`Call ${n}`}><Phone />Call</Button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-[13px] text-muted-foreground">
          ZIP stays on your device. Or search{' '}
          <a className="underline" href="https://findahealthcenter.hrsa.gov/" target="_blank" rel="noreferrer">HRSA’s Find a Health Center</a>.
        </p>
      </CardContent>
    </Card>
  )
}

/* ── Plan ──────────────────────────────────────────────────────── */

// What kind of thing happens at a visit step (journey.as), shown as a small icon + label.
const CATEGORY = {
  measurement: { label: 'Check', Icon: Gauge },
  exam: { label: 'Check', Icon: Gauge },
  question: { label: 'Questions', Icon: MessageCircle },
  counseling: { label: 'Questions', Icon: MessageCircle },
  lab: { label: 'Test', Icon: FlaskConical },
  order: { label: 'Test', Icon: FlaskConical },
  procedure: { label: 'Choice', Icon: Split },
  prescription: { label: 'Rx', Icon: Pill },
}

export function VisitCard({ visit, index, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="rounded-card border bg-card">
      <button
        className="flex min-h-16 w-full items-center gap-3 rounded-card px-3.5 py-3 text-left hover:bg-tint-subtle"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <Num n={index + 1} on={open} size="lg" />
        <span className="flex-1">
          <span className="block text-lg leading-tight font-extrabold">{visit.name}</span>
          <span className="block text-sm text-muted-foreground">{visit.who}</span>
        </span>
        <ChevronDown className={cn('size-4 shrink-0 transition-transform duration-(--cf-motion-base)', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="cf-label pb-1">What should happen</p>
          <ul>
            {visit.items.map(({ rec, step, note }) => {
              const cat = CATEGORY[step.as] || CATEGORY.question
              return (
                <li key={rec.id + step.action} className="flex items-start gap-3 border-t border-tint py-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><cat.Icon className="size-4" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-semibold">{rec.plain_name}</p>
                      <span className="cf-label shrink-0">{cat.label}</span>
                    </div>
                    <p className="text-[15px] text-muted-foreground">{step.action}{note && ` · ${note}`}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          {visit.booking_tip && <p className="mt-2 rounded-control bg-tint px-3 py-2.5 text-[15px]"><strong>When you book:</strong> {visit.booking_tip}</p>}
          <p className="pt-2 text-sm text-muted-foreground">{visit.coverage}</p>
        </div>
      )}
    </div>
  )
}

export function AskDoctorList({ recs }) {
  if (!recs.length) return null
  return (
    <div className="space-y-2">
      <h3 className="cf-label px-1">Ask your doctor about</h3>
      <ul className="rounded-card border bg-card px-4 py-1">
        {recs.map(r => (
          <li key={r.id} className="flex flex-col gap-0.5 border-t border-tint py-3 first:border-t-0">
            <p className="font-semibold">{r.plain_name}</p>
            <p className="text-[15px] text-muted-foreground">{r.condition_note}</p>
            {r.doctor_prompt && <p className="text-[15px]">{r.doctor_prompt}</p>}
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
      <p role="status" className="rounded-control bg-tint p-3 text-[15px]">
        Prototype: nothing was sent. The real version emails your plan to {email}.
      </p>
    )
  return (
    <form className="space-y-2" onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSent(true) }}>
      <Label htmlFor="plan-email" className="text-[15px] font-semibold">Email this plan to yourself</Label>
      <div className="flex gap-2">
        <Input id="plan-email" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Button type="submit" disabled={!email.includes('@')}><Mail />Send</Button>
      </div>
      <p className="text-[13px] text-muted-foreground">Sent once. No account, no mailing list.</p>
    </form>
  )
}

/* ── Shared bits ──────────────────────────────────────────────── */

// Numbered visit badge. `on` = the open visit (solid), otherwise tint.
export function Num({ n, on, size }) {
  return (
    <span className={cn(
      'flex shrink-0 items-center justify-center rounded-control font-extrabold',
      size === 'lg' ? 'size-10 text-[19px]' : 'size-7 text-sm',
      on ? 'bg-primary text-primary-foreground shadow-[inset_0_0_0_2px_var(--primary),inset_0_0_0_4px_#fff]' : 'bg-tint text-primary'
    )}>{n}</span>
  )
}

// Film grain over the brand gradient (16% overlay).
export function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full opacity-16 mix-blend-overlay">
      <filter id="cf-grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#cf-grain)" />
    </svg>
  )
}
