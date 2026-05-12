import './Badge.css'

export function Badge({ grade }) {
  return (
    <span className={`badge badge--${grade.toLowerCase()}`}>
      Grade {grade}
    </span>
  )
}
