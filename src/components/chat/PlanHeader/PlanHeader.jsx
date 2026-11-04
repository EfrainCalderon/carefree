// PlanHeader: Gradient header for the plan panel and sheets.
import { Grain } from '../Grain/Grain'

// Gradient header shared by the side panel and the sheets.
export function PlanHeader({ plan, ready, children }) {
  const n = plan.visits?.length || 0
  return (
    <div className="cf-gradient relative isolate flex shrink-0 items-start justify-between gap-2 overflow-hidden p-3">
      <Grain />
      <div className="flex flex-col">
        <span className="text-title font-bold tracking-tight">Your visit plan</span>
        <span className="text-body text-[var(--cf-color-green-100)]">
          {ready ? `${n} ${n === 1 ? 'visit' : 'visits'} · $0 with in-network providers` : 'Builds as you answer'}
        </span>
      </div>
      {children}
    </div>
  )
}
