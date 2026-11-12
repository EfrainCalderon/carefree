// OptionList: Answers for one question. A tap answers and moves on; the saved answer shows a check.
// An option can carry a hint (a second, quieter line). `columns` lays short answers out side by side.
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function OptionList({ options, value, onSelect, label, columns = 1 }) {
  return (
    <div role="group" aria-label={label} className={cn('grid gap-1', columns === 2 && 'grid-cols-2')}>
      {options.map(o => {
        const picked = value === o.id
        return (
          <Button
            key={o.id}
            variant="outline"
            aria-pressed={picked}
            className={cn('justify-between py-1 text-left whitespace-normal', picked && 'border-primary bg-tint-subtle')}
            onClick={() => onSelect(o)}
          >
            <span>
              {o.label}
              {o.hint && <span className="block font-normal text-muted-foreground">{o.hint}</span>}
            </span>
            {picked && <Check />}
          </Button>
        )
      })}
    </div>
  )
}
