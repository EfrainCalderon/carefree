// PlanHeader: Gradient header for the plan panel and sheets.
import { Grain } from '../Grain/Grain'

// Gradient header shared by the side panel and the sheets.
export function PlanHeader({ plan, ready, children }) {
  const n = plan.visits?.length || 0
  return (
    <div className="cf-gradient relative isolate flex shrink-0 items-start justify-between gap-3 overflow-hidden px-6 pt-5.5 pb-5">
      <Grain />
      <div className="flex flex-col">
        <span className="text-[26px] leading-tight font-extrabold tracking-tight">Your visit plan</span>
        <span className="text-[15px] text-[var(--cf-color-green-100)]">
          {ready ? `${n} ${n === 1 ? 'visit' : 'visits'} · $0 with in-network providers` : 'Builds as you answer'}
        </span>
      </div>
      {children}
    </div>
  )
}
