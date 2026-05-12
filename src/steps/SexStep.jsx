import { OptionCard } from '../components/OptionCard/OptionCard'
import { Button } from '../components/Button/Button'
import './Step.css'

const SEX_OPTIONS = [
  { value: 'male',   label: 'Male' },
  { value: 'female', label: 'Female' },
]

export function SexStep({ value, onChange, onBack, onContinue }) {
  return (
    <div className="step">
      <Button variant="ghost" onClick={onBack}>← Back</Button>
      <div className="step-label">Step 3 of 3</div>
      <div className="step-question">What sex were you assigned at birth?</div>
      <div className="step-hint">
        This helps your checklist include the right screenings, since some depend on which organs you were born with.
      </div>
      <div className="option-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {SEX_OPTIONS.map(o => (
          <OptionCard
            key={o.value}
            label={o.label}
            selected={value === o.value}
            onClick={() => onChange(o.value)}
          />
        ))}
      </div>
      <Button variant="primary" ready={!!value} onClick={onContinue}>
        See what's covered for me
      </Button>
    </div>
  )
}
