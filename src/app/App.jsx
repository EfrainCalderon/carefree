// Carefree: three questions, then the plan on its own page. From the plan you can email or print it,
// move along its steps, answer a few more questions, or go back and change an answer.
// The app only composes components.
import { useEffect, useMemo, useState } from 'react'
import { AGE_RANGES, SEX, cleanAnswers, derivePlan, extraQuestions, insuranceOptions, sexualHealthFactors } from './logic'
import {
  FeedbackButton, OptInCard, OptionList, PlanActions, PlanView, PrintSheet, QuestionStep, SiteFooter, StartScreen, Wordmark,
} from '@/components/chat'

const SEXUAL = [{ id: 'yes', label: 'Yes, add the tests' }, { id: 'no', label: 'No, not for me' }]
const EMPTY = { personal: {} }

// The basics, in order. Insurance options depend on age, so they're worked out per person.
const basics = s => [
  { id: 'age', title: 'How old are you?', description: 'What’s recommended changes with age.', options: AGE_RANGES, columns: 2 },
  { id: 'sex', title: 'What sex were you assigned at birth?', description: 'Some screenings depend on the body you were born with.', options: SEX },
  { id: 'insurance', title: 'How do you get health insurance?', options: insuranceOptions(s.age) },
]

// Answers are kept for this tab only, so a refresh, or coming back after a phone call, doesn't lose the plan.
const STORE = 'carefree:answers'
function restore() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE))
    if (saved?.s) return {
      s: { ...EMPTY, ...cleanAnswers(saved.s) },
      step: typeof saved.step === 'string' ? saved.step : 'age',
      at: [0, 1, 2, 3].includes(saved.at) ? saved.at : 0,
      declined: saved.declined === true,
    }
  } catch { /* private mode or bad data: start fresh */ }
  return { s: EMPTY, step: 'age', at: 0, declined: false }
}
function save(state) {
  try { sessionStorage.setItem(STORE, JSON.stringify(state)) } catch { /* storage is optional */ }
}

export function App({ data }) {
  const [initial] = useState(restore)
  const [s, setS] = useState(initial.s)
  const [step, setStep] = useState(initial.step)
  // What the extra questions just added (marked on the plan), and whether the plan should play its arrival.
  // How far along the plan's timeline the person says they are. Kept with the answers, for this tab only.
  const [at, setAt] = useState(initial.at)
  const [fresh, setFresh] = useState(() => new Set())
  const [build, setBuild] = useState(false)
  // Set while one answer is being changed from the plan: the new answer goes straight back to the plan.
  const [edit, setEdit] = useState(null)
  // "No, thank you" on the offer to answer more questions. Kept for the tab, like the answers.
  const [declined, setDeclined] = useState(initial.declined)

  const plan = useMemo(() => derivePlan(data, s), [data, s])
  const extras = useMemo(() => extraQuestions(data, s), [data, s])
  const BASICS = basics(s)
  const ready = !!(s.age && s.sex && s.insurance)
  // Without insurance nothing here is automatically free, so the copy doesn't say it is.
  const free = s.insurance !== 'none'

  // A step only shows if the answers before it exist (Forward after a change, a stale saved step).
  const reachable =
    step === 'age' ||
    (step === 'sex' && !!s.age) ||
    (step === 'insurance' && !!(s.age && s.sex)) ||
    (ready && (step === 'plan' || extras.steps.includes(step)))
  const view = reachable ? step : 'age'

  // The browser's Back and Forward move between steps, so a phone's back gesture doesn't leave the site.
  useEffect(() => {
    window.history.replaceState({ cf: view, n: window.history.state?.n ?? 0 }, '')
    const onPop = e => setStep(e.state?.cf ?? 'age')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, []) // runs once: later steps go through go() and popstate
  useEffect(() => { save({ s, step: view, at, declined }) }, [s, view, at, declined])
  useEffect(() => { window.scrollTo(0, 0) }, [view])
  useEffect(() => { if (view === 'plan') setEdit(null) }, [view])

  const go = next => {
    window.history.pushState({ cf: next, n: (window.history.state?.n ?? 0) + 1 }, '')
    setStep(next)
  }
  const previous = () => {
    const b = BASICS.findIndex(q => q.id === view)
    if (b > 0) return BASICS[b - 1].id
    const e = extras.steps.indexOf(view)
    return e > 0 ? extras.steps[e - 1] : 'plan'
  }
  const back = () => ((window.history.state?.n ?? 0) > 0 ? window.history.back() : setStep(previous()))

  function answerBasic(id, value) {
    const next = { ...s, [id]: value }
    // A new age can change which insurance options exist; an answer that no longer fits is asked again.
    if (!insuranceOptions(next.age).some(o => o.id === next.insurance)) delete next.insurance
    setS(next)
    setFresh(new Set())
    if (edit) {
      // Back to the plan, unless the new age left insurance unanswered.
      const missing = basics(next).find(b => !next[b.id])
      if (!missing) { setEdit(null); setBuild(false); return go('plan') }
      return go(missing.id)
    }
    setAt(0)
    // Always on to the next question in order, so "Change" walks back through all three with the old answers ticked.
    const order = basics(next)
    const nextStep = order[order.findIndex(b => b.id === id) + 1]?.id ?? 'plan'
    setBuild(nextStep === 'plan')
    go(nextStep)
  }
  // The last extra question marks the plan as improved and shows what the answers added.
  function answerExtra(patch) {
    const nextStep = extras.steps[extras.steps.indexOf(view) + 1]
    if (nextStep) { setS({ ...s, ...patch }); return go(nextStep) }
    const next = { ...s, ...patch, improved: true }
    setS(next)
    setFresh(new Set(derivePlan(data, next).added.map(r => r.id)))
    go('plan')
  }

  // Each answer in a few words, and the question that changes it.
  const changeAnswer = id => { setEdit(id); go(id) }
  const answersLine = ready && [
    { id: 'age', text: `Age ${AGE_RANGES.find(r => r.id === s.age).label}` },
    { id: 'sex', text: SEX.find(o => o.id === s.sex).label.toLowerCase() },
    { id: 'insurance', text: insuranceOptions(s.age).find(o => o.id === s.insurance).short },
  ].map(a => ({ ...a, onEdit: () => changeAnswer(a.id) }))

  const screen = () => {
    const basic = BASICS.findIndex(b => b.id === view)
    if (basic >= 0) {
      const b = BASICS[basic]
      const landing = basic === 0
      return (
        <div className="space-y-4">
          {landing && <StartScreen questions={BASICS.length} />}
          <QuestionStep
            key={b.id}
            title={b.title}
            description={b.description}
            heading={landing ? 'h2' : 'h1'}
            autoFocus={!landing}
            progress={landing || edit ? null : { step: basic, total: BASICS.length, label: 'About you' }}
            onBack={landing ? null : back}
          >
            <OptionList label={b.title} options={b.options} columns={b.columns} value={s[b.id]} onSelect={o => answerBasic(b.id, o.id)} />
          </QuestionStep>
        </div>
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
            footnote={`You don’t need to say which. “Yes” adds ${free ? 'free ' : ''}STI tests and HIV prevention to your plan.`}
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
        answers={answersLine}
        onStartOver={startOver}
        at={at}
        onAt={setAt}
        fresh={fresh}
        build={build}
        onBuilt={() => setBuild(false)}
        actions={<PlanActions plan={plan} answers={s} />}
        offer={!s.improved && !declined && extras.possible > 0 ? <OptInCard questions={extras.steps.length} onImprove={() => go(extras.steps[0])} onDismiss={() => setDeclined(true)} /> : null}
      />
    )
  }

  const startOver = () => { setDeclined(false); setEdit(null); setS(EMPTY); setAt(0); setFresh(new Set()); go('age') }
  // The header, the page and the footer share one column, so everything lines up at every width.
  const column = `mx-auto w-full px-2 sm:px-3 ${view === 'plan' ? 'max-w-[688px]' : 'max-w-[608px]'}`
  return (
    <>
      <div className="cf-screen flex min-h-dvh flex-col bg-background pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] text-foreground">
        <header className={`flex h-6 items-center sm:h-8 ${column}`}><Wordmark /></header>
        <main className={`flex-1 pt-1 pb-6 sm:pt-3 ${column}`}>{screen()}</main>
        <footer className={`pb-2 ${column}`}><SiteFooter onReset={s.age && view !== 'plan' ? startOver : null} /></footer>
        <FeedbackButton screen={view} />
      </div>
      {ready && <PrintSheet plan={plan} />}
    </>
  )
}
