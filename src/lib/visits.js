// Group a person's eligible recommendations by the visits they'll actually make.
//
// recs:   recommendations already filtered for this person (see filterRecs in App.jsx)
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

// Screener scores can only raise the signal to see a doctor, never lower it.
// A low score never removes or downgrades a recommendation.
export function screenerSignal(score, threshold) {
  return score >= threshold ? 'bring-it-up' : 'expect-it'
}
