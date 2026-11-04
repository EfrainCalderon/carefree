// AddedLine: Feedback after an answer: what it added, or that nothing changed.
import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const pill = 'inline-flex min-h-8 items-center gap-2 rounded-full py-1 pr-3 pl-2 text-sm font-semibold text-foreground'

export function AddedLine({ added = [], removed = [] }) {
  if (!added.length && !removed.length)
    return <p role="status" className={cn(pill, 'border bg-card')}><Check className="size-4" /><span className="text-trim">Got it. Nothing new to add.</span></p>
  return (
    <div role="status" className="flex flex-col items-start gap-1.5">
      {added.map(r => (
        <p key={r.id} className={cn(pill, 'bg-tint')}><Plus className="size-4" /><span className="text-trim">{r.plain_name} added</span></p>
      ))}
      {removed.length > 0 && <p className="text-sm text-muted-foreground">{removed.length} {removed.length === 1 ? 'item doesn’t' : 'items don’t'} apply, so we took {removed.length === 1 ? 'it' : 'them'} off.</p>}
    </div>
  )
}
