import './SoftExit.css'

export function SoftExit({ message }) {
  if (!message) return null
  return (
    <div className="soft-exit">
      <p>{message}</p>
    </div>
  )
}
