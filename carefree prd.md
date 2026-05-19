The skill is loaded. Writing the full PRD now with everything from our conversation baked in.

---

# Carefree — Results Redesign PRD
**Version:** 1.0 · **Author:** Efrain Calderon · **Date:** May 2026
**Scope:** Questionnaire flow + Results screen redesign

---

## Problem Statement

Carefree currently presents results as two undifferentiated lists — "universal" and "conditional" — organized by a structural distinction that means nothing to users. A 47-year-old man leaving the flow sees colorectal cancer screening listed next to anxiety screening listed next to HIV testing with no organizing logic, no sense of scope, and no signal about what to do first. The Grade A/B badges that exist today suggest a priority hierarchy (A = more important) that directly contradicts USPSTF intent — Grade B colorectal cancer screening is more clinically urgent for a 50-year-old male than Grade A anxiety screening. The questionnaire that precedes this feels like a form rather than a personalized intake, which sets the wrong expectations for what follows.

The cost of not solving this: the primary user (35–55 male, hasn't seen a doctor in years) lands on a list that looks like a pamphlet and closes the tab.

---

## Goals

1. Users can identify which screenings apply to them and what to do about each within 30 seconds of reaching results
2. The results screen feels like a personal health dashboard, not a medical form
3. Grade A/B labels are removed — no user should infer that one screening matters more than another based on evidence classification
4. The conditional/universal distinction becomes a gentle action prompt ("schedule this" vs "ask your doctor") rather than a structural category
5. The questionnaire flow creates a sense of personalization payoff — by Step 3, users feel the results will be built for them specifically

## Non-Goals

- **No additional questions beyond the current 3** — adding BMI, smoking status, or family history would improve conditional filtering but is out of scope for v1; the current `conditional: true` items surface as "ask your doctor" instead
- **No saved state or user accounts** — results are ephemeral; no login, no history
- **No children's preventive care** — the data set and all personas are adults only
- **No booking or referral integration** — the CTA is "talk to your doctor," not a scheduling widget
- **No dark mode** — deferred; design tokens will support it architecturally but it won't be built in this pass

---

## Visual Design Language

All values reference existing `--cf-*` design tokens. No hardcoded hex or spacing values.

**Grid:** 2-column card grid on mobile (≥ 320px). Cards sit on an 8pt spacing grid. Internal card padding ≤ external card gap.

**New semantic tokens required:**

| Token | Purpose | Suggested value direction |
|---|---|---|
| `--cf-category-heart` | Heart & Metabolic card accent | Warm red-coral |
| `--cf-category-cancer` | Cancer card accent | Deep purple |
| `--cf-category-mental` | Mental Health & Behavior card accent | Calm blue |
| `--cf-category-infectious` | Infectious Disease card accent | Teal |
| `--cf-category-womens` | Women's Health card accent | Rose-mauve |
| `--cf-category-aging` | Healthy Aging card accent | Warm amber |

**Replacing Grade badges:** The existing green (Grade A) and blue (Grade B) Badge component tokens are repurposed. Green → "confirmed" indicator for universally applicable items. Blue → retired from results view. Frequency + cost copy replaces badge visual weight.

**Frequency + cost format:** `Every 10 years · $0 with most insurance` — 13px, `--cf-color-neutral-500`, appears directly below screening name in detail view.

**Conditional item indicator inside detail view:** Subtle left-border accent in `--cf-color-neutral-300` + "Ask your doctor" eyebrow label in `--cf-color-neutral-500`. No badge. No color urgency signal.

---

## Personas

### Marcus — Primary
47M · Employer insurance · BMI ~29 · Former light smoker (quit 8 years ago) · Last doctor visit: 3 years ago

**His results:**
- **Heart & Metabolic** — Blood pressure screening / *Ask your doctor:* Diabetes screening, Statin assessment
- **Cancer** — Colorectal cancer screening
- **Mental Health & Behavior** — Depression screening, Anxiety screening, Alcohol use screening
- **Infectious Disease** — Hepatitis C screening, HIV screening / *Ask your doctor:* Hepatitis B

Total: 10 items · 5 schedulable · 5 ask-your-doctor

### Diana — Secondary
41F · Employer insurance · Healthy weight · Non-smoker · Sees OB-GYN annually, skips primary care · Mother had breast cancer

**Her results:**
- **Heart & Metabolic** — Blood pressure screening / *Ask your doctor:* Statin assessment
- **Cancer** — Breast cancer screening (mammogram), Cervical cancer screening / *Ask your doctor:* BRCA genetic counseling
- **Mental Health & Behavior** — Depression screening, Anxiety screening, Alcohol use screening
- **Women's Health** — Intimate partner violence screening / *Ask your doctor:* BRCA genetic counseling *(surface here only if Cancer card is shown; avoid duplication)*
- **Infectious Disease** — Hepatitis C screening, HIV screening

Total: 11 items · 7 schedulable · 4 ask-your-doctor

---

## Questionnaire Flow — 3 Options

The current flow: **PlanStep → AgeStep → SexStep → ResultsStep**

All three options retain 3 steps and the existing SoftExit behavior for non-private-insurance users.

---

### Q Option 1 — One Question Per Screen, Polished

**Concept:** Each step is a full-screen focused moment. Large type, centered hierarchy, no competing elements. Feels like a well-designed quiz app (Typeform adjacency, without the gimmicks). Progress is communicated by the existing `ProgressDots` component + a running personalization teaser that updates as answers are given.

**Layout per step:**
- Top: `ProgressDots` (3 dots, current step filled) + step counter ("1 of 3") right-aligned
- Middle: Question headline in largest type size on the scale (~28–32px, `--cf-color-neutral-900`)
- Below headline: Answer options as full-width `OptionCard` components, stacked vertically, 16px gap
- Bottom: `Continue` button (primary, full-width), disabled until selection made
- No back button on Step 1; ghost back button on Steps 2–3

**Personalization teaser (new copy layer):**
After Step 2 (age confirmed), the Step 3 header updates to reference their age:

> *"Almost there. One last thing to make sure your results are accurate for someone your age."*

After Step 3 (sex confirmed), transition copy before results:

> *"Got it. Building your results now."* (brief loading state, even if instant)

**Marcus's journey — exact copy:**

| Step | Headline | Options shown | Marcus selects |
|---|---|---|---|
| Step 1 | "What kind of health insurance do you have?" | Private / employer insurance · Medicare or Medicaid · No insurance · Not sure | Private / employer insurance |
| Step 2 | "How old are you?" | Number input (AgeInput component) | 47 |
| Step 3 | "What was your sex assigned at birth?" | Male · Female | Male |
| Transition | "Here's what applies to you, Marcus." *(or "Here's what we found")* | — | — |

**Diana's journey — exact copy:**

| Step | Headline | Options | Diana selects |
|---|---|---|---|
| Step 1 | "What kind of health insurance do you have?" | Same as above | Private / employer insurance |
| Step 2 | "How old are you?" | Number input | 41 |
| Step 3 | "What was your sex assigned at birth?" | Male · Female | Female |
| Transition | "Here's what applies to you." | — | — |

**Tradeoffs:**
- ✅ Maximum focus per step — lowest cognitive load
- ✅ Easiest to implement — closest to current architecture
- ✅ ProgressDots component already built
- ⚠️ 3 separate screens for 3 simple questions can feel like overhead
- ⚠️ Personalization payoff is thin — copy is the only hook

---

### Q Option 2 — Progressive Reveal on One Screen

**Concept:** All 3 questions exist on a single scrolling screen, but questions 2 and 3 are visually locked until the previous is answered. As each answer is selected, the next question smoothly reveals (opacity + translate-y transition, 200ms ease-out). Feels like a conversation unfolding, not a form to fill. No Continue button until all 3 are answered.

**Layout:**
- Page header: "Let's find your screenings" (20px semibold, top of screen)
- Subtitle: "3 quick questions. Takes about 30 seconds." (14px, neutral-500)
- Question 1 — fully visible and active
- Question 2 — locked (neutral-200 text, no interaction) until Q1 answered; reveals on selection
- Question 3 — locked until Q2 answered
- Continue button — appears (fade in) only after all 3 answered, full-width primary, sticky to bottom of screen on mobile

**Locked state visual:** Question text at 40% opacity, answer options not rendered (just a subtle placeholder skeleton). A small lock icon or "Waiting for your answer above" micro-label is optional.

**Marcus's journey — one-screen view:**

```
Let's find your screenings.
3 quick questions. Takes about 30 seconds.

1. What kind of health insurance do you have?
   ● Private / employer insurance   ← selected
   ○ Medicare or Medicaid
   ○ No insurance
   ○ Not sure

2. How old are you?                 ← reveals after Q1
   [  47  ]

3. What was your sex assigned at birth?  ← reveals after Q2
   ○ Male
   ○ Female

[ See my screenings ]               ← appears after Q3
```

**Diana's journey** — identical layout, selects Female at Q3. The "See my screenings" button copy is the same for both — avoid gendering the CTA.

**Tradeoffs:**
- ✅ Fastest to complete — no screen transitions, no back/forward navigation
- ✅ Feels modern and app-like
- ✅ The progressive reveal creates a sense of personalization in motion
- ⚠️ Requires scroll management on short screens (Q3 may be below fold on small phones)
- ⚠️ Slightly more complex implementation — reveal animation + locked state styling
- ⚠️ Less dramatic payoff moment — no dedicated transition before results

---

### Q Option 3 — Single Intake Screen, All Visible

**Concept:** All 3 questions displayed simultaneously, no locking, no progressive reveal. User fills at their own pace and hits Continue when done. Fastest possible flow. Feels like a clean triage form — clinical but not cold.

**Layout:**
- Page title: "Tell us about yourself" (20px semibold)
- Subtitle: "We'll use this to find screenings covered at no cost under your insurance." (14px, neutral-500)
- Q1: Full-width `OptionCard` stack (insurance type)
- 24px gap
- Q2: `AgeInput` with label "Your age"
- 24px gap
- Q3: Two `OptionCard` options side by side (Male / Female) — 2-column, equal width
- 32px gap
- `Continue` button — primary, full-width. Disabled until all 3 answered.

**Marcus's screen state when ready to submit:**
```
Tell us about yourself.
We'll use this to find screenings covered at no cost under your insurance.

What kind of health insurance do you have?
● Private / employer insurance
○ Medicare or Medicaid
○ No insurance
○ Not sure

Your age
[ 47 ]

What was your sex assigned at birth?
[● Male]  [○ Female]

[ Continue → ]
```

**Diana's screen** — identical layout, 41, Female selected.

**Tradeoffs:**
- ✅ Absolute minimum time-to-results — no intermediate screens
- ✅ Users can review all answers before submitting
- ✅ Simplest implementation — single screen, no state management for reveal
- ⚠️ Least personalized feel — looks most like a form
- ⚠️ No sense of building toward something — all questions visible removes anticipation
- ⚠️ The least emotionally engaging entry point for the primary persona

---

## Results Screen — 3 Options

All options assume: Grade A/B badges do not appear. Frequency + cost copy replaces badge weight. "Schedule this" and "Ask your doctor about this" are the two internal section labels within each category detail view.

---

### R Option 1 — Stat Card Grid (Recommended)

**Concept:** 2×2 grid of colored category cards. Each card communicates: category name, total item count (large, hero number), and a schedulable count subline. Tapping drills to a full-screen detail view. Mental model: Copilot account tiles, Strava stats.

**Landing view — card anatomy:**
```
┌─────────────────┐  ┌─────────────────┐
│ 🫀              │  │ 🎗️              │
│                 │  │                 │
│       3         │  │       3         │
│   screenings    │  │   screenings    │
│                 │  │                 │
│ Heart &         │  │ Cancer          │
│ Metabolic       │  │                 │
│ 1 to schedule → │  │ 2 to schedule → │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│ 🧠              │  │ 🧬              │
│                 │  │                 │
│       3         │  │       3         │
│   screenings    │  │   screenings    │
│                 │  │                 │
│ Mental Health   │  │ Infectious      │
│ & Behavior      │  │ Disease         │
│ 3 to schedule → │  │ 2 to schedule → │
└─────────────────┘  └─────────────────┘
```

**Card token specs:**
- Background: `--cf-category-[type]` (full color, high saturation)
- All text: white, `--cf-color-neutral-0`
- Icon: 24px, white, top-left or top-center
- Count number: 40px bold
- "screenings" label: 13px, white 70% opacity
- Category name: 15px semibold, white
- Subline: 13px, white 80% opacity
- Chevron: right-aligned on subline row, or bottom-right corner
- Border-radius: match `--cf-border-radius-lg` (same as OptionCard)
- Padding: 20px
- Card height: ~160px (square-ish, aspect ratio flexible)
- Grid gap: 12px

**Marcus's landing view — exact copy:**

| Card | Count | Subline |
|---|---|---|
| 🫀 Heart & Metabolic | 3 screenings | 1 to schedule today |
| 🎗️ Cancer | 1 screening | 1 to schedule today |
| 🧠 Mental Health & Behavior | 3 screenings | 3 to schedule today |
| 🧬 Infectious Disease | 3 screenings | 2 to schedule today |

**Diana's landing view — exact copy:**

| Card | Count | Subline |
|---|---|---|
| 🫀 Heart & Metabolic | 2 screenings | 1 to schedule today |
| 🎗️ Cancer | 3 screenings | 2 to schedule today |
| 🧠 Mental Health & Behavior | 3 screenings | 3 to schedule today |
| 👩 Women's Health | 1 screening | 1 to schedule today |
| 🧬 Infectious Disease | 2 screenings | 2 to schedule today |

*(Diana's 5 cards break the 2×2 — fifth card is full-width at bottom, or 2+3 layout. Worth exploring both in Figma.)*

**Detail view — Marcus taps "Heart & Metabolic":**

```
← Heart & Metabolic

─────────────────────────────────
Schedule these
─────────────────────────────────

Blood pressure screening
Check for high blood pressure — the most
common preventable cause of heart disease.
Every 1–2 years · $0 with most insurance
[ Learn more ]

─────────────────────────────────
Ask your doctor about these
─────────────────────────────────

Diabetes screening
Recommended if you're overweight or obese.
A simple blood sugar test.
Every 3 years if normal · $0 with most insurance
Ask your doctor: "Should I be screened for
prediabetes given my weight?"
[ Learn more ]

Statin for heart disease prevention
Statins can prevent a first heart attack in
adults 40–75 with certain risk factors.
Ongoing if prescribed · $0 with most insurance
Ask your doctor: "Do my risk factors qualify
me for a preventive statin?"
[ Learn more ]
```

**Detail view — Diana taps "Cancer":**

```
← Cancer

─────────────────────────────────
Schedule these
─────────────────────────────────

Breast cancer screening (mammogram)
Recommended every other year starting at 40.
Every 2 years · $0 with most insurance
[ Learn more ]

Cervical cancer screening
A Pap smear or HPV test to detect early changes.
Every 3–5 years · $0 with most insurance
[ Learn more ]

─────────────────────────────────
Ask your doctor about these
─────────────────────────────────

BRCA genetic counseling
For women with a family history of breast or
ovarian cancer. Helps assess your inherited risk.
One-time assessment · $0 with most insurance
Ask your doctor: "Given my mother's history,
should I be assessed for BRCA mutations?"
[ Learn more ]
```

**All-conditional card variant (e.g., a 47-year-old male's Cancer card if he were 44 and colorectal hadn't kicked in yet):**
- Background: desaturated version of category color (use 30% opacity tint over neutral background, or lighter token variant)
- Count: replaced with "May apply" in 15px semibold
- Subline: "Discuss with your doctor →"
- Icon: outlined style rather than filled

**Tradeoffs:**
- ✅ Highest visual impact — feels like a real product, not a list
- ✅ Count-as-hero reduces anxiety ("only 3 things in this bucket")
- ✅ Color differentiation makes categories immediately distinct
- ⚠️ Requires 4–6 new category color tokens in Style Dictionary pipeline
- ⚠️ White-on-color contrast must be validated per token before shipping
- ⚠️ Odd card count (3 or 5) creates layout edge cases in the grid

---

### R Option 2 — Full-Width Category Rows, Inline Expand

**Concept:** Full-width rows, each with a left border accent in category color. Tapping expands in-place (no navigation) to reveal `RecCard` components beneath. Mental model: Linear issue groups, Things 3 project list.

**Landing view — row anatomy:**
```
┌──────────────────────────────────────────┐
│▌ 🫀 Heart & Metabolic          3  ∨     │
│  1 you can schedule today               │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│▌ 🎗️ Cancer                      1  ∨     │
│  1 you can schedule today               │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│▌ 🧠 Mental Health & Behavior    3  ∨     │
│  3 you can schedule today               │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│▌ 🧬 Infectious Disease          3  ∨     │
│  2 you can schedule today               │
└──────────────────────────────────────────┘
```

**Row token specs:**
- Background: `--cf-color-neutral-50`
- Left border: 4px solid `--cf-category-[type]`
- Icon: 20px, `--cf-category-[type]`
- Category name: 15px semibold, `--cf-color-neutral-900`
- Count: 15px semibold, `--cf-color-neutral-500`, right-aligned
- Chevron: rotates 180° on expand (200ms ease-in-out)
- Subline: 13px, `--cf-color-neutral-500`
- Border-radius: 8px
- Padding: 16px 20px
- Row gap: 8px

**Marcus's rows — exact copy:**

| Row | Count | Subline |
|---|---|---|
| 🫀 Heart & Metabolic | 3 | 1 you can schedule today |
| 🎗️ Cancer | 1 | 1 you can schedule today |
| 🧠 Mental Health & Behavior | 3 | 3 you can schedule today |
| 🧬 Infectious Disease | 3 | 2 you can schedule today |

**Marcus taps "Cancer" — row expands inline:**
```
▌ 🎗️ Cancer                      1  ∧
  1 you can schedule today

  Schedule this
  ┌────────────────────────────────────┐
  │ Colorectal cancer screening        │
  │ A colonoscopy or stool test.       │
  │ Every 10 years · $0 with insurance │
  └────────────────────────────────────┘
```

**Diana's rows — exact copy:**

| Row | Count | Subline |
|---|---|---|
| 🫀 Heart & Metabolic | 2 | 1 you can schedule today |
| 🎗️ Cancer | 3 | 2 you can schedule today |
| 🧠 Mental Health & Behavior | 3 | 3 you can schedule today |
| 👩 Women's Health | 1 | 1 you can schedule today |
| 🧬 Infectious Disease | 2 | 2 you can schedule today |

**All-conditional row variant:**
- Left border becomes dashed
- Subline changes to: "May apply — discuss with your doctor"
- Count omitted (replaced with "?")

**Tradeoffs:**
- ✅ No navigation — everything on one screen, less engineering complexity
- ✅ Scales cleanly to 3 or 7 categories without layout changes
- ✅ Closest to current implementation — lower build cost
- ⚠️ Loses the dashboard feel — still reads somewhat like a list
- ⚠️ Expanding multiple rows at once creates very long scroll
- ⚠️ Less motivating for the primary persona — doesn't feel like a "results reveal"

---

### R Option 3 — Icon-Forward Muted Grid

**Concept:** 2×2 card grid but with muted, tinted backgrounds (not full category color). Icon is the visual hero. Category name and count below. Taps to a full-screen detail view. Mental model: Apple Podcasts categories, App Store genre browse.

**Landing view — card anatomy:**
```
┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │
│       🫀        │  │       🎗️        │
│                 │  │                 │
│ Heart &         │  │ Cancer          │
│ Metabolic       │  │                 │
│   3 screenings  │  │   3 screenings  │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │
│       🧠        │  │       🧬        │
│                 │  │                 │
│ Mental Health   │  │ Infectious      │
│ & Behavior      │  │ Disease         │
│   3 screenings  │  │   3 screenings  │
└─────────────────┘  └─────────────────┘
```

**Card token specs:**
- Background: `--cf-category-[type]` at 8–12% opacity over `--cf-color-neutral-0`
- Border: 1px `--cf-color-neutral-200`
- Icon: 40px, centered, category color at full opacity
- Category name: 14px semibold, `--cf-color-neutral-900`, bottom-left
- Count: 12px, `--cf-color-neutral-500`, below name
- No subline on card — schedulable count revealed in detail view only
- Border-radius: 16px
- Padding: 20px
- Square-ish aspect ratio

**Marcus's landing view — exact copy:**

| Card | Icon | Count label |
|---|---|---|
| Heart & Metabolic | 🫀 | 3 screenings |
| Cancer | 🎗️ | 1 screening |
| Mental Health & Behavior | 🧠 | 3 screenings |
| Infectious Disease | 🧬 | 3 screenings |

**Diana's landing view:**

| Card | Icon | Count label |
|---|---|---|
| Heart & Metabolic | 🫀 | 2 screenings |
| Cancer | 🎗️ | 3 screenings |
| Mental Health & Behavior | 🧠 | 3 screenings |
| Women's Health | 👩 | 1 screening |
| Infectious Disease | 🧬 | 2 screenings |

**Detail view — Marcus taps "Infectious Disease":**
```
← Infectious Disease

─────────────────────────────────
Schedule these
─────────────────────────────────

Hepatitis C screening
A one-time blood test. Most people who have it
don't know. Recommended once for all adults.
One-time · $0 with most insurance

HIV screening
A routine blood test. Recommended for all adults
18–65, regardless of risk.
Every 3–5 years · $0 with most insurance

─────────────────────────────────
Ask your doctor about these
─────────────────────────────────

Hepatitis B screening
Recommended for adults at increased risk based
on country of origin or vaccination history.
One-time or as needed · $0 with most insurance
Ask your doctor: "Based on my background,
should I be screened for hepatitis B?"
```

**All-conditional card variant:**
- Background tint: same as regular (already muted)
- Add a small amber dot or "·" indicator in top-right corner of card
- Count label changes to: "Ask your doctor"
- Icon stays full color

**Tradeoffs:**
- ✅ Most restrained — doesn't feel clinical or alarming
- ✅ Icon-forward makes categories scannable at a glance without reading
- ✅ Muted palette requires fewer new color tokens (tints rather than full hues)
- ⚠️ Less differentiated — cards look similar at a glance without strong color
- ⚠️ Count is the only at-a-glance data point — no schedulable breakdown until detail view
- ⚠️ Softer feel may undercut urgency for the primary persona

---

## Open Questions

| Question | Owner | Blocking? |
|---|---|---|
| Should Diana see BRCA in Cancer *and* Women's Health, or pick one? | Design | Yes — needs resolution before building detail view |
| At 3 cards (e.g., a 38-year-old male with no Cancer card), does the grid show 1.5 rows or stack differently? | Design | Yes — layout edge case |
| What's the exact copy for the "Ask your doctor" prompt field? Is it always shown, or only expanded on tap? | Design | No |
| Should "Every X years · $0" data be added to `recommendations.json` as a new field, or calculated/hardcoded in the UI? | Engineering | Yes |
| Does the SoftExit still show immediately after PlanStep for non-private-insurance users in all 3 questionnaire options? | Engineering | No |
| Do we need a back button inside the category detail view (Options R1 and R3) that returns to the card grid? | Engineering | Yes |

---

## Success Metrics

**Leading indicators (measurable within 2 weeks of launch):**
- % of users who reach results and tap at least one category card (target: >60%)
- % of users who reach results and read at least one detail view (target: >40%)
- Time on results screen (target: >45 seconds — indicates engagement, not bounce)

**Lagging indicators (1–3 months post-launch):**
- Share/copy rate on results (if sharing is added)
- Return visit rate — do users come back and re-run the quiz after a doctor visit?
- Qualitative feedback sentiment via any future user testing

---

## Recommended Option Combinations

| Layer | Recommendation | Rationale |
|---|---|---|
| Questionnaire | **Q Option 2** (Progressive reveal) | Creates the highest sense of personalization in motion without adding screens; moderate implementation complexity |
| Results landing | **R Option 1** (Stat Card Grid) | Count-as-hero matches the primary persona's dashboard mental model; most differentiated from the current experience |
| Detail view | Same across all options — "Schedule these / Ask your doctor about these" split using existing RecCard component |

The secondary recommendation is **Q Option 1 + R Option 1** if Q Option 2's reveal animation feels too complex to implement cleanly in the current React architecture.

---

*This document is intended as a Figma annotation reference. Each option spec is self-contained — design all three of each, compare side by side, then decide.*