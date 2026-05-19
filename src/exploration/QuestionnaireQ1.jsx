import { useState } from 'react'
import { OptionCard } from '../components/OptionCard/OptionCard'
import { AgeInput } from '../components/AgeInput/AgeInput'
import { Button } from '../components/Button/Button'
import { SoftExit } from '../components/SoftExit/SoftExit'
import { ProgressDots } from '../components/ProgressDots/ProgressDots'
import '../steps/Step.css'

const PRIVATE_OPTION = { value: 'private', label: 'Private / employer insurance', sub: 'Through a job or marketplace' }

const SOFT_EXIT_OPTIONS = [
  {
    value: 'medicare',
    label: 'Medicare or Medicaid',
    msg: "Medicare covers many preventive services, but through its own rules — not the same law this tool is based on. For the most accurate picture of your coverage, visit medicare.gov or call 1-800-MEDICARE.",
  },
  {
    value: 'no_insurance',
    label: 'No insurance',
    msg: "Federally Qualified Health Centers offer preventive care on a sliding-scale fee. Some screenings may be available at no cost. Find a center near you at findahealthcenter.hrsa.gov.",
  },
  {
    value: 'not_sure',
    label: "Not sure",
    msg: "Check your insurance card — the plan name and a customer service number should be on the back. A quick call can confirm your preventive care benefits.",
  },
]

export function QuestionnaireQ1({ onComplete }) {
  const [subStep, setSubStep] = useState(1)
  const [plan, setPlan] = useState(null)
  const [softExit, setSoftExit] = useState(null)
  const [age, setAge] = useState(null)
  const [sex, setSex] = useState(null)
  const [showTransition, setShowTransition] = useState(false)

  function selectPlan() {
    setPlan('private')
    setSoftExit(null)
  }

  function selectSoftExit(opt) {
    setSoftExit(opt)
    setPlan(null)
  }

  function goToResults() {
    setShowTransition(true)
    setTimeout(() => onComplete({ plan: 'private', age, sex }), 1200)
  }

  if (showTransition) {
    return (
      <div className="q-transition">
        <div className="q-transition__text">Here's what applies to you.</div>
        <div className="q-transition__sub">Building your results now…</div>
      </div>
    )
  }

  if (subStep === 1) {
    return (
      <div className="step">
        <ProgressDots total={3} current={0} />
        <div className="step-label">1 of 3</div>
        <div className="step-question">What kind of health insurance do you have?</div>
        <div className="step-hint">This tells us which coverage rules apply to you.</div>

        <div className="option-grid">
          <OptionCard
            label={PRIVATE_OPTION.label}
            sub={PRIVATE_OPTION.sub}
            selected={plan === 'private'}
            onClick={selectPlan}
          />
          {SOFT_EXIT_OPTIONS.map(opt => (
            <OptionCard
              key={opt.value}
              label={opt.label}
              selected={softExit?.value === opt.value}
              onClick={() => selectSoftExit(opt)}
            />
          ))}
        </div>

        {softExit && <SoftExit message={softExit.msg} />}

        <Button variant="primary" ready={!!plan} onClick={() => setSubStep(2)}>
          Continue
        </Button>
      </div>
    )
  }

  if (subStep === 2) {
    return (
      <div className="step">
        <Button variant="ghost" onClick={() => setSubStep(1)}>← Back</Button>
        <ProgressDots total={3} current={1} />
        <div className="step-label">2 of 3</div>
        <div className="step-question">How old are you?</div>
        <div className="step-hint">Your age determines which screenings apply to you.</div>
        <AgeInput value={age} onChange={setAge} />
        <Button variant="primary" ready={age !== null} onClick={() => setSubStep(3)}>
          Continue
        </Button>
      </div>
    )
  }

  return (
    <div className="step">
      <Button variant="ghost" onClick={() => setSubStep(2)}>← Back</Button>
      <ProgressDots total={3} current={2} />
      <div className="step-label">3 of 3</div>
      <div className="step-question">What was your sex assigned at birth?</div>
      <div className="step-hint">
        Almost there. One last thing to make sure your results are accurate for someone your age.
      </div>
      <div className="option-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }].map(o => (
          <OptionCard key={o.value} label={o.label} selected={sex === o.value} onClick={() => setSex(o.value)} />
        ))}
      </div>
      <Button variant="primary" ready={!!sex} onClick={goToResults}>
        See my screenings
      </Button>
    </div>
  )
}
