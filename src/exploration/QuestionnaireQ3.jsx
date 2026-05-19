import { useState } from 'react'
import { OptionCard } from '../components/OptionCard/OptionCard'
import { AgeInput } from '../components/AgeInput/AgeInput'
import { Button } from '../components/Button/Button'
import { SoftExit } from '../components/SoftExit/SoftExit'

const ALL_PLAN_OPTIONS = [
  { value: 'private', label: 'Private / employer insurance', sub: 'Through a job or marketplace', isSoftExit: false },
  { value: 'medicare', label: 'Medicare or Medicaid', isSoftExit: true, msg: "Medicare covers many preventive services, but through its own rules — not the same law this tool is based on." },
  { value: 'no_insurance', label: 'No insurance', isSoftExit: true, msg: "Federally Qualified Health Centers offer preventive care on a sliding-scale fee. Find a center at findahealthcenter.hrsa.gov." },
  { value: 'not_sure', label: "Not sure", isSoftExit: true, msg: "Check your insurance card — the plan name and customer service number should be on the back." },
]

export function QuestionnaireQ3({ onComplete }) {
  const [planValue, setPlanValue] = useState(null)
  const [age, setAge] = useState(null)
  const [sex, setSex] = useState(null)

  const selectedOpt = ALL_PLAN_OPTIONS.find(p => p.value === planValue)
  const isPrivate = selectedOpt && !selectedOpt.isSoftExit
  const canSubmit = isPrivate && age !== null && sex !== null

  function selectPlan(opt) {
    setPlanValue(opt.value)
    setAge(null)
    setSex(null)
  }

  return (
    <div>
      <div className="q-header">
        <div className="q-headline">Tell us about yourself.</div>
        <div className="q-sub">We'll use this to find screenings covered at no cost under your insurance.</div>
      </div>

      <div className="q-section">
        <div className="q-section-label">What kind of health insurance do you have?</div>
        <div className="q-option-grid">
          {ALL_PLAN_OPTIONS.map(opt => (
            <OptionCard
              key={opt.value}
              label={opt.label}
              sub={opt.sub}
              selected={planValue === opt.value}
              onClick={() => selectPlan(opt)}
            />
          ))}
        </div>
        {selectedOpt?.isSoftExit && (
          <div style={{ marginTop: 12 }}>
            <SoftExit message={selectedOpt.msg} />
          </div>
        )}
      </div>

      <div className="q-section">
        <div className="q-section-label">Your age</div>
        <AgeInput value={age} onChange={setAge} />
      </div>

      <div className="q-section">
        <div className="q-section-label">What was your sex assigned at birth?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }].map(o => (
            <OptionCard key={o.value} label={o.label} selected={sex === o.value} onClick={() => setSex(o.value)} />
          ))}
        </div>
      </div>

      <Button variant="primary" ready={canSubmit} onClick={() => onComplete({ plan: 'private', age, sex })}>
        Continue →
      </Button>
    </div>
  )
}
