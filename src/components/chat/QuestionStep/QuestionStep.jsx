// QuestionStep: One question per screen: back, progress, the question, then its answers (children).
import { useEffect, useRef } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '../Progress/Progress'

export function QuestionStep({ title, description, details, progress, onBack, children }) {
  const heading = useRef(null)
  // Move focus to the new question so screen readers announce it.
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [title])
  return (
    <section aria-labelledby="question-title" className="space-y-3">
      <div className="space-y-2">
        {onBack && <Button variant="ghost" className="-ml-2" onClick={onBack}><ChevronLeft />Back</Button>}
        {progress && <Progress {...progress} />}
      </div>
      <div className="space-y-1">
        <h1 id="question-title" ref={heading} tabIndex={-1} className="text-title font-bold tracking-tight focus:outline-none">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
        {details && <ul className="list-disc space-y-1 pt-1 pl-3">{details.map(d => <li key={d}>{d}</li>)}</ul>}
      </div>
      {children}
    </section>
  )
}
