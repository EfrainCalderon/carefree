// Progress: Segmented progress bar. Finished steps darken left to right; the current step is a lighter green.
import { cn } from '@/lib/utils'

export function Progress({ step, total, label }) {
  const done = step >= total
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">{label} · {done ? 'Done' : `${step + 1} of ${total}`}</p>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(step, total)} className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn('h-1 flex-1 rounded-full', i < step ? 'bg-primary' : i === step ? 'bg-[var(--cf-color-green-300)]' : 'bg-tint')} />
        ))}
      </div>
    </div>
  )
}
