import { useState, useRef, useEffect } from 'react'
import { OptionCard } from '../components/OptionCard/OptionCard'
import { AgeInput } from '../components/AgeInput/AgeInput'
import { Button } from '../components/Button/Button'
import { SoftExit } from '../components/SoftExit/SoftExit'

const ALL_PLAN_OPTIONS = [
  { value: 'private', label: 'Private / employer insurance', sub: 'Through a job or marketplace', isSoftExit: false },
  { value: 'medicare', label: 'Medicare or Medicaid', isSoftExit: true, msg: "Medicare covers many preventive services, but through its own rules — not the same law this tool is based on. Visit medicare.gov or call 1-800-MEDICARE." },
  { value: 'no_insurance', label: 'No insurance', isSoftExit: true, msg: "Federally Qualified Health Centers offer preventive care on a sliding-scale fee. Find a center at findahealthcenter.hrsa.gov." },
  { value: 'not_sure', label: "Not sure", isSoftExit: true, msg: "Check your insurance card — the plan name and customer service number are on the back." },
]

export function QuestionnaireQ2({ onComplete }) {
  const [planValue, setPlanValue] = useState(null)
  const [age, setAge] = useState(null)
  const [sex, setSex] = useState(null)
  const q2Ref = useRef(null)
  const q3Ref = useRef(null)

  const selectedOpt = ALL_PLAN_OPTIONS.find(p => p.value === planValue)
  const isPrivate = selectedOpt && !selectedOpt.isSoftExit
  const q2Visible = isPrivate
  const q3Visible = isPrivate && age !== null
  const canSubmit = isPrivate && age !== null && sex !== null

  function selectPlan(opt) {
    setPlanValue(opt.value)
    setAge(null)
    setSex(null)
  }

  useEffect(() => {
    if (q2Visible && q2Ref.current) {
      setTimeout(() => q2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    }
  }, [q2Visible])

  useEffect(() => {
    if (q3Visible && q3Ref.current) {
      setTimeout(() => q3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    }
  }, [q3Visible])

  return (
    <div>
      <div className="q-header">
        <div className="q-headline">Let's find your screenings.</div>
        <div className="q-sub">3 quick questions. Takes about 30 seconds.</div>
      </div>

      {/* Q1 — always visible */}
      <div className="q-section">
        <div className="q-section-label">1. What kind of health insurance do you have?</div>
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

      {/* Q2 — reveals after Q1 */}
      <div
        ref={q2Ref}
        className={`q2-question ${q2Visible ? 'q2-question--revealed' : 'q2-question--locked'}`}
      >
        <div className="q-section">
          <div className="q-section-label">2. How old are you?</div>
          {q2Visible ? (
            <AgeInput value={age} onChange={setAge} />
          ) : (
            <div style={{ height: 52, background: 'var(--cf-color-neutral-200)', borderRadius: 8 }} />
          )}
        </div>
      </div>

      {/* Q3 — reveals after Q2 */}
      <div
        ref={q3Ref}
        className={`q2-question ${q3Visible ? 'q2-question--revealed' : 'q2-question--locked'}`}
      >
        <div className="q-section">
          <div className="q-section-label">3. What was your sex assigned at birth?</div>
          {q3Visible ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }].map(o => (
                <OptionCard key={o.value} label={o.label} selected={sex === o.value} onClick={() => setSex(o.value)} />
              ))}
            </div>
          ) : (
            <div style={{ height: 52, background: 'var(--cf-color-neutral-200)', borderRadius: 8 }} />
          )}
        </div>
      </div>

      {canSubmit && (
        <Button variant="primary" ready={true} onClick={() => onComplete({ plan: 'private', age, sex })}>
          See my screenings
        </Button>
      )}
    </div>
  )
}
