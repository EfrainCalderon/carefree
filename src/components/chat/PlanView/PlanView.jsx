// PlanView: The plan, on its own page, as a timeline you can move along. Now: the one call to make, with the words to say.
// At your visit: what to ask for and expect. After: what the doctor may send you for. Order in time carries
// the hierarchy, so nothing reads as optional: later steps aren't lesser, they just come later.
// The first time it's shown the steps arrive one at a time.
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Barriers } from '../Barriers/Barriers'
import { PlanDone } from '../PlanDone/PlanDone'
import { PlanStep } from '../PlanStep/PlanStep'
import { Script } from '../Script/Script'
import { RichText } from '../Term/Term'
import { VisitCard } from '../VisitCard/VisitCard'
import { followTime } from '@/lib/visits'

// Counts up from 0 to `total`, one step at a time, then reports it's done. Uses timers, never animation
// frames, and skips straight to the end for people who prefer reduced motion.
function useBuild(total, animate, onDone) {
  const [shown, setShown] = useState(animate ? 0 : Infinity)
  useEffect(() => {
    if (!animate) return
    const finish = () => { setShown(Infinity); onDone?.() }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return finish()
    let n = 0
    let timer = setTimeout(function next() {
      n += 1
      if (n > total) return finish()
      setShown(n)
      timer = setTimeout(next, 560)
    }, 480)
    return () => clearTimeout(timer)
  }, []) // runs once, for the arrival
  return shown
}

// answers: the answers in a few words ("Age 45–49, male, work or own plan"). onChange: go back and change them.
// actions: email and print. offer: the invitation to answer more questions.
// at: which step the person is on (0 the call, 1 the visit, 2 after; one more means everything is done).
// onAt: move to a step.
// fresh: ids of recommendations the last answers added. build: play the arrival; onBuilt: it finished.
export function PlanView({ plan, answers, onChange, actions, offer, at = 0, onAt, fresh, build = false, onBuilt }) {
  const heading = useRef(null)
  // Move focus to the heading so screen readers announce that the plan has arrived.
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [])
  const book = plan.visits.filter(v => v.kind === 'book')
  const follow = plan.visits.filter(v => v.kind !== 'book')
  const steps = 2 + (follow.length ? 1 : 0)
  const step = Math.min(at, steps)
  const allDone = step === steps
  // Step buttons span the card on a phone and sit at the right on wider screens.
  const advance = (label, to) => <div className="flex sm:justify-end"><Button variant="outline" className="w-full sm:w-auto" onClick={() => onAt?.(to)}>{label}</Button></div>
  const shown = useBuild(steps, build, onBuilt)
  const built = shown === Infinity
  // A step that has arrived rises in; one still to come isn't there yet.
  const arrive = i => (built ? undefined : i < shown ? 'cf-rise' : 'invisible')
  const state = i => (i < step ? 'done' : i === step ? 'current' : 'next')
  const scheduled = book.filter(v => v.say)
  return (
    <div className="space-y-3">
      <div className="space-y-2 sm:flex sm:items-start sm:justify-between sm:gap-2 sm:space-y-0">
        <div className="space-y-1">
          <h1 ref={heading} tabIndex={-1} className="text-display font-bold tracking-tight focus:outline-none">Your plan</h1>
          <p><RichText>{plan.coverage}</RichText></p>
          {answers && (
            <p className="text-muted-foreground">
              {answers}.{' '}
              {onChange && <button type="button" className="font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-2" onClick={onChange}>Change</button>}
            </p>
          )}
        </div>
        {actions}
      </div>
      <p role="status" className="sr-only">{built ? '' : 'Putting your plan together'}</p>
      <ol>
        <PlanStep first className={arrive(0)} state={state(0)} label={step > 0 ? 'Scheduled' : 'Now'} detail="about 5 minutes" onSelect={() => onAt?.(0)}>
          <div className="space-y-2 rounded-card border bg-card p-2">
            {scheduled.map(v => (
              <div key={v.id} className="space-y-1">
                <h3 className="text-heading font-bold">{v.call}</h3>
                <Script label="Say">{v.say}</Script>
              </div>
            ))}
            {!scheduled.length && book[0]?.how && <p>{book[0].how}</p>}
            <Barriers barriers={plan.first?.barriers} />
          </div>
          {step === 0 && <div className="pt-1">{advance(scheduled.length > 1 ? 'I’ve scheduled them' : 'I’ve scheduled it', 1)}</div>}
        </PlanStep>
        <PlanStep
          className={arrive(1)}
          state={state(1)}
          last={!follow.length}
          label={step > 1 ? 'Visit done' : book.length > 1 ? 'At your visits' : 'At your visit'}
          detail={book.length === 1 && book[0].time ? book[0].time.toLowerCase() : null}
          onSelect={() => onAt?.(1)}
        >
          <div className="space-y-1">
            {book.map((v, i) => <VisitCard key={v.id} visit={v} fresh={fresh} showSay={false} askIf={i === 0 ? plan.askDoctor : []} />)}
          </div>
          {step === 1 && <div className="pt-1">{advance(book.length > 1 ? 'I’ve had my visits' : 'I’ve had my visit', 2)}</div>}
        </PlanStep>
        {follow.length > 0 && (
          <PlanStep last className={arrive(2)} state={state(2)} label={allDone ? 'Follow-ups done' : 'After, if your doctor orders it'} detail={followTime(follow)} onSelect={() => onAt?.(2)}>
            <div className="space-y-1">{follow.map(v => <VisitCard key={v.id} visit={v} fresh={fresh} />)}</div>
            {step === 2 && <div className="pt-1">{advance('I’ve done these', 3)}</div>}
          </PlanStep>
        )}
      </ol>
      {allDone && <PlanDone />}
      {built && offer && !allDone && <div className={build ? 'cf-rise' : undefined}>{offer}</div>}
    </div>
  )
}
