// PlanHeader: Gradient header for the plan panel and sheets. `children` (the hide button) sits on the left.
import { Grain } from '../Grain/Grain'

export function PlanHeader({ plan, ready, children }) {
  const n = plan.visits?.length || 0
  return (
    <div className="cf-gradient relative isolate flex shrink-0 items-center gap-1 overflow-hidden p-3">
      <Grain />
      {children}
      <div className="flex flex-col">
        <span className="text-title font-bold tracking-tight">Your visit plan</span>
        <span className="text-[var(--cf-color-green-100)]">
          {ready ? `${n} ${n === 1 ? 'visit' : 'visits'} · $0 with in-network providers` : 'Builds as you answer'}
        </span>
      </div>
    </div>
  )
}
