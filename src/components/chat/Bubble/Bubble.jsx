// Bubble: Assistant and user chat messages.
import { cn } from '@/lib/utils'

export function Bubble({ role, children }) {
  const mine = role === 'user'
  return (
    <div className={cn('flex w-full', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] px-2 py-1',
          mine ? 'cf-gradient-bubble rounded-bubble rounded-br-tail' : 'bg-card rounded-bubble rounded-bl-tail shadow-[inset_0_0_0_1px_var(--border)]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
