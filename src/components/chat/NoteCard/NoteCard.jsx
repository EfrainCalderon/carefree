// NoteCard: One short note on the plan: an insurance fact, or what the extra questions added.
import { Info } from 'lucide-react'

export function NoteCard({ icon: Icon = Info, children }) {
  return (
    <div className="flex gap-2 rounded-card border bg-card p-2">
      <span aria-hidden className="flex size-3 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><Icon className="size-2" /></span>
      <div>{children}</div>
    </div>
  )
}
