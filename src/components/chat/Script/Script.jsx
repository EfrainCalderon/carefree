// Script: Words to say out loud, when booking or at the visit. The one tinted block on a card.
export function Script({ label = 'Say', children }) {
  return (
    <div className="rounded-control bg-tint p-2">
      <p className="cf-label">{label}</p>
      <p className="font-semibold">“{children}”</p>
    </div>
  )
}
