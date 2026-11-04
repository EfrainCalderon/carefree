// StatCard: The one motivating stat, matched to age and sex.
import { Grain } from '../Grain/Grain'

export function StatCard({ stat }) {
  if (!stat) return null
  return (
    <div className="cf-gradient relative isolate flex max-w-md flex-col gap-1.5 overflow-hidden rounded-card p-5">
      <Grain />
      <p className="text-[40px] leading-none font-extrabold tracking-tight text-trim">{stat.big}</p>
      <p className="text-base text-[var(--cf-color-green-100)]">{stat.text}</p>
      <p className="text-[15px] font-semibold">{stat.action}</p>
      <p className="mt-1 text-[13px] text-[var(--cf-color-green-200)]">
        Source: {stat.source} <span className="ml-1 inline-block rounded-full border border-white/40 px-2 py-0.5 trim:py-1.5 text-trim text-xs">Draft · verify</span>
      </p>
    </div>
  )
}
