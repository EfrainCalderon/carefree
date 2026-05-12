import './OptionCard.css'

export function OptionCard({ label, sub, selected, onClick }) {
  return (
    <button
      className={`option-card${selected ? ' option-card--selected' : ''}`}
      onClick={onClick}
    >
      <div>
        <span className="option-card__label">{label}</span>
        {sub && <span className="option-card__sub">{sub}</span>}
      </div>
    </button>
  )
}
