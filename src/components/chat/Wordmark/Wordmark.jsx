// Wordmark: The name, set so it reads both ways: care that's free, and carefree.
import { cn } from '@/lib/utils'

export function Wordmark({ className }) {
  return (
    <p className={cn('text-title tracking-tight', className)}>
      <span className="sr-only">Carefree</span>
      <span aria-hidden>Care<span className="font-bold">free</span></span>
    </p>
  )
}
