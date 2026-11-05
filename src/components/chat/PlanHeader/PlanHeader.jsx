// PlanHeader: Gradient header at the top of the plan.
import { Grain } from '../Grain/Grain'
import { cn } from '@/lib/utils'

export function PlanHeader({ plan, ready, className }) {
  const n = plan.visits?.length || 0
  return (
    <div className={cn('cf-gradient relative isolate flex shrink-0 items-center gap-1 overflow-hidden p-3', className)}>
      <Grain />
      <div className="flex flex-col">
        <h1 className="text-title font-bold tracking-tight">Your visit plan</h1>
        <span className="text-[var(--cf-color-green-100)]">
          {ready ? `${n} ${n === 1 ? 'visit' : 'visits'} · ${plan.insurance === 'none' ? 'low or no cost at a health center' : '$0 with in-network providers'}` : 'Builds as you answer'}
        </span>
      </div>
    </div>
  )
}
