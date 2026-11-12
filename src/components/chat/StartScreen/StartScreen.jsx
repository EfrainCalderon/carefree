// StartScreen: The headline and one line on what this is. There's no "start" button: the first question
// sits right under it, so the first tap is already an answer.
import { riseProps, useLoaded } from '@/lib/useLoaded'

export function StartScreen() {
  const loaded = useLoaded()
  const rise = (i, extra) => { const p = riseProps(loaded, i); return { ...p, className: `${p.className} ${extra}` } }
  return (
    <div className="space-y-1">
      <h1 {...rise(0, 'text-display font-bold tracking-tight')}>See the checkups you can get at $0</h1>
      <p {...rise(1, 'text-muted-foreground')}>Most insurance covers certain checkups and screenings at no cost. Three taps show you yours.</p>
    </div>
  )
}
