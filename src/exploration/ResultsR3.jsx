import { useState } from 'react'
import { filterRecs, groupByCategory, CATEGORY_HOOKS } from './categoryMap'
import { DetailView } from './DetailView'
import { PlanBar } from '../components/PlanBar/PlanBar'
import { PlanSheet } from '../components/PlanSheet/PlanSheet'

const CAT_BG = {
  heart: 'rgba(217,75,61,0.09)',
  cancer: 'rgba(123,78,171,0.09)',
  mental: 'rgba(59,125,196,0.09)',
  infectious: 'rgba(42,157,143,0.09)',
  womens: 'rgba(194,107,126,0.09)',
  aging: 'rgba(217,119,6,0.09)',
}

export function ResultsR3({ recommendations, answers, onBack, planIds = new Set(), onPlanToggle, onClearPlan, fromPlanLink = false, onViewAll }) {
  const [activeCatId, setActiveCatId] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filtered = filterRecs(recommendations, answers)
  const categories = groupByCategory(filtered)

  // Full rec objects for items currently in the plan (for PlanSheet summary + email)
  const planItems = filtered.filter(r => planIds.has(r.id))

  async function handleEmail(email) {
    // Phase 8: replaced with Resend API call
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

  if (activeCatId) {
    const cat = categories.find(c => c.id === activeCatId)
    return cat ? (
      <>
        <DetailView
          cat={cat}
          onBack={() => setActiveCatId(null)}
          planIds={planIds}
          onPlanToggle={onPlanToggle}
        />
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
    ) : null
  }

  const schedulableCount = categories.reduce((sum, c) => sum + c.schedulable.length, 0)
  const conditionalCount = categories.reduce((sum, c) => sum + c.askDoctor.length, 0)
  const total = schedulableCount + conditionalCount

  return (
    <>
      <div className="results-content">
        <button
          className="results-back"
          onClick={fromPlanLink ? onViewAll : onBack}
        >
          {fromPlanLink ? '← See all screenings' : '← Back'}
        </button>
        <div className="results-header">
          <div className="results-header__greeting">{total} preventive services covered for you</div>
          <div className="results-header__sub">
            {schedulableCount} you can schedule today.{conditionalCount > 0 ? ` ${conditionalCount} more may apply — worth a conversation with your doctor.` : ''}
          </div>
        </div>

        <div className="r3-grid">
          {categories.map((cat, i) => {
            const bg = CAT_BG[cat.colorKey]
            const totalCount = cat.schedulable.length + cat.askDoctor.length
            const allConditional = cat.schedulable.length === 0
            const isLastOdd = categories.length % 2 === 1 && i === categories.length - 1

            return (
              <button
                key={cat.id}
                className={`r3-card${isLastOdd ? ' r3-card--full' : ''}`}
                style={{ background: bg }}
                onClick={() => setActiveCatId(cat.id)}
              >
                {allConditional && <span className="r3-card__dot" />}
                <span className="r3-card__icon">{cat.icon}</span>
                <div className="r3-card__name">{cat.label}</div>
                <div className="r3-card__hook">
                  {CATEGORY_HOOKS[cat.colorKey] ?? (allConditional ? 'Ask your doctor' : `${totalCount} screening${totalCount !== 1 ? 's' : ''}`)}
                </div>
              </button>
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
