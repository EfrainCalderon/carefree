// Bubble: Assistant and user chat messages.
import { cn } from '@/lib/utils'

// Text is trimmed to cap top and baseline, so padding is measured from the letters, on any
// number of lines. Assistant sentences always have descenders (g, p, y) hanging ~3px below the
// baseline, so they pad 12 above / 16 below to leave equal visible space. User replies are mostly
// chip answers (numbers, short words) without descenders, so they pad an even 14.
export function Bubble({ role, children }) {
  const mine = role === 'user'
  return (
    <div className={cn('flex w-full', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] px-3.5 py-2.5 text-trim text-base leading-normal',
          mine ? 'cf-gradient-bubble rounded-bubble rounded-br-tail trim:py-3.5' : 'bg-card border rounded-bubble rounded-bl-tail trim:pt-3 trim:pb-4'
        )}
      >
        {children}
      </div>
    </div>
  )
}
