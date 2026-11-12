// Carefree: three questions (one per screen), then a plan. Extra questions are offered from the plan,
// after people have seen what they get. The app only composes components.
import { useEffect, useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AGE_RANGES, INSURANCE, SEX, cleanAnswers, derivePlan, extraQuestions, sexualHealthFactors } from './logic'
import { OptInCard, OptionList, PlanActions, PlanView, QuestionStep, StartScreen, Wordmark } from '@/components/chat'

const SEXUAL = [{ id: 'yes', label: 'Yes, add the tests' }, { id: 'no', label: 'No, not for me' }]

// The basics, in order. Every answer is a tap, and every option leads to a different plan.
const BASICS = [
  { id: 'age', title: 'How old are you?', description: 'What’s recommended changes with age.', options: AGE_RANGES, columns: 2 },
  { id: 'sex', title: 'What sex were you assigned at birth?', description: 'Some screenings depend on the body you were born with.', options: SEX },
  { id: 'insurance', title: 'How do you get health insurance?', options: INSURANCE },
]
const EMPTY = { personal: {} }

// Answers are kept for this tab only, so a refresh, or coming back after a phone call to book, doesn't lose the plan.
const STORE = 'carefree:answers'
function restore() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE))
    if (saved?.s) return { s: { ...EMPTY, ...cleanAnswers(saved.s) }, step: typeof saved.step === 'string' ? saved.step : 'start' }
  } catch { /* private mode or bad data: start fresh */ }
  return { s: EMPTY, step: 'start' }
}
function save(state) {
  try { sessionStorage.setItem(STORE, JSON.stringify(state)) } catch { /* storage is optional */ }
}

export function App({ data }) {
  const [initial] = useState(restore)
  const [s, setS] = useState(initial.s)
  const [step, setStep] = useState(initial.step)

  const plan = useMemo(() => derivePlan(data, s), [data, s])
  const extras = useMemo(() => extraQuestions(data, s), [data, s])
  const ready = !!(s.age && s.sex && s.insurance)

  // A step only shows if the answers before it exist (Forward after Start over, a stale saved step).
  const reachable =
    step === 'start' || step === 'age' ||
    (step === 'sex' && !!s.age) ||
    (step === 'insurance' && !!(s.age && s.sex)) ||
    (ready && (step === 'plan' || extras.steps.includes(step)))
  const view = reachable ? step : 'start'

  // The browser's Back and Forward move between steps, so a phone's back gesture doesn't leave the site.
  useEffect(() => {
    window.history.replaceState({ cf: view, n: window.history.state?.n ?? 0 }, '')
    const onPop = e => setStep(e.state?.cf ?? 'start')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, []) // runs once: later steps go through go() and popstate
  useEffect(() => { save({ s, step: view }) }, [s, view])
  useEffect(() => { window.scrollTo(0, 0) }, [view])

  const set = patch => setS(prev => ({ ...prev, ...patch }))
  const go = next => {
    window.history.pushState({ cf: next, n: (window.history.state?.n ?? 0) + 1 }, '')
    setStep(next)
  }
  const previous = () => {
    const b = BASICS.findIndex(q => q.id === view)
    if (b >= 0) return b ? BASICS[b - 1].id : 'start'
    const e = extras.steps.indexOf(view)
    return e > 0 ? extras.steps[e - 1] : 'plan'
  }
  const back = () => ((window.history.state?.n ?? 0) > 0 ? window.history.back() : setStep(previous()))
  const startOver = () => { setS(EMPTY); go('start') }

  function answerBasic(id, value) {
    set({ [id]: value })
    go(BASICS[BASICS.findIndex(b => b.id === id) + 1]?.id ?? 'plan')
  }
  // The last extra question marks the plan as improved, which turns on "ask if these apply to you".
  function answerExtra(patch) {
    const next = extras.steps[extras.steps.indexOf(view) + 1]
    set(next ? patch : { ...patch, improved: true })
    go(next ?? 'plan')
  }

  const screen = () => {
    if (view === 'start') return <StartScreen questions={BASICS.length} onStart={() => go('age')} />

    const basic = BASICS.findIndex(b => b.id === view)
    if (basic >= 0) {
      const b = BASICS[basic]
      return (
        <QuestionStep key={b.id} title={b.title} description={b.description} progress={{ step: basic, total: BASICS.length, label: 'About you' }} onBack={back}>
          <OptionList label={b.title} options={b.options} columns={b.columns} value={s[b.id]} onSelect={o => answerBasic(b.id, o.id)} />
        </QuestionStep>
      )
    }

    const extra = extras.steps.indexOf(view)
    if (extra >= 0) {
      const progress = { step: extra, total: extras.steps.length, label: 'Your health' }
      if (view === 'sexual') {
        return (
          <QuestionStep
            key="sexual"
            title="Any of these true for you in the past year?"
            details={sexualHealthFactors(s.sex)}
            footnote="You don’t need to say which. “Yes” adds free STI tests and HIV prevention to your plan."
            progress={progress}
            onBack={back}
          >
            <OptionList label="Add sexual health tests?" options={SEXUAL} value={s.sexual} onSelect={o => answerExtra({ sexual: o.id })} />
          </QuestionStep>
        )
      }
      const q = extras.questions[extra]
      return (
        <QuestionStep key={q.id} title={q.text} progress={progress} onBack={back}>
          <OptionList label={q.text} options={q.options} value={s.personal[q.id]} onSelect={o => answerExtra({ personal: { ...s.personal, [q.id]: o.id } })} />
        </QuestionStep>
      )
    }

    return (
      <PlanView
        plan={plan}
        offer={!s.improved && extras.possible > 0 ? <OptInCard count={extras.possible} questions={extras.steps.length} onImprove={() => go(extras.steps[0])} /> : null}
        actions={<PlanActions plan={plan} answers={s} />}
      />
    )
  }

  // The header and the page share one column, so the name lines up with the content at every width.
  const column = view === 'plan' ? 'mx-auto w-full max-w-[688px] px-2 sm:px-3 lg:max-w-[1088px]' : 'mx-auto w-full max-w-[608px] px-2 sm:px-3'
  return (
    <div className="min-h-dvh bg-background pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] text-foreground">
      <header className={`cf-no-print flex h-6 items-center justify-between gap-2 sm:h-8 ${column}`}>
        <Wordmark />
        {view === 'plan' && <Button variant="ghost" className="-mr-2" onClick={startOver}><RotateCcw />Start over</Button>}
      </header>
      <main className={`pt-1 pb-6 sm:pt-3 ${column}`}>
        {screen()}
      </main>
    </div>
  )
}
