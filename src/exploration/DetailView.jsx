import { CATEGORY_HOOKS, SCREENING_HOOKS } from './categoryMap'

// Extracts the question text from doctor_prompt strings
function extractQuestion(prompt) {
  if (!prompt) return null
  const match = prompt.match(/'([^']+)'/)
  return match ? match[1] : prompt.replace(/^Ask your doctor:\s*/i, '')
}

function DetailItem({ rec, inPlan, onPlanToggle, index = 0 }) {
  const question = extractQuestion(rec.doctor_prompt)
  const hook = SCREENING_HOOKS[rec.id]

  return (
    <div
      className={`di${inPlan ? ' di--in-plan' : ''}`}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="di__row">
        <span className="di__name">{rec.plain_name}</span>
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
      <div className="di__meta">{rec.frequency} · <span className="di__cost">$0 with most insurance</span></div>
      {hook && <div className="di__hook">{hook}</div>}
      {question && <div className="di__prompt">"{question}"</div>}
    </div>
  )
}

export function DetailView({ cat, onBack, planIds = new Set(), onPlanToggle }) {
  const categoryHook = CATEGORY_HOOKS[cat.id]

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
            />
          ))}
        </div>
      )}
    </div>
  )
}
