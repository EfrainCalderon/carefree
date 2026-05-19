import { useState, useEffect } from 'react'
import { ProgressDots } from './components/ProgressDots/ProgressDots'
import { PlanStep } from './steps/PlanStep'
import { AgeStep } from './steps/AgeStep'
import { SexStep } from './steps/SexStep'
import { ResultsStep } from './steps/ResultsStep'
import { ExplorationShell } from './exploration/ExplorationShell'
import './App.css'

const STEPS = ['plan', 'age', 'sex', 'results']
const STEP_INDEX = { plan: 0, age: 1, sex: 2, results: 2 }

function filterRecs(recommendations, { age, sex }) {
  const universal = [], conditional = []
  recommendations.forEach(r => {
    if (!r.sex.includes(sex)) return
    if (age < r.age_min) return
    if (r.age_max !== null && age > r.age_max) return
    if (r.conditional) conditional.push(r)
    else universal.push(r)
  })
  return { universal, conditional }
}

export default function App() {
  const [mode, setMode] = useState('app')
  const [step, setStep] = useState('plan')
  const [state, setState] = useState({ plan: null, age: null, sex: null })
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    fetch('/data/recommendations.json')
      .then(r => r.json())
      .then(d => setRecommendations(d.recommendations))
  }, [])

  function set(key, val) {
    setState(s => ({ ...s, [key]: val }))
  }

  if (mode === 'explore') {
    return (
      <ExplorationShell
        recommendations={recommendations}
        onExit={() => setMode('app')}
      />
    )
  }

  const { universal, conditional } = step === 'results'
    ? filterRecs(recommendations, state)
    : { universal: [], conditional: [] }

  return (
    <div className="app">
      <div className="flow">
        {step !== 'results' && (
          <ProgressDots total={3} current={STEP_INDEX[step]} />
        )}

        {step === 'plan' && (
          <PlanStep
            value={state.plan}
            onChange={v => set('plan', v)}
            onContinue={() => setStep('age')}
          />
        )}
        {step === 'age' && (
          <AgeStep
            value={state.age}
            onChange={v => set('age', v)}
            onBack={() => setStep('plan')}
            onContinue={() => setStep('sex')}
          />
        )}
        {step === 'sex' && (
          <SexStep
            value={state.sex}
            onChange={v => set('sex', v)}
            onBack={() => setStep('age')}
            onContinue={() => setStep('results')}
          />
        )}
        {step === 'results' && (
          <ResultsStep
            universal={universal}
            conditional={conditional}
            onBack={() => setStep('sex')}
          />
        )}

        <button className="exp-entry-link" onClick={() => setMode('explore')}>
          View design exploration →
        </button>
      </div>
    </div>
  )
}
