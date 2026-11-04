// Chips: Tap-to-answer options. Most answers in Carefree are chips.
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Tap-to-answer options. In the chat they disappear once answered (the reply bubble shows the choice);
// pass keepAfterAnswer to show the locked state instead.
export function Chips({ options, value, onSelect, label, keepAfterAnswer, onChange }) {
  const done = value != null
  if (done && !keepAfterAnswer) return null
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(o => {
        const picked = value === o.id
        return (
          <Button
            key={o.id}
            variant={picked ? 'default' : 'outline'}
            className={cn('rounded-full px-4', done && picked && 'disabled:bg-primary disabled:text-primary-foreground', done && !picked && 'disabled:bg-tint disabled:border-tint disabled:text-muted-foreground')}
            aria-pressed={picked}
            disabled={done}
            onClick={() => onSelect(o)}
          >
            {picked && <Check />}
            {o.label}
          </Button>
        )
      })}
      {done && onChange && (
        <button type="button" onClick={onChange} className="min-h-11 px-1 text-[15px] font-semibold text-primary underline underline-offset-3">Change answer</button>
      )}
    </div>
  )
}
