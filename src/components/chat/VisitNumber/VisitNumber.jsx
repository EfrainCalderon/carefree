// VisitNumber: Numbered badge for a visit.
import { cn } from '@/lib/utils'

// Numbered visit badge. `on` = the open visit (solid), otherwise tint.
export function VisitNumber({ n, on, size }) {
  return (
    <span className={cn(
      'flex shrink-0 items-center justify-center rounded-control font-bold',
      size === 'lg' ? 'size-5 text-heading' : 'size-4',
      on ? 'bg-primary text-primary-foreground shadow-[inset_0_0_0_2px_var(--primary),inset_0_0_0_4px_#fff]' : 'bg-tint text-primary'
    )}>{n}</span>
  )
}
