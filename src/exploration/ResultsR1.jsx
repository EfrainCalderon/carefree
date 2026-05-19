import { useState } from 'react'
import { filterRecs, groupByCategory } from './categoryMap'
import { DetailView } from './DetailView'

const CAT_COLORS = {
  heart: '#D94B3D',
  cancer: '#7B4EAB',
  mental: '#3B7DC4',
  infectious: '#2A9D8F',
  womens: '#C26B7E',
  aging: '#D97706',
}

export function ResultsR1({ recommendations, answers, onBack }) {
  const [activeCatId, setActiveCatId] = useState(null)

  const filtered = filterRecs(recommendations, answers)
  const categories = groupByCategory(filtered)

  if (activeCatId) {
    const cat = categories.find(c => c.id === activeCatId)
    return cat
      ? <DetailView cat={cat} onBack={() => setActiveCatId(null)} />
      : null
  }

  const total = filtered.length

  return (
    <div>
      <button className="results-back" onClick={onBack}>← Start over</button>
      <div className="results-header">
        <div className="results-header__greeting">Here's what applies to you.</div>
        <div className="results-header__sub">
          {total} screenings covered — tap a category to see details.
        </div>
      </div>

      <div className="r1-grid">
        {categories.map((cat, i) => {
          const color = CAT_COLORS[cat.colorKey]
          const isLastOdd = categories.length % 2 === 1 && i === categories.length - 1
          const total = cat.schedulable.length + cat.askDoctor.length
          const allConditional = cat.schedulable.length === 0

          return (
            <button
              key={cat.id}
              className={`r1-card${isLastOdd ? ' r1-card--full' : ''}${allConditional ? ' r1-card--muted' : ''}`}
              style={!allConditional ? { background: color } : {}}
              onClick={() => setActiveCatId(cat.id)}
            >
              <span className="r1-card__icon">{cat.icon}</span>
              <div>
                {allConditional ? (
                  <div className="r1-card__count">May apply</div>
                ) : (
                  <>
                    <div className="r1-card__count">{total}</div>
                    <div className="r1-card__count-label">screening{total !== 1 ? 's' : ''}</div>
                  </>
                )}
                <div className="r1-card__name">{cat.label}</div>
                <div className="r1-card__subline">
                  {allConditional
                    ? 'Discuss with your doctor →'
                    : `${cat.schedulable.length} to schedule today →`
                  }
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
