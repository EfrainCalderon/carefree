// PlanView: The finished plan as a page. Once the page has loaded, sections fade up one by one,
// top to bottom, with the email form last.
import { Children, useEffect, useState } from 'react'
import { PlanHeader } from '../PlanHeader/PlanHeader'
import { VisitCard } from '../VisitCard/VisitCard'
import { AskDoctorList } from '../AskDoctorList/AskDoctorList'
import { EmailPlanForm } from '../EmailPlanForm/EmailPlanForm'

const STAGGER = 150

// Wait for fonts and a painted frame so the first section doesn't start mid-load.
function useLoaded() {
  const [go, setGo] = useState(false)
  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => alive && setGo(true))))
    return () => { alive = false }
  }, [])
  return go
}

// notes: cards shown under the header (insurance notes, clinic finder). offer: shown at the very bottom.
export function PlanView({ plan, notes, showAskDoctor, offer }) {
  const go = useLoaded()
  const sections = [
    <PlanHeader key="header" plan={plan} ready className="rounded-card" />,
    ...Children.toArray(notes),
    <p key="lead" className="text-muted-foreground">Start with visit 1. Anything else is usually ordered there. Tap a visit to see what happens.</p>,
    ...plan.visits.map((v, i) => <VisitCard key={v.id} visit={v} index={i} />),
    ...(showAskDoctor && plan.askDoctor.length ? [<AskDoctorList key="ask" recs={plan.askDoctor} />] : []),
  ]
  const last = sections.length
  const rise = i => go ? { className: 'cf-rise', style: { animationDelay: `${i * STAGGER}ms` } } : { className: 'opacity-0' }
  return (
    <div className="space-y-2">
      {sections.map((el, i) => <div key={el.key ?? i} {...rise(i)}>{el}</div>)}
      <div {...rise(last)} className={`${rise(last).className} rounded-card border bg-card p-2`}>
        <EmailPlanForm />
      </div>
      {offer && <div {...rise(last)} className={`${rise(last).className} pt-3`}>{offer}</div>}
    </div>
  )
}
