import './PlanBar.css'

export function PlanBar({ count, onSave }) {
  return (
    <div className="plan-bar" role="status" aria-live="polite">
      {count === 0 ? (
        <span className="plan-bar__empty">Tap + to claim any screening</span>
      ) : (
        <span className="plan-bar__count">
          <span className="plan-bar__n" key={count}>{count}</span>
          {' '}claimed
        </span>
      )}
      {count > 0 && (
        <button className="plan-bar__save" onClick={onSave}>
          Save these
        </button>
      )}
    </div>
  )
}
