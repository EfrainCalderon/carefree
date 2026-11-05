// OptionList: Stacked answers for one question. A tap answers and moves on; the saved answer shows a check.
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function OptionList({ options, value, onSelect, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-1">
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
            {o.label}
            {picked && <Check />}
          </Button>
        )
      })}
    </div>
  )
}
