import { useState } from 'react'
import { QuestionnaireQ1 } from './QuestionnaireQ1'
import { QuestionnaireQ2 } from './QuestionnaireQ2'
import { QuestionnaireQ3 } from './QuestionnaireQ3'
import { ResultsR1 } from './ResultsR1'
import { ResultsR2 } from './ResultsR2'
import { ResultsR3 } from './ResultsR3'
import './exploration.css'

const PERSONAS = {
  marcus: { plan: 'private', age: 47, sex: 'male' },
  diana: { plan: 'private', age: 41, sex: 'female' },
}

const Q_LABELS = {
  1: { short: 'Q1 Per-screen', rec: false },
  2: { short: 'Q2 Progressive', rec: true },
  3: { short: 'Q3 All-at-once', rec: false },
}

const R_LABELS = {
  1: { short: 'R1 Stat grid', rec: true },
  2: { short: 'R2 Rows', rec: false },
  3: { short: 'R3 Icon grid', rec: false },
}

export function ExplorationShell({ recommendations, onExit }) {
  const [qOption, setQOption] = useState(2)
  const [rOption, setROption] = useState(1)
  const [persona, setPersona] = useState(null)
  const [step, setStep] = useState('questionnaire')
  const [answers, setAnswers] = useState(null)

  function applyPersona(key) {
    setPersona(key)
    setAnswers(PERSONAS[key])
    setStep('results')
  }

  function clearPersona() {
    setPersona(null)
    setAnswers(null)
    setStep('questionnaire')
  }

  function handleQComplete(a) {
    setAnswers(a)
    setPersona(null)
    setStep('results')
  }

  function handleBack() {
    setAnswers(null)
    setPersona(null)
    setStep('questionnaire')
  }

  // Switching Q option resets questionnaire if mid-flow (components unmount = fresh state)
  function switchQOption(opt) {
    setQOption(opt)
    if (step === 'questionnaire') setAnswers(null)
  }

  const QComp = qOption === 1 ? QuestionnaireQ1 : qOption === 2 ? QuestionnaireQ2 : QuestionnaireQ3
  const RComp = rOption === 1 ? ResultsR1 : rOption === 2 ? ResultsR2 : ResultsR3

  return (
    <div className="exp-shell">
      <div className="exp-header">
        <div className="exp-header__top">
          <span className="exp-header__brand">Carefree · Design Exploration</span>
          <button className="exp-header__back" onClick={onExit}>← Back to app</button>
        </div>

        <div className="exp-header__controls">
          <div className="exp-control-group">
            <span className="exp-control-label">Questionnaire</span>
            <div className="exp-pill-group">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`exp-pill${Q_LABELS[n].rec ? ' exp-pill--rec' : ''}${qOption === n ? ' exp-pill--active' : ''}`}
                  onClick={() => switchQOption(n)}
                >
                  {Q_LABELS[n].short}
                </button>
              ))}
            </div>
          </div>

          <div className="exp-control-group">
            <span className="exp-control-label">Results</span>
            <div className="exp-pill-group">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`exp-pill${R_LABELS[n].rec ? ' exp-pill--rec' : ''}${rOption === n ? ' exp-pill--active' : ''}`}
                  onClick={() => setROption(n)}
                >
                  {R_LABELS[n].short}
                </button>
              ))}
            </div>
          </div>

          <div className="exp-control-group">
            <span className="exp-control-label">Persona</span>
            <div className="exp-pill-group">
              <button
                className={`exp-pill${persona === 'marcus' ? ' exp-pill--active' : ''}`}
                onClick={() => applyPersona('marcus')}
              >
                Marcus 47M
              </button>
              <button
                className={`exp-pill${persona === 'diana' ? ' exp-pill--active' : ''}`}
                onClick={() => applyPersona('diana')}
              >
                Diana 41F
              </button>
              <button
                className={`exp-pill${persona === null ? ' exp-pill--active' : ''}`}
                onClick={clearPersona}
              >
                Manual
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="exp-content">
        <div className="exp-flow">
          {step === 'questionnaire' && (
            <QComp key={qOption} onComplete={handleQComplete} />
          )}
          {step === 'results' && answers && (
            <RComp
              key={`${rOption}-${answers.age}-${answers.sex}`}
              recommendations={recommendations}
              answers={answers}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  )
}
