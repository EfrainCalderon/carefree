// PlanView: The finished plan as a page. Its shape says what the old lead-in sentence said: one section
// to start with (the visit you book) and one for what may come after. Sections fade up in that order.
import { useEffect, useRef } from 'react'
import { Plus } from 'lucide-react'
import { riseProps, useLoaded } from '@/lib/useLoaded'
import { PlanHeader } from '../PlanHeader/PlanHeader'
import { VisitCard } from '../VisitCard/VisitCard'
import { NoteCard } from '../NoteCard/NoteCard'
import { FindDoctorHelp } from '../FindDoctorHelp/FindDoctorHelp'

// offer: the invitation to answer more questions. actions: email and print.
export function PlanView({ plan, offer, actions }) {
  const loaded = useLoaded()
  const heading = useRef(null)
  // Move focus to the plan's heading so screen readers announce that the plan has arrived.
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [])
  const book = plan.visits.filter(v => v.kind === 'book')
  const follow = plan.visits.filter(v => v.kind !== 'book')
  // Each block takes the next place in the reveal. Long plans stop adding delay after a few blocks.
  let n = 0
  const rise = (extra = '') => {
    const p = riseProps(loaded, Math.min(n++, 6))
    return { ...p, className: `${p.className} ${extra}`.trim() }
  }
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-4">
      <div className="space-y-3">
        <div className="space-y-2">
          <div {...rise()}><PlanHeader plan={plan} className="rounded-card" headingRef={heading} /></div>
          {plan.improved && (
            <div {...rise()}>
              <NoteCard icon={Plus}>
                {plan.added.length
                  ? <><strong>Added from your answers:</strong> {plan.added.map(r => r.plain_name).join(', ')}.</>
                  : 'Your answers didn’t add anything new. Your plan is complete as it is.'}
              </NoteCard>
            </div>
          )}
          {plan.note && <div {...rise()}><NoteCard>{plan.note}</NoteCard></div>}
        </div>
        {book.length > 0 && (
          <section aria-labelledby="plan-start" className="space-y-1">
            <h2 id="plan-start" {...rise('cf-label px-2')}>Start here</h2>
            {book.map((v, i) => (
              <div key={v.id} {...rise()}>
                <VisitCard visit={v} defaultOpen={i === 0} finder={i === 0 && plan.finder ? <FindDoctorHelp help={plan.finder} /> : null} askIf={i === 0 ? plan.askDoctor : []} />
              </div>
            ))}
          </section>
        )}
        {follow.length > 0 && (
          <section aria-labelledby="plan-after" className="space-y-1">
            <h2 id="plan-after" {...rise('cf-label px-2')}>What may come after</h2>
            {follow.map(v => <div key={v.id} {...rise()}><VisitCard visit={v} /></div>)}
          </section>
        )}
        {offer && <div {...rise()}>{offer}</div>}
      </div>
      {actions && <aside {...rise('mt-3 lg:sticky lg:top-3 lg:mt-0')}>{actions}</aside>}
    </div>
  )
}
