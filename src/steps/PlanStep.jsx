import { useState } from 'react'
import { OptionCard } from '../components/OptionCard/OptionCard'
import { SoftExit } from '../components/SoftExit/SoftExit'
import { Button } from '../components/Button/Button'
import './Step.css'

const PLANS = [
  { value: 'employer',    label: 'Employer',     sub: 'Coverage through a job' },
  { value: 'marketplace', label: 'Marketplace',  sub: 'healthcare.gov' },
  { value: 'tricare',     label: 'TRICARE',      sub: 'Military coverage' },
]

const SOFT_EXITS = {
  medicare:  "Medicare covers many preventive services, but through its own rules — not the same law this tool is based on. For the most accurate picture of your coverage, visit medicare.gov or call 1-800-MEDICARE.",
  medicaid:  "Medicaid coverage varies by state and doesn't follow the same rules as employer or marketplace plans. Contact your state's Medicaid office or call the number on your insurance card to ask about free preventive care.",
  shortterm: "Short-term health plans aren't required to cover preventive care at no cost. Check your plan documents or call your insurer to understand what's covered.",
  unsure:    "Check your insurance card — the plan name and a customer service number should be on the back. A quick call can tell you what type of plan you have and confirm your preventive care benefits.",
}

export function PlanStep({ value, onChange, onContinue }) {
  const [expanderOpen, setExpanderOpen] = useState(false)
  const [softExit, setSoftExit] = useState(null)

  function selectPlan(planValue) {
    setSoftExit(null)
    onChange(planValue)
  }

  function selectSoftExit(key) {
    onChange(null)
    setSoftExit(key)
  }

  return (
    <div className="step">
      <div className="step-label">Step 1 of 3</div>
      <div className="step-question">What type of health insurance do you have?</div>
      <div className="step-hint">This tells us which rules apply to your coverage.</div>

      <div className="option-grid">
        {PLANS.map(p => (
          <OptionCard
            key={p.value}
            label={p.label}
            sub={p.sub}
            selected={value === p.value}
            onClick={() => selectPlan(p.value)}
          />
        ))}
      </div>

      <button className="expander-trigger" onClick={() => setExpanderOpen(o => !o)}>
        <span className={`expander-arrow${expanderOpen ? ' expander-arrow--open' : ''}`}>›</span>
        My situation is different
      </button>

      {expanderOpen && (
        <div className="expander-content">
          {Object.keys(SOFT_EXITS).map(key => (
            <button key={key} className="expander-option" onClick={() => selectSoftExit(key)}>
              {{ medicare: 'Medicare', medicaid: 'Medicaid or Medi-Cal', shortterm: 'Short-term or limited plan', unsure: "I'm not sure" }[key]}
            </button>
          ))}
        </div>
      )}

      {softExit && <SoftExit message={SOFT_EXITS[softExit]} />}

      <div style={{ marginTop: 'var(--cf-spacing-6)' }}>
        <Button variant="primary" ready={!!value} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
