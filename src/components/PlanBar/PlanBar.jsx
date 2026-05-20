import './PlanBar.css'

export function PlanBar({ count, onSave }) {
  return (
    <div className="plan-bar" role="status" aria-live="polite">
      {count === 0 ? (
        <span className="plan-bar__empty">Tap + to start your plan</span>
      ) : (
        <span className="plan-bar__count">
          <span className="plan-bar__n" key={count}>{count}</span>
          {' '}on your plan
        </span>
      )}
      {count > 0 && (
        <button className="plan-bar__save" onClick={onSave}>
          Save plan
        </button>
      )}
    </div>
  )
}
