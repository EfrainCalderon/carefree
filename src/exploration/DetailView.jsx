import { useState } from 'react'
import { CATEGORY_HOOKS, SCREENING_HOOKS } from './categoryMap'

// Extracts the question text from doctor_prompt strings
function extractQuestion(prompt) {
  if (!prompt) return null
  const match = prompt.match(/'([^']+)'/)
  return match ? match[1] : prompt.replace(/^Ask your doctor:\s*/i, '')
}

function DetailItem({ rec, inPlan, onPlanToggle, index = 0, isExpanded, onExpand }) {
  const question = extractQuestion(rec.doctor_prompt)
  const hook = SCREENING_HOOKS[rec.id]

  return (
    <div
      className={`di${inPlan ? ' di--in-plan' : ''}${isExpanded ? ' di--expanded' : ''}`}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      {/* Tap target: name + chevron */}
      <button
        className="di__trigger"
        onClick={onExpand}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${rec.plain_name}`}
      >
        <span className="di__name">{rec.plain_name}</span>
        <span className={`di__chevron${isExpanded ? ' di__chevron--open' : ''}`}>›</span>
      </button>

      {/* Hook — visible always as teaser/context */}
      {hook && <div className="di__hook">{hook}</div>}

      {/* Expanded details — revealed on tap */}
      {isExpanded && (
        <div className="di__expanded">
          <div className="di__meta-row">
            <span className="di__meta">
              {rec.frequency} · <span className="di__cost">$0 with most insurance</span>
            </span>
            <div className="di__right">
              {rec.testType && <span className="di__type">{rec.testType}</span>}
              <button
                className={`di__add${inPlan ? ' di__add--active' : ''}`}
                onClick={() => onPlanToggle?.(rec.id)}
                aria-label={inPlan ? `Remove ${rec.plain_name} from your plan` : `Add ${rec.plain_name} to your plan`}
              >
                {inPlan ? '✓' : '+'}
              </button>
            </div>
          </div>
          {question && <div className="di__prompt">"{question}"</div>}
        </div>
      )}
    </div>
  )
}

export function DetailView({ cat, onBack, planIds = new Set(), onPlanToggle }) {
  const categoryHook = CATEGORY_HOOKS[cat.id]
  const [expandedIds, setExpandedIds] = useState(new Set())

  function toggleExpand(id) {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      <button className="detail-back" onClick={onBack}>← Back</button>
      <div className="detail-header">
        <span className="detail-header__icon">{cat.icon}</span>
        <div className="detail-header__title">{cat.label}</div>
      </div>

      {categoryHook && (
        <p className="detail-hook">{categoryHook}</p>
      )}

      {cat.schedulable.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-label">Schedule {cat.schedulable.length === 1 ? 'this' : 'these'}</div>
          {cat.schedulable.map((rec, i) => (
            <DetailItem
              key={rec.id}
              rec={rec}
              inPlan={planIds.has(rec.id)}
              onPlanToggle={onPlanToggle}
              index={i}
              isExpanded={expandedIds.has(rec.id)}
              onExpand={() => toggleExpand(rec.id)}
            />
          ))}
        </div>
      )}

      {cat.askDoctor.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-label">Ask your doctor about {cat.askDoctor.length === 1 ? 'this' : 'these'}</div>
          {cat.askDoctor.map((rec, i) => (
            <DetailItem
              key={rec.id}
              rec={rec}
              inPlan={planIds.has(rec.id)}
              onPlanToggle={onPlanToggle}
              index={cat.schedulable.length + i}
              isExpanded={expandedIds.has(rec.id)}
              onExpand={() => toggleExpand(rec.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
