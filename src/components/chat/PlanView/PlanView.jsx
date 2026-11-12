// PlanView: The plan. One section to start with (the visit you book) and one for what may come after.
// It can show as soon as age and sex are known, then change in place as more answers come in:
// rows an answer just added are marked new (the answer panel says what was added). Sections fade up in order the first time it appears.
import { riseProps, useLoaded } from '@/lib/useLoaded'
import { PlanHeader } from '../PlanHeader/PlanHeader'
import { VisitCard } from '../VisitCard/VisitCard'
import { NoteCard } from '../NoteCard/NoteCard'
import { FindDoctorHelp } from '../FindDoctorHelp/FindDoctorHelp'

// fresh: ids of recommendations the last answer added. actions: ways to take the plan with you, shown last.
export function PlanView({ plan, fresh, actions }) {
  const loaded = useLoaded()
  const book = plan.visits.filter(v => v.kind === 'book')
  const follow = plan.visits.filter(v => v.kind !== 'book')
  // Each block takes the next place in the reveal. Long plans stop adding delay after a few blocks.
  let n = 0
  const rise = (extra = '') => {
    const p = riseProps(loaded, Math.min(n++, 6))
    return { ...p, className: `${p.className} ${extra}`.trim() }
  }
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div {...rise()}><PlanHeader plan={plan} className="rounded-card" /></div>
        {plan.note && <div {...rise()}><NoteCard>{plan.note}</NoteCard></div>}
      </div>
      {book.length > 0 && (
        <section aria-labelledby="plan-start" className="space-y-1">
          <h2 id="plan-start" {...rise('cf-label px-2')}>Start here</h2>
          {book.map((v, i) => (
            <div key={v.id} {...rise()}>
              <VisitCard visit={v} fresh={fresh} defaultOpen={i === 0} finder={i === 0 && plan.finder ? <FindDoctorHelp help={plan.finder} /> : null} askIf={i === 0 ? plan.askDoctor : []} />
            </div>
          ))}
        </section>
      )}
      {follow.length > 0 && (
        <section aria-labelledby="plan-after" className="space-y-1">
          <h2 id="plan-after" {...rise('cf-label px-2')}>What may come after</h2>
          {/* Keyed without the reveal, so a follow-up an answer adds appears at once instead of replaying the page's stagger. */}
          {follow.map(v => <div key={v.id} className={loaded ? 'cf-fade' : 'opacity-0'}><VisitCard visit={v} fresh={fresh} /></div>)}
        </section>
      )}
      {actions && <div id="keep" {...rise('scroll-mt-3')}>{actions}</div>}
    </div>
  )
}
