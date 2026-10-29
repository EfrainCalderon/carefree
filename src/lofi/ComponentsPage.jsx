// Component showcase for the chat lofi: tokens, shadcn primitives, and Carefree chat widgets.
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { groupByVisit } from '@/lib/visits'
import { AGE_RANGES, SEXUAL_HEALTH, buildPlan, eligibleRecs, pickStat } from './logic'
import { PlanPanel } from './ChatApp'
import {
  AddedLine, Bubble, Chips, Composer, DoctorFinderCard, MentalHealthCard, NoteCard,
  OptInCard, OutputPreview, PlanSnapshot, SexualHealthCard, StatCard, VisitCard,
} from './widgets'

const COLOR_TOKENS = [
  'neutral-0', 'neutral-50', 'neutral-100', 'neutral-200', 'neutral-400', 'neutral-500', 'neutral-600', 'neutral-800', 'neutral-900',
  'grade-a-bg', 'grade-a-text', 'grade-b-bg', 'grade-b-text', 'grade-conditional-accent', 'feedback-error',
]
const SEMANTIC = ['background', 'card', 'primary', 'muted', 'muted-foreground', 'border', 'success', 'info', 'caution', 'destructive']
const TYPE = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl']

function Section({ id, title, note, children }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>
      {children}
    </section>
  )
}

function Specimen({ name, children, wide }) {
  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      <p className="mb-2 font-mono text-xs text-muted-foreground">{name}</p>
      <div className="rounded-xl border bg-background p-4">{children}</div>
    </div>
  )
}

export function ComponentsPage({ data }) {
  // Sample person: Marcus, 45–49, male, employer insurance, said yes to heart + weight.
  const range = AGE_RANGES.find(r => r.id === '45-49')
  const eligible = eligibleRecs(data.recs, range, 'male')
  const plan = buildPlan(eligible, { heart: 'yes', weight: 'some', smoking: 'former' })
  const visits = groupByVisit(plan.planned, data.visits)
  const [chip, setChip] = useState(null)
  const [opt, setOpt] = useState(null)
  const [sh, setSh] = useState(null)
  const sections = [['tokens', 'Tokens'], ['primitives', 'shadcn primitives'], ['chat', 'Chat'], ['cards', 'Cards'], ['plan', 'Plan']]

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex items-center gap-2"><span className="font-semibold">Carefree</span><Badge variant="outline">Components</Badge></div>
          <Button variant="ghost" asChild className="h-10"><a href="#/">Back to chat</a></Button>
        </div>
        <nav aria-label="Sections" className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-2">
          {sections.map(([id, label]) => (
            <Button key={id} variant="ghost" size="sm" asChild><a href={`#${id}`} onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}>{label}</a></Button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl space-y-14 px-4 py-8">
        <Section id="tokens" title="Tokens" note="From src/tokens.css (Tokens Studio → Style Dictionary). shadcn theme variables point at these.">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium">Carefree color tokens</h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
                {COLOR_TOKENS.map(t => (
                  <div key={t} className="text-xs">
                    <div className="h-12 rounded-lg border" style={{ background: `var(--cf-color-${t})` }} />
                    <p className="mt-1 font-mono break-all">{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">shadcn semantic → token</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {SEMANTIC.map(t => (
                  <div key={t} className="text-xs">
                    <div className="h-10 rounded-lg border" style={{ background: `var(--${t})` }} />
                    <p className="mt-1 font-mono">--{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Type scale</h3>
              <div className="space-y-1">
                {TYPE.map(t => (
                  <p key={t} style={{ fontSize: `var(--cf-fontSize-${t})` }}>
                    <span className="mr-3 font-mono text-xs text-muted-foreground">{t}</span>Book a preventive visit
                  </p>
                ))}
              </div>
            </div>
            <NoteCard>Gaps: no radius or shadow tokens yet, no dark theme, no category colors. The lofi hardcodes radius in index.css.</NoteCard>
          </div>
        </Section>

        <Separator />

        <Section id="primitives" title="shadcn primitives" note="Stock shadcn/ui (radix-nova style), themed with Carefree tokens.">
          <div className="grid gap-6 md:grid-cols-2">
            <Specimen name="Button">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button><Button variant="link">Link</Button><Button disabled>Disabled</Button>
              </div>
            </Specimen>
            <Specimen name="Badge">
              <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge></div>
            </Specimen>
            <Specimen name="Input + Label">
              <div className="space-y-1.5"><Label htmlFor="demo-in">Email</Label><Input id="demo-in" placeholder="you@example.com" /></div>
            </Specimen>
            <Specimen name="ToggleGroup">
              <ToggleGroup type="single" variant="outline" defaultValue="b">
                <ToggleGroupItem value="a">Never</ToggleGroupItem><ToggleGroupItem value="b">I used to</ToggleGroupItem><ToggleGroupItem value="c">I still do</ToggleGroupItem>
              </ToggleGroup>
            </Specimen>
            <Specimen name="Card">
              <Card><CardHeader><CardTitle>Card title</CardTitle><CardDescription>Supporting description</CardDescription></CardHeader><CardContent>Body content</CardContent></Card>
            </Specimen>
            <Specimen name="Sheet">
              <div className="flex gap-2">
                {['right', 'bottom'].map(side => (
                  <Sheet key={side}>
                    <SheetTrigger asChild><Button variant="outline">Open {side}</Button></SheetTrigger>
                    <SheetContent side={side} className={side === 'bottom' ? 'rounded-t-2xl' : ''}>
                      <SheetHeader><SheetTitle>Sheet ({side})</SheetTitle><SheetDescription>Used for the plan on mobile (bottom) and tablet (right).</SheetDescription></SheetHeader>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </Specimen>
          </div>
        </Section>

        <Separator />

        <Section id="chat" title="Chat" note="Conversation building blocks.">
          <div className="grid gap-6 md:grid-cols-2">
            <Specimen name="Bubble (assistant / user)">
              <div className="space-y-3"><Bubble role="assistant">First, how old are you?</Bubble><Bubble role="user">45–49</Bubble></div>
            </Specimen>
            <Specimen name="Chips (tap to answer, locks after)">
              <Chips keepAfterAnswer label="Demo" options={AGE_RANGES} value={chip} onSelect={o => setChip(o.id)} />
              {chip && <Button variant="link" className="mt-2 px-0" onClick={() => setChip(null)}>Reset</Button>}
            </Specimen>
            <Specimen name="Composer (voice disabled)" wide>
              <Composer onSend={() => {}} />
            </Specimen>
            <Specimen name="AddedLine">
              <div className="space-y-3">
                <AddedLine added={plan.planned.filter(r => r.conditional).slice(0, 2)} removed={[]} />
                <AddedLine added={[]} removed={[{ id: 'x' }]} />
                <AddedLine />
              </div>
            </Specimen>
          </div>
        </Section>

        <Separator />

        <Section id="cards" title="Cards" note="Widgets the assistant shows in the conversation.">
          <div className="grid gap-6 md:grid-cols-2">
            <Specimen name="OutputPreview"><OutputPreview /></Specimen>
            <Specimen name="StatCard (45–49, male)"><StatCard stat={pickStat(range, 'male')} /></Specimen>
            <Specimen name="PlanSnapshot"><PlanSnapshot visits={visits} askCount={plan.askDoctor.length} onOpen={() => {}} /></Specimen>
            <Specimen name="OptInCard"><OptInCard count={4} value={opt} onChoose={o => setOpt(o.id)} /></Specimen>
            <Specimen name="SexualHealthCard"><SexualHealthCard factors={SEXUAL_HEALTH.factors} value={sh} onChoose={o => setSh(o.id)} /></Specimen>
            <Specimen name="MentalHealthCard"><MentalHealthCard /></Specimen>
            <Specimen name="DoctorFinderCard (stub)"><DoctorFinderCard reason="none" /></Specimen>
            <Specimen name="NoteCard"><NoteCard>Medicaid covers these free in most states.</NoteCard></Specimen>
          </div>
        </Section>

        <Separator />

        <Section id="plan" title="Plan" note="The checkout-style plan: side panel on desktop, sheet on tablet and mobile.">
          <div className="grid gap-6 md:grid-cols-2">
            <Specimen name="VisitCard">{visits[0] && <VisitCard visit={visits[0]} index={0} defaultOpen />}</Specimen>
            <Specimen name="PlanPanel (sample: Marcus)"><PlanPanel plan={{ ...plan, visits }} ready /></Specimen>
          </div>
        </Section>
      </main>
    </div>
  )
}
