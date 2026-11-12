// OptInCard: On the plan, the offer to answer the extra questions. It comes after the plan, so people
// see what they get before they're asked for more.
import { Button } from '@/components/ui/button'

export function OptInCard({ count, questions, onImprove }) {
  return (
    <div className="cf-no-print space-y-2 rounded-card border bg-card p-2">
      <p>
        <span className="block text-heading font-bold">Up to {count} more could be free for you</span>
        <span className="text-muted-foreground">Answer {questions} quick {questions === 1 ? 'question' : 'questions'} about your health to find out. Your answers stay on this device.</span>
      </p>
      <Button variant="outline" className="w-full sm:w-auto" onClick={onImprove}>Answer {questions === 1 ? 'the question' : `${questions} questions`}</Button>
    </div>
  )
}
