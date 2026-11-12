// StartScreen: What Carefree does, what you'll leave with, and one way in. Each line says one thing once.
// The blocks arrive in reading order: headline, what it is, what you get, then the button.
import { Button } from '@/components/ui/button'
import { riseProps, useLoaded } from '@/lib/useLoaded'
import { OutputPreview } from '../OutputPreview/OutputPreview'

export function StartScreen({ onStart, questions = 3 }) {
  const loaded = useLoaded()
  const rise = (i, extra = '') => { const p = riseProps(loaded, i); return { ...p, className: `${p.className} ${extra}`.trim() } }
  return (
    <section aria-labelledby="start-title" className="space-y-3">
      <div className="space-y-1">
        <h1 id="start-title" {...rise(0, 'text-display font-bold tracking-tight')}>See the checkups you can get at $0</h1>
        <p {...rise(1, 'text-muted-foreground')}>Most insurance covers certain checkups and screenings at no cost. Answer {questions} quick questions to see yours.</p>
      </div>
      <div {...rise(2)}><OutputPreview /></div>
      <div {...rise(3, 'space-y-1')}>
        <Button className="w-full sm:w-auto" onClick={onStart}>Build my plan</Button>
        <p className="text-muted-foreground">About a minute. No account. Your answers stay on this device.</p>
      </div>
    </section>
  )
}
