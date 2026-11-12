// PlanStep: One step on the plan's timeline: a marker on a rail, a label that says when, and what happens then.
// The steps are equal in weight; their order says what comes first. The step you're on has the filled marker
// (the one place dark green means "do this"). A step you've finished folds down to its label with a check,
// and tapping it opens it again. Tapping any marker moves you to that step.
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const RAIL = 'absolute left-1/2 w-px -translate-x-1/2 bg-[var(--cf-color-green-300)]'

// state: 'done' | 'current' | 'next'. first/last: where the rail starts and stops.
// aside: something on the label's line (a view switch). onSelect: make this the step you're on.
export function PlanStep({ label, detail, state = 'next', first = false, last = false, aside, onSelect, className, children }) {
  const done = state === 'done'
  const current = state === 'current'
  return (
    <li className={cn('grid grid-cols-[32px_minmax(0,1fr)]', className)} aria-current={current ? 'step' : undefined}>
      {/* The marker sits in the middle of the label's row, whatever that row's height. */}
      <div className="relative flex items-center">
        {!first && <span aria-hidden className={cn(RAIL, 'top-0 bottom-1/2')} style={{ left: 16 }} />}
        {!last && <span aria-hidden className={cn(RAIL, 'top-1/2 bottom-0')} style={{ left: 16 }} />}
        <button
          type="button"
          aria-label={`${done ? 'Reopen' : 'Go to'}: ${label}`}
          className="relative flex size-4 items-center justify-center rounded-full"
          onClick={onSelect}
        >
          <span className={cn(
            'flex size-2 items-center justify-center rounded-full',
            current ? 'bg-primary' : done ? 'bg-[var(--cf-color-green-300)] text-primary' : 'border-2 border-outline bg-background',
          )}>
            {done && <Check className="size-[12px]" strokeWidth={3} />}
          </span>
        </button>
      </div>
      <div className="flex min-h-6 flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <h2 className="font-semibold">
          {done
            ? <button type="button" className="text-muted-foreground underline decoration-1 underline-offset-4 hover:decoration-2" onClick={onSelect}>{label}</button>
            : <span className={current ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>}
          {detail && !done && <span className="font-normal text-muted-foreground"> · {detail}</span>}
        </h2>
        {!done && aside}
      </div>
      <div className="relative">{!last && <span aria-hidden className={cn(RAIL, 'inset-y-0')} style={{ left: 16 }} />}</div>
      <div className={cn(!last && 'pb-3', !done && 'pt-1')}>{!done && children}</div>
    </li>
  )
}
