import { useState, useEffect } from 'react'
import { ProgressDots } from './components/ProgressDots/ProgressDots'
import { PlanStep } from './steps/PlanStep'
import { AgeStep } from './steps/AgeStep'
import { SexStep } from './steps/SexStep'
import { ResultsR3 } from './exploration/ResultsR3'
import './App.css'

const STEP_INDEX = { plan: 0, age: 1, sex: 2, results: 2 }

export default function App() {
  const [step, setStep] = useState('plan')
  const [answers, setAnswers] = useState({ plan: null, age: null, sex: null })
  const [recommendations, setRecommendations] = useState([])

  // Plan state — Set of rec IDs the user has added to their plan
  const [planIds, setPlanIds] = useState(() => {
    try {
      const saved = localStorage.getItem('carefree-plan')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch { return new Set() }
  })

  // Persist plan to localStorage on every change
  useEffect(() => {
    localStorage.setItem('carefree-plan', JSON.stringify([...planIds]))
  }, [planIds])

  // Track whether we arrived via a ?plan= share link
  const [fromPlanLink, setFromPlanLink] = useState(false)

  // Hydrate questionnaire answers from localStorage on mount,
  // and detect ?plan= share links
  useEffect(() => {
    // Check for ?plan= in the URL first
    const params = new URLSearchParams(window.location.search)
    const planParam = params.get('plan')
    if (planParam) {
      const ids = planParam.split(',').filter(Boolean)
      if (ids.length > 0) {
        setPlanIds(new Set(ids))
        setFromPlanLink(true)
        // Clean the URL so sharing again generates a fresh link
        window.history.replaceState({}, '', window.location.pathname)
      }
    }

    // Try to restore answers and jump to results
    try {
      const saved = localStorage.getItem('carefree-answers')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.age && parsed.sex && parsed.plan) {
          setAnswers(parsed)
          setStep('results')
        }
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    fetch('/data/recommendations.json')
      .then(r => r.json())
      .then(d => setRecommendations(d.recommendations))
  }, [])

  function setAnswer(key, val) {
    setAnswers(s => ({ ...s, [key]: val }))
  }

  function handleReachResults() {
    setStep('results')
    // Persist answers so returning users skip the questionnaire
    localStorage.setItem('carefree-answers', JSON.stringify(answers))
  }

  function handleBack() {
    setStep('sex')
    setFromPlanLink(false)
    localStorage.removeItem('carefree-answers')
  }

  // Called when a plan-link visitor clicks "← See all screenings"
  // Stays on results but drops the plan-link context
  function handleViewAll() {
    setFromPlanLink(false)
  }

  function togglePlan(id) {
    setPlanIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function clearPlan() {
    setPlanIds(new Set())
  }

  return (
    <div className="app">
      <div className="flow">
        {step !== 'results' && (
          <ProgressDots total={3} current={STEP_INDEX[step]} />
        )}

        {step === 'plan' && (
          <PlanStep
            value={answers.plan}
            onChange={v => setAnswer('plan', v)}
            onContinue={() => setStep('age')}
          />
        )}
        {step === 'age' && (
          <AgeStep
            value={answers.age}
            onChange={v => setAnswer('age', v)}
            onBack={() => setStep('plan')}
            onContinue={() => setStep('sex')}
          />
        )}
        {step === 'sex' && (
          <SexStep
            value={answers.sex}
            onChange={v => setAnswer('sex', v)}
            onBack={() => setStep('age')}
            onContinue={handleReachResults}
          />
        )}
        {step === 'results' && answers.age && answers.sex && (
          <ResultsR3
            recommendations={recommendations}
            answers={answers}
            planIds={planIds}
            onPlanToggle={togglePlan}
            onClearPlan={clearPlan}
            onBack={handleBack}
            fromPlanLink={fromPlanLink}
            onViewAll={handleViewAll}
          />
        )}

      </div>
    </div>
  )
}
