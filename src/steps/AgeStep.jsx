import { AgeInput } from '../components/AgeInput/AgeInput'
import { Button } from '../components/Button/Button'
import './Step.css'

export function AgeStep({ value, onChange, onBack, onContinue }) {
  return (
    <div className="step">
      <Button variant="ghost" onClick={onBack}>← Back</Button>
      <div className="step-label">Step 2 of 3</div>
      <div className="step-question">How old are you?</div>
      <div className="step-hint">Your age determines which screenings apply to you.</div>
      <AgeInput value={value} onChange={onChange} />
      <Button variant="primary" ready={value !== null} onClick={onContinue}>
        Continue
      </Button>
    </div>
  )
}
