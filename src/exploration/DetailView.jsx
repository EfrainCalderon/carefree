// Extracts the question text from "Ask your doctor: 'question here'"
function extractQuestion(prompt) {
  if (!prompt) return null
  const match = prompt.match(/'([^']+)'/)
  return match ? match[1] : prompt.replace(/^Ask your doctor:\s*/i, '')
}

function DetailItem({ rec }) {
  const question = extractQuestion(rec.doctor_prompt)
  return (
    <div className="di">
      <div className="di__row">
        <span className="di__name">{rec.plain_name}</span>
        {rec.testType && <span className="di__type">{rec.testType}</span>}
      </div>
      <div className="di__meta">{rec.frequency} · $0 with most insurance</div>
      {question && <div className="di__prompt">"{question}"</div>}
    </div>
  )
}

export function DetailView({ cat, onBack }) {
  return (
    <div>
      <button className="detail-back" onClick={onBack}>← Back</button>
      <div className="detail-header">
        <span className="detail-header__icon">{cat.icon}</span>
        <div className="detail-header__title">{cat.label}</div>
      </div>

      {cat.schedulable.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-label">Schedule {cat.schedulable.length === 1 ? 'this' : 'these'}</div>
          {cat.schedulable.map(rec => <DetailItem key={rec.id} rec={rec} />)}
        </div>
      )}

      {cat.askDoctor.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-label">Ask your doctor about {cat.askDoctor.length === 1 ? 'this' : 'these'}</div>
          {cat.askDoctor.map(rec => <DetailItem key={rec.id} rec={rec} />)}
        </div>
      )}
    </div>
  )
}
