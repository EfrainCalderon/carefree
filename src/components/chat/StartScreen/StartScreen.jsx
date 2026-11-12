// StartScreen: The headline and one plain line on what this is. The first question follows on the same page,
// so the first tap is already an answer.
import { riseProps, useLoaded } from '@/lib/useLoaded'

export function StartScreen({ questions = 3 }) {
  const loaded = useLoaded()
  const rise = (i, extra) => { const p = riseProps(loaded, i); return { ...p, className: `${p.className} ${extra}` } }
  return (
    <div className="space-y-1">
      <h1 {...rise(0, 'text-display font-bold tracking-tight')}>See the checkups you can get at $0</h1>
      <p {...rise(1, 'text-muted-foreground')}>Most insurance covers certain checkups and screenings at no cost. Answer {questions} questions to see yours.</p>
    </div>
  )
}
