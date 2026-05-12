import { useState } from 'react'
import { RecCard } from '../components/RecCard/RecCard'
import { Button } from '../components/Button/Button'
import './Step.css'

export function ResultsStep({ universal, conditional, onBack }) {
  const [accordionOpen, setAccordionOpen] = useState(false)
  const total = universal.length + conditional.length

  return (
    <div className="step">
      <Button variant="ghost" onClick={onBack}>← Back</Button>
      <div className="results-summary">{total} services covered for you</div>
      <div className="results-sub">
        {universal.length} apply based on your age alone.{' '}
        {conditional.length} may apply depending on your health history.
      </div>

      {universal.length > 0 && (
        <div className="results-section">
          <div className="results-heading">Covered for you</div>
          {universal.map(r => <RecCard key={r.id} rec={r} conditional={false} />)}
        </div>
      )}

      {conditional.length > 0 && (
        <div className="conditional-accordion">
          <button
            className={`conditional-toggle${accordionOpen ? ' conditional-toggle--open' : ''}`}
            onClick={() => setAccordionOpen(o => !o)}
          >
            <span>
              May also apply to you{' '}
              <span className="conditional-toggle-meta">— {conditional.length} services</span>
            </span>
            <i className={`conditional-toggle-arrow${accordionOpen ? ' conditional-toggle-arrow--open' : ''}`}>›</i>
          </button>
          {accordionOpen && (
            <div className="conditional-cards">
              {conditional.map(r => <RecCard key={r.id} rec={r} conditional={true} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
