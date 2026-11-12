// OptInCard: On the plan, the offer to answer the health questions. It says why they matter (some screenings
// only apply to some people); the button says how many questions there are. It doesn't promise a number of extra screenings:
// a count reads as more to do, and it's an upper limit most people never reach.
import { Button } from '@/components/ui/button'

// onDismiss: "No, thank you" hides the offer. Same weight as nothing else on the card: quiet, never a guilt line.
export function OptInCard({ questions, onImprove, onDismiss }) {
  return (
    <div className="space-y-2 rounded-card border bg-card p-2">
      <p>
        <span className="block text-heading font-bold">See if a few more apply to you</span>
        <span className="text-muted-foreground">Things like smoking, blood pressure and weight decide which ones.</span>
      </p>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
        <Button variant="outline" className="w-full sm:w-auto" onClick={onImprove}>Answer {questions === 1 ? 'the question' : `${questions} questions`}</Button>
        {onDismiss && <Button variant="ghost" className="w-full text-muted-foreground sm:w-auto" onClick={onDismiss}>No, thank you</Button>}
      </div>
    </div>
  )
}
