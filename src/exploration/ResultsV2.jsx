import { useState } from 'react'
import { filterRecs, flattenForV2, SCREENING_HOOKS_SHORT, SCREENING_HOOKS } from './categoryMap'
import './results-v2.css'
import { PlanBar } from '../components/PlanBar/PlanBar'
import { PlanSheet } from '../components/PlanSheet/PlanSheet'

const CAT_ACCENT = {
  heart_metabolic:  '#D94B3D',
  cancer:           '#7B4EAB',
  mental_health:    '#3B7DC4',
  infectious_disease: '#2A9D8F',
  womens_health:    '#C26B7E',
  healthy_aging:    '#D97706',
}

function extractQuestion(prompt) {
  if (!prompt) return null
  const match = prompt.match(/'([^']+)'/)
  return match ? match[1] : prompt.replace(/^Ask your doctor:\s*/i, '')
}

function getPersonalizedLede(age, sex, schedulableCount, conditionalCount) {
  const s = schedulableCount
  const c = conditionalCount

  if (sex === 'male') {
    if (age >= 50) {
      return {
        headline: `At ${age}, you have ${s} free screenings you can book right now.`,
        sub: c > 0
          ? `${c} more may apply — worth asking at your next physical. All are covered.`
          : 'All covered under most plans. Fast and free.',
      }
    }
    if (age >= 40) {
      return {
        headline: `You have ${s} covered benefits you haven't used.`,
        sub: `Fast. Free. Already paid for.${c > 0 ? ` ${c} more worth a question at your next checkup.` : ''}`,
      }
    }
    return {
      headline: `${s} free preventive screenings are covered for you.`,
      sub: `Most take under 30 minutes.${c > 0 ? ` ${c} more may apply based on your history.` : ''}`,
    }
  }

  if (sex === 'female') {
    if (age >= 50) {
      return {
        headline: `At ${age}, here's your complete preventive coverage.`,
        sub: `${s} you can schedule yourself.${c > 0 ? ` ${c} worth discussing with your doctor.` : ''} All covered.`,
      }
    }
    return {
      headline: `You have ${s + c} covered preventive services.`,
      sub: `${s} to schedule yourself.${c > 0 ? ` ${c} worth a conversation with your doctor.` : ''} All fully covered.`,
    }
  }

  return {
    headline: `${s + c} covered preventive services matched to your profile.`,
    sub: `${s} you can schedule yourself.${c > 0 ? ` ${c} worth a conversation with your doctor.` : ''}`,
  }
}

function ScreeningRow({ rec, inPlan, onPlanToggle, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const shortHook = SCREENING_HOOKS_SHORT[rec.id]
  const longHook = SCREENING_HOOKS[rec.id]
  const accentColor = CAT_ACCENT[rec.catId] ?? '#888'
  const question = extractQuestion(rec.doctor_prompt)

  return (
    <div
      className={`sv2-row${inPlan ? ' sv2-row--claimed' : ''}${expanded ? ' sv2-row--expanded' : ''}`}
      style={{ '--cat-accent': accentColor, animationDelay: `${index * 40}ms` }}
    >
      <div className="sv2-row__line">
        <button
          className="sv2-row__expand"
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} details for ${rec.plain_name}`}
        >
          <span className="sv2-row__name">{rec.plain_name}</span>
          {shortHook && <span className="sv2-row__hook">{shortHook}</span>}
        </button>

        <button
          className={`sv2-claim${inPlan ? ' sv2-claim--active' : ''}`}
          onClick={() => onPlanToggle?.(rec.id)}
          aria-label={inPlan ? `Remove ${rec.plain_name} from your plan` : `Claim ${rec.plain_name}`}
        >
          {inPlan ? '✓' : '+'}
        </button>
      </div>

      {expanded && (
        <div className="sv2-row__detail">
          {longHook && <p className="sv2-row__detail-hook">{longHook}</p>}
          <div className="sv2-row__meta">
            <span>{rec.frequency}</span>
            <span className="sv2-row__cost">$0 with most insurance</span>
            {rec.testType && <span className="sv2-row__type">{rec.testType}</span>}
          </div>
          {rec.conditional && question && (
            <div className="sv2-row__prompt">Ask: "{question}"</div>
          )}
        </div>
      )}
    </div>
  )
}

export function ResultsV2({
  recommendations,
  answers,
  planIds = new Set(),
  onPlanToggle,
  onClearPlan,
  onBack,
  fromPlanLink = false,
  onViewAll,
}) {
  const [sheetOpen, setSheetOpen] = useState(false)

  const filtered = filterRecs(recommendations, answers)
  const { schedulable, conditional } = flattenForV2(filtered)
  const planItems = filtered.filter(r => planIds.has(r.id))

  const { headline, sub } = getPersonalizedLede(
    answers.age,
    answers.sex,
    schedulable.length,
    conditional.length,
  )

  async function handleEmail(email) {
    try {
      await fetch('/api/send-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: planItems }),
      })
    } catch (err) {
      console.error('Email send failed:', err)
    }
  }

  return (
    <>
      <div className="sv2">
        <button
          className="sv2__back"
          onClick={fromPlanLink ? onViewAll : onBack}
        >
          {fromPlanLink ? '← See all screenings' : '← Back'}
        </button>

        <div className="sv2__header">
          <h1 className="sv2__lede">{headline}</h1>
          <p className="sv2__sublede">{sub}</p>
        </div>

        {schedulable.length > 0 && (
          <div className="sv2__section">
            <div className="sv2__section-label">
              Book these yourself — {schedulable.length}
            </div>
            {schedulable.map((rec, i) => (
              <ScreeningRow
                key={rec.id}
                rec={rec}
                inPlan={planIds.has(rec.id)}
                onPlanToggle={onPlanToggle}
                index={i}
              />
            ))}
          </div>
        )}

        {conditional.length > 0 && (
          <div className="sv2__section">
            <div className="sv2__section-label">
              Worth one question at your next visit — {conditional.length}
            </div>
            {conditional.map((rec, i) => (
              <ScreeningRow
                key={rec.id}
                rec={rec}
                inPlan={planIds.has(rec.id)}
                onPlanToggle={onPlanToggle}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      <PlanBar count={planIds.size} onSave={() => setSheetOpen(true)} />

      {sheetOpen && (
        <PlanSheet
          planItems={planItems}
          onEmail={handleEmail}
          onClose={() => setSheetOpen(false)}
          onClearPlan={() => { onClearPlan?.(); setSheetOpen(false) }}
        />
      )}
    </>
  )
}
