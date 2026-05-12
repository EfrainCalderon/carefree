import { Badge } from '../Badge/Badge'
import './RecCard.css'

export function RecCard({ rec, conditional = false }) {
  return (
    <div className={`rec-card${conditional ? ' rec-card--conditional' : ''}`}>
      <Badge grade={rec.grade} />
      <div className="rec-card__name">{rec.plain_name}</div>
      <div className="rec-card__desc">{rec.description}</div>
      {conditional && rec.doctor_prompt && (
        <div className="rec-card__doctor-prompt">{rec.doctor_prompt}</div>
      )}
    </div>
  )
}
