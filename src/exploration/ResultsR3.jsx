import { useState } from 'react'
import { filterRecs, groupByCategory } from './categoryMap'
import { DetailView } from './DetailView'

const CAT_BG = {
  heart: 'rgba(217,75,61,0.09)',
  cancer: 'rgba(123,78,171,0.09)',
  mental: 'rgba(59,125,196,0.09)',
  infectious: 'rgba(42,157,143,0.09)',
  womens: 'rgba(194,107,126,0.09)',
  aging: 'rgba(217,119,6,0.09)',
}

export function ResultsR3({ recommendations, answers, onBack }) {
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
        <div className="results-header__sub">{total} screenings — tap a category for details.</div>
      </div>

      <div className="r3-grid">
        {categories.map((cat, i) => {
          const bg = CAT_BG[cat.colorKey]
          const totalCount = cat.schedulable.length + cat.askDoctor.length
          const allConditional = cat.schedulable.length === 0
          const isLastOdd = categories.length % 2 === 1 && i === categories.length - 1

          return (
            <button
              key={cat.id}
              className={`r3-card${isLastOdd ? ' r3-card--full' : ''}`}
              style={{ background: bg }}
              onClick={() => setActiveCatId(cat.id)}
            >
              {allConditional && <span className="r3-card__dot" />}
              <span className="r3-card__icon">{cat.icon}</span>
              <div className="r3-card__name">{cat.label}</div>
              <div className="r3-card__count">
                {allConditional ? 'Ask your doctor' : `${totalCount} screening${totalCount !== 1 ? 's' : ''}`}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
