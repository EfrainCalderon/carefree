// Chat-first lofi: a scripted conversation (no LLM yet) that builds a visit plan.
import { useEffect, useMemo, useRef, useState } from 'react'
import { ClipboardList, PanelRightClose } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { groupByVisit } from '@/lib/visits'
import {
  AGE_RANGES, INSURANCE, INSURANCE_NOTES, SEXUAL_HEALTH,
  ageNote, buildPlan, eligibleRecs, pickStat, relevantQuestions, visitForInsurance,
} from './logic'
import {
  AddedLine, AskDoctorList, Bubble, Chips, Composer, DoctorFinderCard, EmailPlanForm, MentalHealthCard,
  NoteCard, OptInCard, OutputPreview, PlanSnapshot, SexualHealthCard, StatCard, Typing, VisitCard,
} from './widgets'

const SEX = [{ id: 'male', label: 'Male' }, { id: 'female', label: 'Female' }]
const DOCTOR = [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }, { id: 'unsure', label: 'Not sure' }]
const DELAY = 450

function useMediaQuery(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

// Everything the plan needs, computed from answers.
function derive(data, s) {
  const range = AGE_RANGES.find(r => r.id === s.age)
  const eligible = eligibleRecs(data.recs, range, s.sex)
  const { planned, askDoctor } = buildPlan(eligible, s.personal, s.sexual)
  const visits = groupByVisit(planned, data.visits).map(v => ({
    ...visitForInsurance(v, s.insurance),
    items: v.items.map(it => ({ ...it, note: range && ageNote(it.rec, range) })),
  }))
  return { range, eligible, planned, askDoctor, visits }
}

export function ChatApp({ data }) {
  const [s, setS] = useState({ personal: {} })
  const [msgs, setMsgs] = useState([])
  const [typing, setTyping] = useState(false)
  const [planOpen, setPlanOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const stateRef = useRef(s)
  const pendingRef = useRef(null) // { qid, options } the composer can answer
  const questionsRef = useRef([])
  const logRef = useRef(null)
  const started = useRef(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')

  const plan = useMemo(() => derive(data, s), [data, s])
  const planReady = s.doctor != null

  const update = patch => {
    const next = { ...stateRef.current, ...patch }
    stateRef.current = next
    setS(next)
    return next
  }
  const push = (...m) => setMsgs(prev => [...prev, ...m.map(x => ({ id: crypto.randomUUID(), ...x }))])
  const say = (list, pending = null) => {
    pendingRef.current = null
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      push(...list)
      pendingRef.current = pending
    }, DELAY)
  }
  const ask = (qid, options, label) => ({ kind: 'chips', qid, options, label })

  useEffect(() => {
    if (started.current) return
    started.current = true
    say([
      { kind: 'text', text: 'Hi. Most insurance covers a set of preventive checkups and screenings at no cost. I’ll show you which ones apply to you, and where to get them.' },
      { kind: 'output-preview' },
      { kind: 'text', text: 'First, how old are you?' },
      ask('age', AGE_RANGES, 'Age range'),
    ], { qid: 'age', options: AGE_RANGES })
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  function showPlan(st) {
    const d = derive(data, st)
    const qs = relevantQuestions(d.eligible, d.range, st.sex)
    questionsRef.current = qs
    const possible = new Set(qs.flatMap(q => q.affects).filter(id => d.askDoctor.some(r => r.id === id)))
    const list = [
      { kind: 'text', text: 'Here’s your plan so far. Most of it happens at one visit.' },
      { kind: 'snapshot' },
    ]
    if (INSURANCE_NOTES[st.insurance]) list.push({ kind: 'note', text: INSURANCE_NOTES[st.insurance] })
    if (st.insurance === 'none' || st.doctor === 'no') list.push({ kind: 'finder', reason: st.insurance === 'none' ? 'none' : 'nodoctor' })
    if (qs.length && possible.size) {
      list.push({ kind: 'optin', count: possible.size })
      say(list, { qid: 'optin', options: [{ id: 'yes', label: 'Improve my plan' }, { id: 'no', label: 'I’m good' }] })
    } else {
      say(list)
      setTimeout(() => wrap(st), DELAY + 50)
    }
    if (isDesktop) setPanelOpen(true)
  }

  function askPersonal(i) {
    const q = questionsRef.current[i]
    if (!q) return wrap(stateRef.current)
    say([{ kind: 'text', text: q.text }, ask(`q:${q.id}`, q.options, q.text)], { qid: `q:${q.id}`, options: q.options })
  }

  function wrap(st) {
    const d = derive(data, st)
    const hasSH = d.eligible.some(r => SEXUAL_HEALTH.recs.includes(r.id))
    const list = [{ kind: 'text', text: 'Two more things for your checkup.' }, { kind: 'mental' }]
    if (hasSH) {
      list.push({ kind: 'sexual' })
      say(list, { qid: 'sexual', options: [{ id: 'yes', label: 'Add these tests' }, { id: 'no', label: 'Not for me' }] })
    } else {
      say(list)
      setTimeout(finish, DELAY + 50)
    }
  }

  function finish() {
    say([{ kind: 'text', text: 'That’s your plan. Open it anytime to see what to book and what to say, or email it to yourself.' }, { kind: 'done' }])
  }

  function answer(qid, option, { echo = true } = {}) {
    pendingRef.current = null
    if (echo) push({ kind: 'user', text: option.label })
    const prev = stateRef.current

    if (qid === 'age') {
      update({ age: option.id })
      return say([
        { kind: 'text', text: 'And what sex were you assigned at birth? Some screenings depend on the body you were born with.' },
        ask('sex', SEX, 'Sex assigned at birth'),
      ], { qid: 'sex', options: SEX })
    }
    if (qid === 'sex') {
      const st = update({ sex: option.id })
      const stat = pickStat(AGE_RANGES.find(r => r.id === st.age), st.sex)
      return say([
        { kind: 'text', text: 'One thing worth knowing at your age:' },
        { kind: 'stat', stat },
        { kind: 'text', text: 'How do you get health insurance?' },
        ask('insurance', INSURANCE, 'Insurance'),
      ], { qid: 'insurance', options: INSURANCE })
    }
    if (qid === 'insurance') {
      update({ insurance: option.id })
      return say([
        { kind: 'text', text: 'Do you have a primary care doctor you could book with?' },
        ask('doctor', DOCTOR, 'Primary care doctor'),
      ], { qid: 'doctor', options: DOCTOR })
    }
    if (qid === 'doctor') return showPlan(update({ doctor: option.id }))
    if (qid === 'optin') {
      update({ optin: option.id })
      return option.id === 'yes' ? askPersonal(0) : wrap(stateRef.current)
    }
    if (qid.startsWith('q:')) {
      const id = qid.slice(2)
      const before = derive(data, prev).planned
      const st = update({ personal: { ...prev.personal, [id]: option.id } })
      const after = derive(data, st).planned
      const added = after.filter(r => !before.includes(r))
      const q = questionsRef.current.find(x => x.id === id)
      const removed = derive(data, prev).askDoctor.filter(r => q.affects.includes(r.id) && !after.includes(r) && !derive(data, st).askDoctor.includes(r))
      push({ kind: 'added', added, removed })
      return askPersonal(questionsRef.current.indexOf(q) + 1)
    }
    if (qid === 'sexual') {
      const before = derive(data, prev).planned
      const st = update({ sexual: option.id })
      const added = derive(data, st).planned.filter(r => !before.includes(r))
      if (option.id === 'yes') push({ kind: 'added', added, removed: [] })
      return finish()
    }
  }

  // Free text: match it to the options on screen. No LLM in the lofi.
  function onSend(text) {
    push({ kind: 'user', text })
    const p = pendingRef.current
    if (p) {
      const t = text.toLowerCase()
      let match
      if (p.qid === 'age' && /\d+/.test(t)) {
        const n = Number(t.match(/\d+/)[0])
        match = AGE_RANGES.find(r => n >= r.lo && n <= r.hi) || (n < 18 ? null : AGE_RANGES.at(-1))
      }
      match ??= p.options.find(o => o.label.toLowerCase() === t) ||
        p.options.find(o => o.label.toLowerCase().includes(t) || t.includes(o.label.toLowerCase()))
      if (match) return answer(p.qid, match, { echo: false })
    }
    say([{ kind: 'text', text: p ? 'This prototype only understands the options above. Tap one, or type it.' : 'Your plan is ready. Open it from the top right.' }], p)
  }

  const value = qid => {
    if (qid.startsWith('q:')) return s.personal[qid.slice(2)]
    return s[qid]
  }

  const openPlan = () => (isDesktop ? setPanelOpen(true) : setPlanOpen(true))
  const itemCount = plan.planned.length

  const render = m => {
    switch (m.kind) {
      case 'text': return <Bubble role="assistant">{m.text}</Bubble>
      case 'user': return <Bubble role="user">{m.text}</Bubble>
      case 'output-preview': return <OutputPreview />
      case 'chips': return <Chips options={m.options} value={value(m.qid)} label={m.label} onSelect={o => answer(m.qid, o)} />
      case 'stat': return <StatCard stat={m.stat} />
      case 'note': return <NoteCard>{m.text}</NoteCard>
      case 'snapshot': return <PlanSnapshot visits={plan.visits} askCount={plan.askDoctor.length} onOpen={openPlan} />
      case 'finder': return <DoctorFinderCard reason={m.reason} />
      case 'optin': return <OptInCard count={m.count} value={s.optin} onChoose={o => answer('optin', o)} />
      case 'added': return <AddedLine added={m.added} removed={m.removed} />
      case 'mental': return <MentalHealthCard />
      case 'sexual': return (
        <SexualHealthCard
          factors={s.sex === 'male' ? [...SEXUAL_HEALTH.factors.slice(0, 4), SEXUAL_HEALTH.maleFactor, ...SEXUAL_HEALTH.factors.slice(4)] : SEXUAL_HEALTH.factors}
          value={s.sexual}
          onChoose={o => answer('sexual', o)}
        />
      )
      case 'done': return <Button className="h-11 px-5" onClick={openPlan}><ClipboardList />Open your plan</Button>
      default: return null
    }
  }

  const panel = <PlanPanel plan={plan} ready={planReady} />

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b bg-card px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight">Carefree</span>
            <Badge variant="outline">Chat lofi</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" asChild className="hidden h-10 sm:inline-flex"><a href="#/components">Components</a></Button>
            {(!isDesktop || !panelOpen) && (
              <Button variant="outline" className="h-10" onClick={openPlan}>
                <ClipboardList />Your plan
                {planReady && <Badge className="ml-0.5" aria-label={`${itemCount} items`}>{itemCount}</Badge>}
              </Button>
            )}
          </div>
        </header>

        <main ref={logRef} role="log" aria-live="polite" aria-label="Conversation" className="relative flex-1 overflow-y-auto">
          {/* `relative` keeps sr-only (absolute) labels inside the scroll area instead of stretching the page */}
          <div className="mx-auto flex max-w-2xl flex-col gap-3 px-4 py-6">
            {msgs.map(m => <div key={m.id}>{render(m)}</div>)}
            {typing && <Typing />}
          </div>
        </main>

        <div className="border-t bg-background px-4 pt-3 pb-[max(env(safe-area-inset-bottom),12px)]">
          <div className="mx-auto max-w-2xl"><Composer onSend={onSend} /></div>
        </div>
      </div>

      {isDesktop && panelOpen && (
        <aside aria-label="Your plan" className="flex w-[400px] shrink-0 flex-col border-l bg-card">
          <div className="flex items-center justify-between border-b px-4 py-2.5">
            <h2 className="font-semibold">Your plan</h2>
            <Button variant="ghost" size="icon-lg" aria-label="Hide plan" onClick={() => setPanelOpen(false)}><PanelRightClose /></Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{panel}</div>
        </aside>
      )}

      {!isDesktop && (
        <Sheet open={planOpen} onOpenChange={setPlanOpen}>
          <SheetContent
            side={isTablet ? 'right' : 'bottom'}
            className={isTablet ? 'w-[420px] sm:max-w-[420px]' : 'max-h-[88dvh] rounded-t-2xl'}
          >
            <SheetHeader>
              <SheetTitle>Your plan</SheetTitle>
              <SheetDescription>What to book, what to say, and what’s covered.</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto px-4 pb-6">{panel}</div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

export function PlanPanel({ plan, ready }) {
  if (!ready)
    return (
      <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        Your plan builds as you answer. It will show each visit to book, what happens there, and what to ask for.
      </div>
    )
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {plan.visits.map((v, i) => <VisitCard key={v.id} visit={v} index={i} defaultOpen={i === 0} />)}
      </div>
      <AskDoctorList recs={plan.askDoctor} />
      <EmailPlanForm />
    </div>
  )
}
