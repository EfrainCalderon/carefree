// NoteCard: Insurance-specific "good to know" note.
import { Info } from 'lucide-react'

export function NoteCard({ children }) {
  return (
    <div className="flex max-w-md gap-2 rounded-card border bg-card p-2">
      <span className="flex size-3 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><Info className="size-2" /></span>
      <div>{children}</div>
    </div>
  )
}
