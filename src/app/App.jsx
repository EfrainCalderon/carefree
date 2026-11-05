// Carefree: a short form (one question per screen) that ends in a visit plan.
import { useEffect, useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AGE_RANGES, INSURANCE, INSURANCE_NOTES, SEXUAL_HEALTH, derivePlan, relevantQuestions } from './logic'
import {
  AgeInput, DoctorFinderCard, NoteCard, OptInCard, OptionList, PlanView, QuestionStep, StartScreen,
} from '@/components/chat'

const SEX = [{ id: 'male', label: 'Male' }, { id: 'female', label: 'Female' }]
const DOCTOR = [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }, { id: 'unsure', label: 'Not sure' }]
const OPTIN = [{ id: 'yes', label: 'Yes, ask me' }, { id: 'no', label: 'No, show my plan' }]
const SEXUAL = [{ id: 'yes', label: 'Add these tests' }, { id: 'no', label: 'Not for me' }]

// The basics, in order. The bar for these fills as each is answered.
const BASICS = [
  { id: 'age', title: 'How old are you?', description: 'Screenings change with age. Only your age range is used.' },
  { id: 'sex', title: 'What sex were you assigned at birth?', description: 'Some screenings depend on the body you were born with.', options: SEX },
  { id: 'insurance', title: 'How do you get health insurance?', options: INSURANCE },
  { id: 'doctor', title: 'Do you have a primary care doctor you could book with?', description: 'If not, your plan will include clinics near you.', options: DOCTOR },
]
const EMPTY = { personal: {} }

export function App({ data }) {
  const [s, setS] = useState(EMPTY)
  const [step, setStep] = useState('start')
  const [history, setHistory] = useState([])

  const plan = useMemo(() => derivePlan(data, s), [data, s])
  const questions = useMemo(() => (plan.range && s.sex ? relevantQuestions(plan.eligible, plan.range, s.sex) : []), [plan, s.sex])
  const hasSexualHealth = plan.eligible.some(r => SEXUAL_HEALTH.recs.includes(r.id))
  // The extra questions, in order: personal questions, then the sexual health list.
  const extras = [...questions.map(q => `q:${q.id}`), ...(hasSexualHealth ? ['sexual'] : [])]
  // How many "ask your doctor" items the extra questions could turn into planned screenings.
  const possible = new Set([
    ...questions.flatMap(q => q.affects).filter(id => plan.askDoctor.some(r => r.id === id)),
    ...(hasSexualHealth ? SEXUAL_HEALTH.recs.filter(id => plan.eligible.some(r => r.id === id)) : []),
  ]).size

  useEffect(() => { window.scrollTo(0, 0) }, [step])

  const go = next => { setHistory(h => [...h, step]); setStep(next) }
  const back = () => { setStep(history.at(-1)); setHistory(h => h.slice(0, -1)) }
  const startOver = () => { setS(EMPTY); setHistory([]); setStep('start') }
  const set = patch => setS(prev => ({ ...prev, ...patch }))

  const nextExtra = id => extras[extras.indexOf(id) + 1] ?? 'plan'
  const improve = () => { set({ optin: 'yes' }); go(extras[0]) }

  function answerBasic(id, value) {
    set({ [id]: value })
    const i = BASICS.findIndex(b => b.id === id)
    if (BASICS[i + 1]) return go(BASICS[i + 1].id)
    go(extras.length && possible ? 'optin' : 'plan')
  }

  function answerAge(n) {
    const range = AGE_RANGES.find(r => n >= r.lo && n <= r.hi) || AGE_RANGES.at(-1)
    answerBasic('age', range.id)
  }

  const screen = () => {
    if (step === 'start') return <StartScreen onStart={() => go('age')} />

    const basic = BASICS.findIndex(b => b.id === step)
    if (basic >= 0) {
      const b = BASICS[basic]
      return (
        <QuestionStep title={b.title} description={b.description} progress={{ step: basic, total: BASICS.length, label: 'About you' }} onBack={back}>
          {b.id === 'age'
            ? <AgeInput onSubmit={answerAge} />
            : <OptionList label={b.title} options={b.options} value={s[b.id]} onSelect={o => answerBasic(b.id, o.id)} />}
        </QuestionStep>
      )
    }

    if (step === 'optin') {
      return (
        <QuestionStep
          title="Want a more accurate plan?"
          description={`A few quick questions could add up to ${possible} more free ${possible === 1 ? 'screening' : 'screenings'}. About a minute.`}
          progress={{ step: BASICS.length, total: BASICS.length, label: 'About you' }}
          onBack={back}
        >
          <OptionList label="Improve your plan?" options={OPTIN} value={s.optin} onSelect={o => o.id === 'yes' ? improve() : (set({ optin: 'no' }), go('plan'))} />
        </QuestionStep>
      )
    }

    const extra = extras.indexOf(step)
    if (extra >= 0) {
      const progress = { step: extra, total: extras.length, label: 'Improve your plan' }
      if (step === 'sexual') {
        return (
          <QuestionStep
            title="Some free tests depend on your sexual health"
            description="If any of these have been true for you in the last year, they’re worth asking about. No need to say which."
            details={s.sex === 'male' ? [...SEXUAL_HEALTH.factors.slice(0, 4), SEXUAL_HEALTH.maleFactor, ...SEXUAL_HEALTH.factors.slice(4)] : SEXUAL_HEALTH.factors}
            progress={progress}
            onBack={back}
          >
            <OptionList label="Add sexual health tests?" options={SEXUAL} value={s.sexual} onSelect={o => { set({ sexual: o.id }); go(nextExtra(step)) }} />
          </QuestionStep>
        )
      }
      const q = questions[extra]
      return (
        <QuestionStep title={q.text} progress={progress} onBack={back}>
          <OptionList label={q.text} options={q.options} value={s.personal[q.id]} onSelect={o => { set({ personal: { ...s.personal, [q.id]: o.id } }); go(nextExtra(step)) }} />
        </QuestionStep>
      )
    }

    // The plan. Notes and the clinic finder sit under the header; the offer to improve sits at the very bottom.
    const notes = [
      INSURANCE_NOTES[s.insurance] && <NoteCard key="note">{INSURANCE_NOTES[s.insurance]}</NoteCard>,
      (s.insurance === 'none' || s.doctor === 'no') && <DoctorFinderCard key="finder" reason={s.insurance === 'none' ? 'none' : 'nodoctor'} />,
    ].filter(Boolean)
    return (
      <PlanView
        key={history.length} // a revised plan replays the reveal
        plan={plan}
        notes={notes}
        showAskDoctor={s.optin === 'yes'}
        offer={s.optin !== 'yes' && extras.length && possible ? <OptInCard count={possible} onImprove={improve} /> : null}
      />
    )
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="flex h-8 items-center justify-between gap-2 border-b px-2 sm:px-3">
        <div className="flex items-center gap-1">
          <span aria-hidden className="flex size-4 items-center justify-center rounded-control bg-primary font-bold text-primary-foreground">C</span>
          <span className="text-heading font-bold tracking-tight">Carefree</span>
        </div>
        {step === 'plan' && <Button variant="ghost" onClick={startOver}><RotateCcw />Start over</Button>}
      </header>
      <main className={step === 'plan' ? 'mx-auto max-w-[688px] px-2 py-3 sm:px-3' : 'mx-auto max-w-[608px] px-2 py-6 sm:px-3'}>
        {screen()}
      </main>
    </div>
  )
}
