// AddedLine: Feedback after an answer: what it added, or that nothing changed.
import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const pill = 'inline-flex min-h-4 items-center gap-1 rounded-full px-2 font-semibold text-foreground'

export function AddedLine({ added = [], removed = [] }) {
  if (!added.length && !removed.length)
    return <p role="status" className={cn(pill, 'border bg-card')}><Check className="size-2" />Got it. Nothing new to add.</p>
  return (
    <div role="status" className="flex flex-col items-start gap-1">
      {added.map(r => (
        <p key={r.id} className={cn(pill, 'bg-tint')}><Plus className="size-2" />{r.plain_name} added</p>
      ))}
      {removed.length > 0 && <p className="text-body text-muted-foreground">{removed.length} {removed.length === 1 ? 'item doesn’t' : 'items don’t'} apply, so we took {removed.length === 1 ? 'it' : 'them'} off.</p>}
    </div>
  )
}
