// Progress: Segmented progress bar. Finished steps are dark, the current step is lighter, the rest are faint.
import { cn } from '@/lib/utils'

export function Progress({ step, total, label }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={Math.min(step + 1, total)}
      aria-valuetext={`Question ${Math.min(step + 1, total)} of ${total}`}
      className="flex gap-1"
    >
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn('h-1 flex-1 rounded-full transition-colors duration-(--cf-motion-base)', i < step ? 'bg-primary' : i === step ? 'bg-[var(--cf-color-green-300)]' : 'bg-tint')} />
      ))}
    </div>
  )
}
