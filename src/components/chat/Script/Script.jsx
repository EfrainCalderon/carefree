// Script: Words to say out loud. tone="dark" is for the dark green first-step block.
import { cn } from '@/lib/utils'

export function Script({ label = 'Say', tone, children }) {
  const dark = tone === 'dark'
  return (
    <div className={cn('rounded-control p-2', dark ? 'bg-white/10' : 'bg-tint')}>
      <p className={dark ? 'font-semibold text-[var(--cf-color-green-200)]' : 'cf-label'}>{label}</p>
      <p className="font-semibold">“{children}”</p>
    </div>
  )
}
