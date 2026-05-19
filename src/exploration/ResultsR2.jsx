import { useState } from 'react'
import { filterRecs, groupByCategory } from './categoryMap'

function extractQuestion(prompt) {
  if (!prompt) return null
  const match = prompt.match(/'([^']+)'/)
  return match ? match[1] : prompt.replace(/^Ask your doctor:\s*/i, '')
}

const CAT_COLORS = {
  heart: '#D94B3D',
  cancer: '#7B4EAB',
  mental: '#3B7DC4',
  infectious: '#2A9D8F',
  womens: '#C26B7E',
  aging: '#D97706',
}

export function ResultsR2({ recommendations, answers, onBack }) {
  const [openIds, setOpenIds] = useState(new Set())

  const filtered = filterRecs(recommendations, answers)
  const categories = groupByCategory(filtered)
  const total = filtered.length

  function toggle(id) {
    setOpenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div>
      <button className="results-back" onClick={onBack}>← Start over</button>
      <div className="results-header">
        <div className="results-header__greeting">Here's what applies to you.</div>
        <div className="results-header__sub">
          {total} screenings covered — expand a category to see details.
        </div>
      </div>

      {categories.map(cat => {
        const isOpen = openIds.has(cat.id)
        const color = CAT_COLORS[cat.colorKey]
        const schedulableCount = cat.schedulable.length
        const totalCount = cat.schedulable.length + cat.askDoctor.length
        const allConditional = schedulableCount === 0

        return (
          <div key={cat.id} className="r2-row">
            <div className="r2-row__accent" style={{ background: color }} />
            <button className="r2-row__trigger" onClick={() => toggle(cat.id)}>
              <span className="r2-row__icon">{cat.icon}</span>
              <div className="r2-row__body">
                <div className="r2-row__name">{cat.label}</div>
                <div className="r2-row__sub">
                  {allConditional
                    ? 'May apply — discuss with your doctor'
                    : `${schedulableCount} you can schedule today`
                  }
                </div>
              </div>
              <div className="r2-row__right">
                <span className="r2-row__count">{allConditional ? '?' : totalCount}</span>
                <i className={`r2-row__chevron${isOpen ? ' r2-row__chevron--open' : ''}`}>∨</i>
              </div>
            </button>

            {isOpen && (
              <div className="r2-expanded">
                {cat.schedulable.length > 0 && (
                  <>
                    <div className="r2-section-label">Schedule {cat.schedulable.length === 1 ? 'this' : 'these'}</div>
                    {cat.schedulable.map(rec => (
                      <div key={rec.id} className="r2-item">
                        <div className="r2-item__row">
                          <span className="r2-item__name">{rec.plain_name}</span>
                          {rec.testType && <span className="r2-item__type">{rec.testType}</span>}
                        </div>
                        <div className="r2-item__meta">{rec.frequency} · $0 with most insurance</div>
                      </div>
                    ))}
                  </>
                )}
                {cat.askDoctor.length > 0 && (
                  <>
                    <div className="r2-section-label" style={{ marginTop: cat.schedulable.length > 0 ? 14 : 0 }}>
                      Ask your doctor about {cat.askDoctor.length === 1 ? 'this' : 'these'}
                    </div>
                    {cat.askDoctor.map(rec => {
                      const question = extractQuestion(rec.doctor_prompt)
                      return (
                        <div key={rec.id} className="r2-item">
                          <div className="r2-item__row">
                            <span className="r2-item__name">{rec.plain_name}</span>
                            {rec.testType && <span className="r2-item__type">{rec.testType}</span>}
                          </div>
                          <div className="r2-item__meta">{rec.frequency} · $0 with most insurance</div>
                          {question && <div className="r2-item__prompt">"{question}"</div>}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
