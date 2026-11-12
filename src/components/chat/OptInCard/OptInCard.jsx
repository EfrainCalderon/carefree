// OptInCard: On the plan, the offer to answer the health questions. It says why they matter (some screenings
// only apply to some people); the button says how many questions there are. It doesn't promise a number of extra screenings:
// a count reads as more to do, and it's an upper limit most people never reach.
import { Button } from '@/components/ui/button'

export function OptInCard({ questions, onImprove }) {
  return (
    <div className="space-y-2 rounded-card border bg-card p-2">
      <p>
        <span className="block text-heading font-bold">A few screenings depend on your health</span>
        <span className="text-muted-foreground">Things like smoking or blood pressure decide whether they apply to you.</span>
      </p>
      <Button variant="outline" className="w-full sm:w-auto" onClick={onImprove}>Answer {questions === 1 ? 'the question' : `${questions} questions`}</Button>
    </div>
  )
}
