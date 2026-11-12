// Plan logic. Pure functions, no React, so the email function (api/send-plan.js) can use it too.
// Source data: public/data/recommendations.json + public/data/visits.json
import { groupByVisit } from '../lib/visits.js'

// Tap-to-pick ranges, cut where a plan changes. The core audience (35–64) gets every cutoff:
// 35 diabetes, 40 statins and mammograms, 45 colon cancer, 50 lung. Under 35 is one range;
// its few mid-range edges show as a note on the item ("Starts at age 21").
export const AGE_RANGES = [
  { id: '18-34', label: '18–34', lo: 18, hi: 34 },
  { id: '35-39', label: '35–39', lo: 35, hi: 39 },
  { id: '40-44', label: '40–44', lo: 40, hi: 44 },
  { id: '45-49', label: '45–49', lo: 45, hi: 49 },
  { id: '50-64', label: '50–64', lo: 50, hi: 64 },
  { id: '65-75', label: '65–75', lo: 65, hi: 75 },
  { id: '76-99', label: '76 or older', lo: 76, hi: 99 },
]

export const SEX = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
]

// One option per different plan. A job, healthcare.gov, a family member's plan and TRICARE
// all lead to the same plan, so they are one answer.
// `short` is the answer as it reads back on a chip.
export const INSURANCE = [
  { id: 'private', label: 'A job, or a plan I bought', short: 'Job or own plan', hint: 'Includes a family member’s plan, healthcare.gov, and TRICARE' },
  { id: 'medicare', label: 'Medicare' },
  { id: 'medicaid', label: 'Medicaid' },
  { id: 'none', label: 'I don’t have insurance', short: 'No insurance' },
  { id: 'unsure', label: 'Not sure', short: 'Insurance: not sure' },
]

// Personal questions. `effects[answer]` lists rec ids to add or remove.
// Anything not resolved stays as "ask if this applies to you".
export const PERSONAL_QUESTIONS = [
  {
    id: 'heart',
    text: 'Has a doctor ever told you your blood pressure or cholesterol is high?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
      { id: 'unsure', label: 'Not sure' },
    ],
    affects: ['statin-cvd', 'healthy-diet-counseling'],
    effects: {
      yes: { add: ['statin-cvd', 'healthy-diet-counseling'] },
      no: { remove: ['healthy-diet-counseling'] },
    },
  },
  {
    id: 'smoking',
    text: 'Have you ever smoked?',
    options: [
      { id: 'never', label: 'Never' },
      { id: 'former', label: 'I used to' },
      { id: 'current', label: 'I still do' },
    ],
    affects: ['tobacco-cessation', 'lung-cancer-screening', 'aaa-screening'],
    effects: {
      never: { remove: ['tobacco-cessation', 'lung-cancer-screening', 'aaa-screening'] },
      former: { add: ['aaa-screening', 'lung-cancer-screening'], remove: ['tobacco-cessation'] },
      current: { add: ['tobacco-cessation', 'lung-cancer-screening', 'aaa-screening'] },
    },
  },
  {
    id: 'weight',
    text: 'How would you describe your weight right now?',
    options: [
      { id: 'healthy', label: 'About right' },
      { id: 'some', label: 'A bit over' },
      { id: 'more', label: 'Quite a bit over' },
      { id: 'unsure', label: 'Rather not say' },
    ],
    affects: ['diabetes-screening', 'obesity-counseling-adults'],
    effects: {
      healthy: { remove: ['diabetes-screening', 'obesity-counseling-adults'] },
      some: { add: ['diabetes-screening'], remove: ['obesity-counseling-adults'] },
      more: { add: ['diabetes-screening', 'obesity-counseling-adults'] },
    },
  },
  {
    id: 'family',
    sex: 'female',
    text: 'Has anyone in your family had breast or ovarian cancer?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
      { id: 'unsure', label: 'Not sure' },
    ],
    affects: ['brca-risk', 'breast-cancer-meds'],
    effects: {
      yes: { add: ['brca-risk', 'breast-cancer-meds'] },
      no: { remove: ['brca-risk', 'breast-cancer-meds'] },
    },
  },
  {
    id: 'pregnancy',
    sex: 'female',
    maxAge: 49,
    text: 'Are you pregnant or planning to be?',
    options: [
      { id: 'no', label: 'Not now' },
      { id: 'planning', label: 'Planning to be' },
      { id: 'pregnant', label: 'I’m pregnant' },
    ],
    affects: ['folic-acid', 'aspirin-preeclampsia', 'bacteriuria-pregnant', 'gestational-diabetes', 'perinatal-depression'],
    effects: {
      no: { remove: ['folic-acid', 'aspirin-preeclampsia', 'bacteriuria-pregnant', 'gestational-diabetes', 'perinatal-depression'] },
      planning: { add: ['folic-acid'], remove: ['aspirin-preeclampsia', 'bacteriuria-pregnant', 'gestational-diabetes', 'perinatal-depression'] },
      pregnant: { add: ['folic-acid', 'bacteriuria-pregnant', 'gestational-diabetes', 'aspirin-preeclampsia', 'perinatal-depression'] },
    },
  },
  {
    id: 'falls',
    minAge: 65,
    text: 'Have you fallen in the past year, or do you worry about falling?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    affects: ['fall-prevention-exercise'],
    effects: {
      yes: { add: ['fall-prevention-exercise'] },
      no: { remove: ['fall-prevention-exercise'] },
    },
  },
]

// The passive, self-select sexual health list. The app never records which factor applies.
// Each factor leads with the two or three words that carry it, so the list can be scanned.
export const SEXUAL_HEALTH = {
  factors: [
    { lead: 'A new partner', text: ', or more than one' },
    { lead: 'No condom', text: ' with someone whose status you didn’t know' },
    { lead: 'An STI', text: ', like chlamydia or syphilis' },
    { lead: 'A partner', text: ' with HIV or hepatitis B' },
    { lead: 'Sex with men', text: '', sex: 'male' },
    { lead: 'Shared needles', text: '' },
  ],
  recs: ['prep-hiv', 'syphilis-screening', 'hepatitis-b-screening-adults', 'chlamydia-gonorrhea-screening'],
}
export const sexualHealthFactors = sex => SEXUAL_HEALTH.factors.filter(f => !f.sex || f.sex === sex)

// One motivating stat after age + sex. DRAFT copy: every number must be verified before shipping.
export function pickStat(range, sex) {
  if (!range) return null
  const lo = range.lo
  if (sex === 'female' && lo >= 40 && lo < 50)
    return { big: 'Starts at 40', text: 'Screening mammograms are now recommended every 2 years starting at 40, at no cost.', action: 'Ordered at your checkup or booked directly.', source: 'USPSTF, 2024' }
  if (lo >= 76) return { big: '#1', text: 'Heart disease is the leading cause of death for men and women.', action: 'A blood pressure check takes 2 minutes.', source: 'CDC' }
  if (lo >= 65) return { big: '#1', text: 'Heart disease is the leading cause of death for adults over 65.', action: 'Blood pressure and cholesterol checks are part of your free visit.', source: 'CDC' }
  if (lo >= 45) return { big: '9 in 10', text: 'people whose colon cancer is found early are alive 5 years later.', action: 'Screening starts at 45. An at-home test counts.', source: 'American Cancer Society' }
  if (lo >= 35) return { big: '1 in 3', text: 'adults have prediabetes. More than 8 in 10 of them don’t know it.', action: 'One blood test tells you where you stand.', source: 'CDC' }
  return { big: 'Nearly half', text: 'of U.S. adults have high blood pressure, often with no symptoms.', action: 'A 2-minute cuff check finds it.', source: 'CDC' }
}

const overlaps = (rec, r) => rec.age_min <= r.hi && (rec.age_max ?? 999) >= r.lo

// Copy for recs that only cover part of the chosen age range.
export function ageNote(rec, r) {
  const max = rec.age_max ?? 999
  if (rec.age_min > r.lo) return `Starts at age ${rec.age_min}`
  if (max < r.hi) return `Recommended through age ${max}`
  return null
}

export function eligibleRecs(recs, range, sex) {
  if (!range || !sex) return []
  return recs.filter(r => r.sex.includes(sex) && overlaps(r, range))
}

// Which personal questions are worth asking this person (only ones that change their plan).
export function relevantQuestions(eligible, range, sex) {
  const ids = new Set(eligible.filter(r => r.conditional).map(r => r.id))
  return PERSONAL_QUESTIONS.filter(q =>
    (!q.sex || q.sex === sex) &&
    (!q.minAge || range.hi >= q.minAge) &&
    (!q.maxAge || range.lo <= q.maxAge) &&
    q.affects.some(id => ids.has(id)))
}

// answers: { [questionId]: optionId }, sexualHealth: 'yes' | 'no' | undefined
// Returns { planned, askDoctor } as arrays of recs.
export function buildPlan(eligible, answers = {}, sexualHealth) {
  const added = new Set()
  const removed = new Set()
  for (const q of PERSONAL_QUESTIONS) {
    const fx = q.effects[answers[q.id]]
    fx?.add?.forEach(id => added.add(id))
    fx?.remove?.forEach(id => removed.add(id))
  }
  if (sexualHealth === 'yes') SEXUAL_HEALTH.recs.forEach(id => added.add(id))
  if (sexualHealth === 'no') SEXUAL_HEALTH.recs.forEach(id => removed.add(id))

  const planned = []
  const askDoctor = []
  for (const r of eligible) {
    if (removed.has(r.id) && !added.has(r.id)) continue
    if (!r.conditional || added.has(r.id)) planned.push(r)
    else askDoctor.push(r)
  }
  return { planned, askDoctor }
}

// Visit name, script and tip can change by insurance.
export function visitForInsurance(visit, insurance) {
  if (visit.id !== 'primary-care') return visit
  // Medicare has no "annual physical".
  if (insurance === 'medicare') {
    return {
      ...visit,
      name: 'Annual Wellness Visit',
      say: 'I’d like to book my Annual Wellness Visit.',
      tip: 'Don’t ask for an “annual physical”. Medicare doesn’t cover one, so it can be billed. In your first year on Medicare, ask for the “Welcome to Medicare” visit.',
    }
  }
  if (insurance === 'none') {
    return {
      ...visit,
      say: 'I’d like to book a preventive care visit. I don’t have insurance. What would it cost?',
      tip: null,
    }
  }
  return visit
}

// What the plan costs, in one line. The only place coverage is stated.
export const COVERAGE = {
  private: '$0 with [[in-network]] providers',
  medicare: '$0 when your doctor accepts Medicare',
  medicaid: '$0 with Medicaid in most states',
  unsure: '$0 with most insurance',
  none: 'Low or no cost at a community health center',
}

// Anything more a person needs to know about their coverage. Medicare and private plans need nothing more.
export const INSURANCE_NOTES = {
  medicaid: 'To check your state, call the number on your Medicaid card and ask about preventive care.',
  unsure: 'Most job-based and healthcare.gov plans cover these at $0. To check yours, call the number on your insurance card.',
  none: 'Without insurance these aren’t automatically free. Health departments often test for HIV and hepatitis for free.',
}

// Help finding someone to book with, by insurance. It sits inside the first visit, one tap away, so nobody
// has to answer "do you have a doctor?" first. Text plus at most one link out: no provider data to keep fresh.
const NO_DOCTOR = 'No doctor yet? Find one'
const NEW_PATIENTS = 'Which in-network primary care doctors near me are taking new patients?'
const HEALTH_CENTERS = 'https://findahealthcenter.hrsa.gov/'
export const FIND_DOCTOR = {
  private: { title: NO_DOCTOR, text: 'Call the member services number on your insurance card.', ask: NEW_PATIENTS },
  medicaid: { title: NO_DOCTOR, text: 'Call the member services number on your Medicaid or health plan card.', ask: NEW_PATIENTS },
  medicare: {
    title: NO_DOCTOR,
    text: 'Call 1-800-MEDICARE (1-800-633-4227), or the number on your plan card if you have Medicare Advantage.',
    ask: 'Which primary care doctors near me accept Medicare and are taking new patients?',
  },
  unsure: {
    title: NO_DOCTOR,
    text: 'If you have an insurance card, call the member services number on it.',
    ask: NEW_PATIENTS,
    link: { label: 'No insurance? Find a health center', href: HEALTH_CENTERS },
  },
  // Without insurance this is the main route, so it starts open.
  none: {
    title: 'Where to go without insurance',
    open: true,
    text: 'Community health centers see people without insurance and charge based on what you can pay. Many can be your regular doctor.',
    more: 'Already have a doctor? Ask the office what a preventive visit costs if you pay yourself.',
    link: { label: 'Find a health center near you', href: HEALTH_CENTERS },
  },
}
export const findDoctor = insurance => FIND_DOCTOR[insurance] || FIND_DOCTOR.private

// "Book 1 visit. The rest follows from it."
export function planSummary(plan) {
  const book = plan.visits.filter(v => v.kind === 'book').length
  const follow = plan.visits.length - book
  if (!book) return ''
  const lead = `Book ${book} ${book === 1 ? 'visit' : 'visits'}.`
  if (!follow) return lead
  return `${lead} The rest ${book === 1 ? 'follows from it' : 'follows from them'}.`
}

// Everything the plan needs, computed from answers.
// s: { age, sex, insurance, personal: { [questionId]: optionId }, sexual, improved }
export function derivePlan(data, s) {
  const range = AGE_RANGES.find(r => r.id === s.age)
  const eligible = eligibleRecs(data.recs, range, s.sex)
  const { planned, askDoctor } = buildPlan(eligible, s.personal, s.sexual)
  const visits = groupByVisit(planned, data.visits).map(v => ({
    ...visitForInsurance(v, s.insurance),
    items: v.items.map(it => ({ ...it, note: range && ageNote(it.rec, range) })),
  }))
  const plan = {
    range, eligible, planned, visits, insurance: s.insurance,
    // "Ask if these apply to you" only makes sense once the extra questions have narrowed the list.
    askDoctor: s.improved ? askDoctor.map(rec => ({ rec, note: range && ageNote(rec, range) })) : [],
    // What the person's own answers unlocked.
    added: planned.filter(r => r.conditional),
    improved: !!s.improved,
    note: INSURANCE_NOTES[s.insurance] || null,
    finder: findDoctor(s.insurance),
  }
  // The plan can show before insurance is answered; it just can't say what it costs yet.
  return { ...plan, summary: planSummary(plan), coverage: COVERAGE[s.insurance] || 'One more answer shows what it costs' }
}

// The extra questions for this person, and how many screenings they could still unlock.
export function extraQuestions(data, s) {
  const range = AGE_RANGES.find(r => r.id === s.age)
  const eligible = eligibleRecs(data.recs, range, s.sex)
  if (!eligible.length) return { questions: [], sexual: false, steps: [], possible: 0 }
  const { askDoctor } = buildPlan(eligible, s.personal, s.sexual)
  const open = new Set(askDoctor.map(r => r.id))
  const questions = relevantQuestions(eligible, range, s.sex)
  const sexual = eligible.some(r => SEXUAL_HEALTH.recs.includes(r.id))
  const possible = new Set([
    ...questions.flatMap(q => q.affects).filter(id => open.has(id)),
    ...(sexual ? SEXUAL_HEALTH.recs.filter(id => open.has(id)) : []),
  ]).size
  return { questions, sexual, steps: [...questions.map(q => `q:${q.id}`), ...(sexual ? ['sexual'] : [])], possible }
}

// Keep only answers the app could have produced. Used before a plan is rebuilt from stored or posted answers.
export function cleanAnswers(input) {
  const s = input && typeof input === 'object' ? input : {}
  const pick = (list, v) => (list.some(o => o.id === v) ? v : undefined)
  const personal = {}
  for (const q of PERSONAL_QUESTIONS) {
    const v = pick(q.options, s.personal?.[q.id])
    if (v) personal[q.id] = v
  }
  return {
    age: pick(AGE_RANGES, s.age),
    sex: pick(SEX, s.sex),
    insurance: pick(INSURANCE, s.insurance),
    personal,
    sexual: s.sexual === 'yes' || s.sexual === 'no' ? s.sexual : undefined,
    improved: s.improved === true,
  }
}
