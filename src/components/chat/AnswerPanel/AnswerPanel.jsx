// AnswerPanel: The one place answers happen, beside (or above) the plan they change.
// Answered basics read back as chips you can tap to change. Under them sits whatever comes next:
// a question, the offer of more questions, or a line saying the plan is up to date.
import { useEffect, useRef } from 'react'
import { ChevronLeft, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OptionList } from '../OptionList/OptionList'
import { Progress } from '../Progress/Progress'

// answers: [{ id, label }] shown as chips. question: { id, title, description, details, footnote, options, columns, value }.
// progress + onBack + onSkip: for the optional health questions. feedback: what the last answer changed.
// offer: { count, questions, free } invites the health questions (free: false when they aren't free, as without insurance). done: { title, detail } for when they're finished.
export function AnswerPanel({ answers = [], onEdit, question, progress, onAnswer, onBack, onSkip, feedback, offer, onTune, done, onRetune, children }) {
  const heading = useRef(null)
  const first = useRef(true)
  // Move focus to each new question so screen readers announce it, but never on page load.
  useEffect(() => {
    if (first.current) { first.current = false; return }
    heading.current?.focus({ preventScroll: true })
  }, [question?.id])
  let n = 0
  const rise = () => ({ style: { '--i': n++ } })
  return (
    <section aria-label="Your answers" className="space-y-2 rounded-card border bg-card p-2 [--rise-gap:40ms] [--rise-ms:var(--cf-motion-base)] [--rise-y:8px]">
      {answers.length > 0 && (
        <ul aria-label="Answers so far. Tap one to change it." className="flex flex-wrap gap-x-1 gap-y-2">
          {answers.map(a => (
            <li key={a.id}>
              {/* 32px pill with a 48px tap area. */}
              <button
                type="button"
                className="relative inline-flex min-h-4 items-center gap-1 rounded-full bg-tint px-2 font-semibold transition-colors duration-(--cf-motion-fast) after:absolute after:-inset-y-1 after:inset-x-0 hover:bg-[var(--cf-color-green-200)]"
                onClick={() => onEdit(a.id)}
              >
                {a.label}<Pencil aria-hidden className="size-2 text-muted-foreground" /><span className="sr-only">, change</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Always in the page so screen readers hear changes as they happen. */}
      <p role="status" className={feedback ? 'cf-fade flex gap-1 font-semibold' : 'sr-only'}>
        {feedback && <span aria-hidden className="flex size-3 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><Plus className="size-2" /></span>}
        {feedback || (!question && done?.title)}
      </p>
      {question && (
        <div key={question.id} className="space-y-2">
          {progress && (
            <div className="space-y-1">
              <div className="flex min-h-6 items-center justify-between gap-2">
                {onBack ? <Button variant="ghost" className="-ml-2" onClick={onBack}><ChevronLeft />Back</Button> : <span />}
                <p className="text-muted-foreground" aria-hidden>{progress.label} · {progress.step + 1} of {progress.total}</p>
              </div>
              <Progress {...progress} />
            </div>
          )}
          <div className="space-y-1">
            <h2 ref={heading} tabIndex={-1} {...rise()} className="cf-rise text-title font-bold tracking-tight focus:outline-none">{question.title}</h2>
            {question.description && <p {...rise()} className="cf-rise text-muted-foreground">{question.description}</p>}
          </div>
          {question.details && (
            <div {...rise()} className="cf-rise space-y-1">
              <ul className="rounded-control bg-tint-subtle px-2 py-1">
                {question.details.map(d => <li key={d.lead} className="py-1"><strong>{d.lead}</strong>{d.text}</li>)}
              </ul>
              {question.footnote && <p className="text-muted-foreground">{question.footnote}</p>}
            </div>
          )}
          <div {...rise()} className="cf-rise space-y-1">
            <OptionList label={question.title} options={question.options} columns={question.columns} value={question.value} onSelect={onAnswer} />
            {onSkip && <Button variant="ghost" className="w-full" onClick={onSkip}>Skip this one</Button>}
          </div>
        </div>
      )}
      {!question && offer && (
        <div className="space-y-2">
          <p>
            <span className="block text-heading font-bold">Up to {offer.count} more could {offer.free === false ? 'apply to you' : 'be free for you'}</span>
            <span className="text-muted-foreground">{offer.questions} quick {offer.questions === 1 ? 'question' : 'questions'} about your health. Your plan updates as you answer.</span>
          </p>
          <Button variant="outline" className="w-full" onClick={onTune}>Answer {offer.questions === 1 ? 'the question' : `${offer.questions} questions`}</Button>
        </div>
      )}
      {!question && done && (
        <div>
          <p className="text-heading font-bold">{done.title}</p>
          {done.detail && <p className="text-muted-foreground">{done.detail}</p>}
          {onRetune && <Button variant="ghost" className="-ml-2" onClick={onRetune}>Change my health answers</Button>}
        </div>
      )}
      {children}
    </section>
  )
}
