// PrintSheet: The plan set for paper. It only exists in print: small type, two columns, no cards or
// color blocks, sized to fit one page. The things to say at the visit are lines with a box to tick or
// write beside, so the sheet works as a checklist in the room. Hierarchy comes from size and space, as on
// any printed page: one bold line per visit, small quiet labels for its parts, a short rule between visits.
import { plainText } from '@/lib/terms'
import { visitGroups } from '@/lib/visits'

// Groups the person acts on get tick boxes; what happens anyway reads as a sentence.
const TO_SAY = new Set(['ask', 'talk'])
const line = it => plainText(it.text) + (it.note ? ` (${it.note})` : '')

function Visit({ visit, askIf = [] }) {
  return (
    <section>
      <h2>{visit.name}</h2>
      <p className="cf-print-meta">{[plainText(visit.who), visit.time].filter(Boolean).join(' · ')}</p>
      {visitGroups(visit).map(g => (TO_SAY.has(g.id)
        ? <div key={g.id}><p className="cf-print-label">{g.label}</p><ul className="cf-print-checks">{g.items.map(it => <li key={it.text}>{line(it)}</li>)}</ul></div>
        : <div key={g.id}><p className="cf-print-label">{g.label}</p><p>{g.items.map(line).join('; ')}.</p></div>))}
      {askIf.length > 0 && <div><p className="cf-print-label">Ask if these apply to you</p><ul className="cf-print-checks">{askIf.map(({ rec }) => <li key={rec.id}>{rec.plain_name}</li>)}</ul></div>}
      {visit.tip && <p className="cf-print-meta">Good to know: {visit.tip}</p>}
    </section>
  )
}

export function PrintSheet({ plan }) {
  const first = plan.first
  return (
    <div className="cf-print">
      <header>
        <h1>Your plan</h1>
        <p>{plainText(plan.coverage)}</p>
      </header>
      {first?.visit.say && <p className="cf-print-first"><strong>First step:</strong> {first.visit.call ? `${first.visit.call.charAt(0).toLowerCase()}${first.visit.call.slice(1)}` : 'schedule your visit'}. Say: “{first.visit.say}”</p>}
      <div className="cf-print-columns">
        {plan.visits.map((v, i) => <Visit key={v.id} visit={v} askIf={i === 0 ? plan.askDoctor : []} />)}
      </div>
      <footer>Based on the U.S. Preventive Services Task Force’s A and B recommendations and HealthCare.gov’s list of preventive care for adults. This isn’t medical advice. Made with Carefree.</footer>
    </div>
  )
}
