// Carefree: one page. The first question is on the landing screen, the plan appears after two taps,
// and every answer after that changes the plan in place. The app only composes components.
import { useEffect, useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { riseProps, useLoaded } from '@/lib/useLoaded'
import { AGE_RANGES, INSURANCE, SEX, cleanAnswers, derivePlan, extraQuestions, sexualHealthFactors } from './logic'
import { AnswerPanel, PlanActions, PlanGhost, PlanView, StartScreen, Wordmark } from '@/components/chat'

// The basics, in order. Age and sex are enough to build a plan; insurance adds what it costs.
const BASICS = [
  { id: 'age', title: 'How old are you?', description: 'What’s recommended changes with age.', options: AGE_RANGES, columns: 2 },
  { id: 'sex', title: 'What sex were you assigned at birth?', description: 'Some screenings depend on the body you were born with.', options: SEX },
  { id: 'insurance', title: 'How do you get health insurance?', description: 'It decides what these cost and what to ask for.', options: INSURANCE },
]
// Without insurance nothing here is automatically free, so the copy doesn't say it is.
const sexualQuestion = free => ({
  id: 'sexual',
  title: 'Any of these true for you in the past year?',
  footnote: `You don’t need to say which. “Yes” adds ${free ? 'free ' : ''}STI tests and HIV prevention to your plan.`,
  options: [{ id: 'yes', label: 'Yes, add the tests' }, { id: 'no', label: 'No, not for me' }],
})
const EMPTY = { personal: {} }
const NOTHING_NEW = { fresh: new Set(), feedback: '' }
const nextBasic = answers => BASICS.find(b => !answers[b.id])?.id ?? 'ready'

// Answers are kept for this tab only, so a refresh, or coming back after a phone call to book, doesn't lose the plan.
const STORE = 'carefree:answers'
function restore() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE))
    if (saved?.s) return { s: { ...EMPTY, ...cleanAnswers(saved.s) }, focus: typeof saved.focus === 'string' ? saved.focus : 'age' }
  } catch { /* private mode or bad data: start fresh */ }
  return { s: EMPTY, focus: 'age' }
}
function save(state) {
  try { sessionStorage.setItem(STORE, JSON.stringify(state)) } catch { /* storage is optional */ }
}

export function App({ data }) {
  const [initial] = useState(restore)
  const [s, setS] = useState(initial.s)
  // What the panel is asking: a basic's id, a health question ('q:smoking', 'sexual'), or 'ready'.
  const [focus, setFocus] = useState(initial.focus)
  // What the last answer changed: the rows it added, and a line saying so.
  const [change, setChange] = useState(NOTHING_NEW)
  const loaded = useLoaded()

  const plan = useMemo(() => derivePlan(data, s), [data, s])
  const extras = useMemo(() => extraQuestions(data, s), [data, s])
  const hasPlan = !!(s.age && s.sex)
  const ready = hasPlan && !!s.insurance
  const free = s.insurance !== 'none'

  // The panel only asks something whose earlier answers exist (Forward after Start over, a stale saved step).
  const basic = BASICS.findIndex(b => b.id === focus)
  const view =
    basic >= 0 && BASICS.slice(0, basic).every(b => s[b.id]) ? focus
    : !ready ? nextBasic(s)
    : extras.steps.includes(focus) ? focus
    : 'ready'

  // The browser's Back and Forward move between questions, so a phone's back gesture doesn't leave the site.
  useEffect(() => {
    window.history.replaceState({ cf: view, n: window.history.state?.n ?? 0 }, '')
    const onPop = e => setFocus(e.state?.cf ?? 'age')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, []) // runs once: later questions go through go() and popstate
  useEffect(() => { save({ s, focus: view }) }, [s, view])

  const go = next => {
    window.history.pushState({ cf: next, n: (window.history.state?.n ?? 0) + 1 }, '')
    setFocus(next)
  }
  const back = () => {
    if ((window.history.state?.n ?? 0) > 0) return window.history.back()
    const i = extras.steps.indexOf(view)
    setFocus(i > 0 ? extras.steps[i - 1] : 'ready')
  }
  const startOver = () => { setS(EMPTY); setChange(NOTHING_NEW); go('age'); window.scrollTo(0, 0) }

  function answerBasic(id, value) {
    const next = { ...s, [id]: value }
    setS(next)
    // The plan appears after the second answer, while the third is still being asked. Say so, since on a phone it sits below.
    setChange(next.age && next.sex && !next.insurance ? { ...NOTHING_NEW, feedback: 'Your plan is ready. One more answer adds what it costs.' } : NOTHING_NEW)
    go(nextBasic(next))
    window.scrollTo(0, 0)
  }
  // A health answer changes the plan in place. Say what it added, and mark those rows.
  function answerExtra(patch, answered = true) {
    const i = extras.steps.indexOf(view)
    const last = i === extras.steps.length - 1
    const next = { ...s, ...patch, ...(last ? { improved: true } : {}) }
    const before = new Set(plan.planned.map(r => r.id))
    const added = derivePlan(data, next).planned.filter(r => !before.has(r.id))
    setS(next)
    // After the last question the panel sums everything up, so the per-answer line steps aside.
    setChange({
      fresh: new Set(added.map(r => r.id)),
      feedback: last ? '' : added.length ? `Added: ${added.map(r => r.plain_name).join(', ')}` : answered ? 'Nothing to add for that one' : '',
    })
    go(last ? 'ready' : extras.steps[i + 1])
  }

  const question = (() => {
    if (view === 'ready') return null
    const b = BASICS.find(q => q.id === view)
    if (b) return { ...b, value: s[b.id] }
    if (view === 'sexual') return { ...sexualQuestion(free), details: sexualHealthFactors(s.sex), value: s.sexual }
    const q = extras.questions[extras.steps.indexOf(view)]
    return { id: view, title: q.text, options: q.options, value: s.personal[q.id] }
  })()
  const isExtra = extras.steps.includes(view)
  const onAnswer = o => {
    if (!isExtra) return answerBasic(view, o.id)
    answerExtra(view === 'sexual' ? { sexual: o.id } : { personal: { ...s.personal, [question.id.slice(2)]: o.id } })
  }
  // Answered basics read back as chips; the one being asked again is left out.
  const chips = BASICS.filter(b => s[b.id] && b.id !== view).map(b => {
    const o = b.options.find(x => x.id === s[b.id])
    return { id: b.id, label: o.short || o.label }
  })

  return (
    <div className="min-h-dvh bg-background pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] text-foreground">
      <header className="cf-no-print mx-auto flex h-6 w-full max-w-[1088px] items-center justify-between gap-2 px-2 sm:h-8 sm:px-3">
        <Wordmark />
        {s.age && <Button variant="ghost" className="-mr-2" onClick={startOver}><RotateCcw />Start over</Button>}
      </header>
      {/* A phone stacks the panel over the plan. A wide screen sets them side by side, with the panel staying in view. */}
      <main className="mx-auto w-full max-w-[1088px] space-y-3 px-2 pt-1 pb-6 sm:px-3 sm:pt-3 lg:grid lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start lg:gap-4 lg:space-y-0">
        <div className="cf-no-print space-y-2 lg:sticky lg:top-3">
          {!hasPlan && <StartScreen />}
          <div {...riseProps(loaded, 2)}>
            <AnswerPanel
              answers={chips}
              onEdit={go}
              question={question}
              onAnswer={onAnswer}
              progress={isExtra ? { step: extras.steps.indexOf(view), total: extras.steps.length, label: 'Your health' } : null}
              onBack={isExtra ? back : null}
              onSkip={isExtra ? () => answerExtra({}, false) : null}
              feedback={change.feedback}
              offer={ready && !s.improved && extras.possible > 0 ? { count: extras.possible, questions: extras.steps.length, free } : null}
              onTune={() => go(extras.steps[0])}
              done={ready && s.improved ? (plan.added.length
                ? { title: `${plan.added.length} added from your answers`, detail: plan.added.map(r => r.plain_name).join(', ') }
                : { title: 'Nothing to add. Your plan is complete.' }) : null}
              onRetune={() => go(extras.steps[0])}
            >
              {ready && view === 'ready' && <Button asChild className="hidden w-full lg:inline-flex"><a href="#keep">Email or save my plan</a></Button>}
            </AnswerPanel>
          </div>
          {!hasPlan && <p {...riseProps(loaded, 3)} className={`${riseProps(loaded, 3).className} px-2 text-muted-foreground`}>No account. Your answers stay on this device.</p>}
        </div>
        {hasPlan
          ? <PlanView plan={plan} fresh={change.fresh} actions={ready ? <PlanActions plan={plan} answers={s} /> : null} />
          : <div {...riseProps(loaded, 3)}><PlanGhost remaining={BASICS.slice(0, 2).filter(b => !s[b.id]).length} /></div>}
      </main>
    </div>
  )
}
