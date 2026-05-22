import './PlanBar.css'

export function PlanBar({ count, onSave }) {
  if (count === 0) return null

  return (
    <div className="plan-bar" role="status" aria-live="polite">
      <span className="plan-bar__count">
        <span className="plan-bar__n" key={count}>{count}</span>
        {' '}on your plan
      </span>
      <button className="plan-bar__save" onClick={onSave}>
        View plan
      </button>
    </div>
  )
}
