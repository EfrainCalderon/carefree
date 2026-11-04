// Bubble: Assistant and user chat messages.
import { cn } from '@/lib/utils'

export function Bubble({ role, children }) {
  const mine = role === 'user'
  return (
    <div className={cn('flex w-full', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] px-3.5 py-2.5 text-base leading-normal',
          mine ? 'cf-gradient-bubble rounded-bubble rounded-br-tail' : 'bg-card border rounded-bubble rounded-bl-tail'
        )}
      >
        {children}
      </div>
    </div>
  )
}
