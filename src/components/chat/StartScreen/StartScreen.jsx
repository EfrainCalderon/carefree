// StartScreen: What Carefree does, what you'll leave with, and one way in.
import { Button } from '@/components/ui/button'
import { OutputPreview } from '../OutputPreview/OutputPreview'

export function StartScreen({ onStart }) {
  return (
    <section aria-labelledby="start-title" className="space-y-3">
      <div className="space-y-1">
        <h1 id="start-title" className="text-display font-bold tracking-tight">See the checkups you can get at $0</h1>
        <p className="text-muted-foreground">Most insurance covers a set of preventive checkups and screenings at no cost. Answer four quick questions and we’ll show which ones apply to you, and where to get them.</p>
      </div>
      <OutputPreview />
      <div className="space-y-1">
        <Button onClick={onStart}>Get started</Button>
        <p className="text-muted-foreground">About a minute. No account. Your answers stay on this device.</p>
      </div>
    </section>
  )
}
