// StatCard: The one motivating stat, matched to age and sex.
import { Grain } from '../Grain/Grain'

export function StatCard({ stat }) {
  if (!stat) return null
  return (
    <div className="cf-gradient relative isolate flex max-w-md flex-col gap-1 overflow-hidden rounded-card p-3">
      <Grain />
      <p className="text-display font-bold tracking-tight">{stat.big}</p>
      <p className="text-body text-[var(--cf-color-green-100)]">{stat.text}</p>
      <p className="text-body font-semibold">{stat.action}</p>
      <p className="mt-1 flex flex-wrap items-center gap-1 text-[var(--cf-color-green-200)]">
        Source: {stat.source} <span className="inline-flex min-h-4 items-center rounded-full border border-white/40 px-2">Draft · verify</span>
      </p>
    </div>
  )
}
