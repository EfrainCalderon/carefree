// QuestionStep: One question per screen. Back and progress share one row, then the question, then its
// answers (children). The question arrives a beat before its answers, so each new screen reads in order
// and it's clear the screen changed even when two questions have the same answers.
import { useEffect, useRef } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '../Progress/Progress'

// details: a short list under the question, each item { lead, text } with the lead in bold so it can be scanned.
// footnote: one line under that list, read before answering.
export function QuestionStep({ title, description, details, footnote, progress, onBack, children }) {
  const heading = useRef(null)
  // Move focus to the new question so screen readers announce it.
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [title])
  let n = 0
  const rise = () => ({ style: { '--i': n++ } })
  return (
    <section aria-labelledby="question-title" className="space-y-3 [--rise-gap:40ms] [--rise-ms:var(--cf-motion-base)] [--rise-y:8px]">
      <div className="space-y-1">
        <div className="flex min-h-6 items-center justify-between gap-2">
          {onBack ? <Button variant="ghost" className="-ml-2" onClick={onBack}><ChevronLeft />Back</Button> : <span />}
          {progress && <p className="text-muted-foreground" aria-hidden>{progress.label} · {progress.step + 1} of {progress.total}</p>}
        </div>
        {progress && <Progress {...progress} />}
      </div>
      <div className="space-y-1">
        <h1 id="question-title" ref={heading} tabIndex={-1} {...rise()} className="cf-rise text-title font-bold tracking-tight focus:outline-none">{title}</h1>
        {description && <p {...rise()} className="cf-rise text-muted-foreground">{description}</p>}
      </div>
      {details && (
        <div {...rise()} className="cf-rise space-y-1">
          <ul className="rounded-card border bg-card px-2 py-1">
            {details.map(d => <li key={d.lead} className="py-1"><strong>{d.lead}</strong>{d.text}</li>)}
          </ul>
          {footnote && <p className="px-2 text-muted-foreground">{footnote}</p>}
        </div>
      )}
      <div {...rise()} className="cf-rise">{children}</div>
    </section>
  )
}
