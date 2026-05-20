import { useState } from 'react'
import { filterRecs, groupByCategory, SCREENING_HOOKS_SHORT, SCREENING_HOOKS } from './categoryMap'
import './results-v2.css'
import { PlanBar } from '../components/PlanBar/PlanBar'
import { PlanSheet } from '../components/PlanSheet/PlanSheet'

const CAT_ACCENT = {
  heart:      '#D94B3D',
  cancer:     '#7B4EAB',
  mental:     '#3B7DC4',
  infectious: '#2A9D8F',
  womens:     '#C26B7E',
  aging:      '#D97706',
}

// What's actually inside each category — no fear, just the facts
const CAT_TAGLINES = {
  heart_metabolic:    'Blood pressure · Cholesterol · Diabetes',
  cancer:             'Colorectal · Lung · Skin',
  mental_health:      'Depression · Anxiety · Alcohol',
  infectious_disease: 'HIV · Hepatitis C · STIs',
  womens_health:      'Cervical · OB · Pregnancy',
  healthy_aging:      'Vision · Bone density · Falls',
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

// ─── Individual screening claim card ─────────────────────────────────────────
function ClaimCard({ rec, inPlan, onPlanToggle, accent, index = 0 }) {
  const shortHook = SCREENING_HOOKS_SHORT[rec.id]
  const longHook = SCREENING_HOOKS[rec.id]
  const question = extractQuestion(rec.doctor_prompt)

  return (
    <div
      className={`cv2-card${inPlan ? ' cv2-card--claimed' : ''}`}
      style={{ '--accent': accent, animationDelay: `${index * 55}ms` }}
    >
      <div className="cv2-card__name">{rec.plain_name}</div>
      {shortHook && <div className="cv2-card__hook">{shortHook}</div>}
      <div className="cv2-card__meta">
        <span>{rec.frequency}</span>
        <span className="cv2-card__free">$0 with most insurance</span>
        {rec.testType && <span className="cv2-card__type">{rec.testType}</span>}
      </div>
      {rec.conditional && question && (
        <div className="cv2-card__prompt">Ask: "{question}"</div>
      )}
      <button
        className={`cv2-claim-btn${inPlan ? ' cv2-claim-btn--active' : ''}`}
        onClick={() => onPlanToggle?.(rec.id)}
        aria-label={inPlan ? `Remove ${rec.plain_name} from your plan` : `Claim ${rec.plain_name}`}
      >
        {inPlan ? '✓ Claimed' : '+ Claim'}
      </button>
    </div>
  )
}

// ─── Category detail: list of claim cards ─────────────────────────────────────
function ClaimView({ cat, planIds, onPlanToggle, onBack }) {
  const accent = CAT_ACCENT[cat.colorKey]

  return (
    <div>
      <button className="sv2__back" onClick={onBack}>← Back</button>

      <div className="cv2-detail__header" style={{ '--accent': accent }}>
        <span className="cv2-detail__icon">{cat.icon}</span>
        <h2 className="cv2-detail__title">{cat.label}</h2>
      </div>

      {cat.schedulable.length > 0 && (
        <div className="cv2-detail__section">
          {(cat.schedulable.length > 1 || cat.askDoctor.length > 0) && (
            <div className="sv2__section-label">
              Book these yourself — {cat.schedulable.length}
            </div>
          )}
          {cat.schedulable.map((rec, i) => (
            <ClaimCard
              key={rec.id}
              rec={rec}
              inPlan={planIds.has(rec.id)}
              onPlanToggle={onPlanToggle}
              accent={accent}
              index={i}
            />
          ))}
        </div>
      )}

      {cat.askDoctor.length > 0 && (
        <div className="cv2-detail__section">
          <div className="sv2__section-label">
            Worth one question — {cat.askDoctor.length}
          </div>
          {cat.askDoctor.map((rec, i) => (
            <ClaimCard
              key={rec.id}
              rec={rec}
              inPlan={planIds.has(rec.id)}
              onPlanToggle={onPlanToggle}
              accent={accent}
              index={cat.schedulable.length + i}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Category grid card ────────────────────────────────────────────────────────
function CategoryCard({ cat, claimedCount, onTap, fullWidth }) {
  const total = cat.schedulable.length + cat.askDoctor.length
  const accent = CAT_ACCENT[cat.colorKey]
  const progress = total > 0 ? claimedCount / total : 0

  return (
    <button
      className={`cv2-cat${claimedCount > 0 ? ' cv2-cat--active' : ''}${fullWidth ? ' cv2-cat--full' : ''}`}
      style={{ '--accent': accent, '--progress': progress }}
      onClick={onTap}
    >
      <span className="cv2-cat__icon">{cat.icon}</span>
      <div className="cv2-cat__name">{cat.label}</div>
      <div className="cv2-cat__tagline">{CAT_TAGLINES[cat.id]}</div>
      <div className="cv2-cat__count">
        {claimedCount > 0
          ? `${claimedCount} of ${total} claimed`
          : `${total} benefit${total !== 1 ? 's' : ''} available`}
      </div>
    </button>
  )
}

// ─── Main results component ───────────────────────────────────────────────────
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
  const [activeCatId, setActiveCatId] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filtered = filterRecs(recommendations, answers)
  const categories = groupByCategory(filtered)
  const planItems = filtered.filter(r => planIds.has(r.id))

  const schedulableCount = categories.reduce((sum, c) => sum + c.schedulable.length, 0)
  const conditionalCount = categories.reduce((sum, c) => sum + c.askDoctor.length, 0)
  const { headline, sub } = getPersonalizedLede(answers.age, answers.sex, schedulableCount, conditionalCount)

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

  // ── Detail view ──
  if (activeCatId) {
    const cat = categories.find(c => c.id === activeCatId)
    if (!cat) return null
    return (
      <>
        <div className="sv2">
          <ClaimView
            cat={cat}
            planIds={planIds}
            onPlanToggle={onPlanToggle}
            onBack={() => setActiveCatId(null)}
          />
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

  // ── Category grid view ──
  return (
    <>
      <div className="sv2">
        <button className="sv2__back" onClick={fromPlanLink ? onViewAll : onBack}>
          {fromPlanLink ? '← See all screenings' : '← Back'}
        </button>

        <div className="sv2__header">
          <h1 className="sv2__lede">{headline}</h1>
          <p className="sv2__sublede">{sub}</p>
        </div>

        <div className="cv2-grid">
          {categories.map((cat, i) => {
            const allRecs = [...cat.schedulable, ...cat.askDoctor]
            const claimedCount = allRecs.filter(r => planIds.has(r.id)).length
            const fullWidth = categories.length % 2 === 1 && i === categories.length - 1
            return (
              <CategoryCard
                key={cat.id}
                cat={cat}
                claimedCount={claimedCount}
                onTap={() => setActiveCatId(cat.id)}
                fullWidth={fullWidth}
              />
            )
          })}
        </div>
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
