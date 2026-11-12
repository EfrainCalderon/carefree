// Group a person's eligible recommendations by the visits they'll actually make.
//
// recs:   recommendations already filtered for this person (see eligibleRecs in src/app/logic.js)
// visits: the `visits` array from /data/visits.json
//
// Returns visits in visits.json order, skipping empty ones. Each visit has
// `items: [{ rec, step }]`, where `step` says what happens to that rec at this visit.
// A rec can show up in more than one visit, e.g. a lung CT is discussed at
// primary care and done at imaging.
export function groupByVisit(recs, visits) {
  const byId = new Map(visits.map(v => [v.id, { ...v, items: [] }]))
  for (const rec of recs) {
    for (const step of rec.journey ?? []) {
      byId.get(step.visit)?.items.push({ rec, step })
    }
  }
  return [...byId.values()].filter(v => v.items.length > 0)
}

// What a visit shows, written from one point of view: the label carries the verb, each item is a noun phrase.
// A visit you book leads with what you need to say; what happens anyway comes after.
const BOOK_GROUPS = [
  { id: 'ask', label: 'Ask for', as: ['order', 'prescription'] },
  { id: 'talk', label: 'Talk about', as: ['counseling'] },
  { id: 'questions', label: 'They’ll ask about', as: ['question'] },
  { id: 'checks', label: 'They’ll check', as: ['measurement', 'exam'] },
]
// A follow-up is one list, named for what it holds.
const FOLLOW_LABELS = { lab: 'Tests for', imaging: 'Scans', colorectal: 'You choose', pharmacy: 'To pick up' }

// Returns [{ id, label, items: [{ text, note, ids }] }]. Items that read the same are shown once;
// `ids` are the recommendations behind the row, so a row can be marked as new.
export function visitGroups(visit) {
  const toItems = list => {
    const seen = new Map()
    for (const { rec, step, note } of list) {
      if (!seen.has(step.action)) seen.set(step.action, { text: step.action, note: note || null, ids: [] })
      seen.get(step.action).ids.push(rec.id)
    }
    return [...seen.values()]
  }
  if (visit.kind !== 'book') return [{ id: 'list', label: FOLLOW_LABELS[visit.id] || 'Includes', items: toItems(visit.items) }]
  return BOOK_GROUPS
    .map(g => ({ id: g.id, label: g.label, items: toItems(visit.items.filter(it => g.as.includes(it.step.as))) }))
    .filter(g => g.items.length)
}

// Screener scores can only raise the signal to see a doctor, never lower it.
// A low score never removes or downgrades a recommendation.
export function screenerSignal(score, threshold) {
  return score >= threshold ? 'bring-it-up' : 'expect-it'
}
