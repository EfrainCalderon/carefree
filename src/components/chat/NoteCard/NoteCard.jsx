// NoteCard: Insurance-specific "good to know" note.
import { Info } from 'lucide-react'

export function NoteCard({ children }) {
  return (
    <div className="flex max-w-md gap-3 rounded-card border bg-card p-4 text-[15px]">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><Info className="size-4" /></span>
      <div className="pt-1">{children}</div>
    </div>
  )
}
