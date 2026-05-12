import './ProgressDots.css'

export function ProgressDots({ total, current }) {
  return (
    <div className="progress">
      {Array.from({ length: total }).map((_, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : ''
        return <div key={i} className={`progress-dot${state ? ` progress-dot--${state}` : ''}`} />
      })}
    </div>
  )
}
