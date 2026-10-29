// Plan logic for the chat lofi. Pure functions, no React.
// Source data: public/data/recommendations.json + public/data/visits.json

export const AGE_RANGES = [
  { id: '18-24', label: 'Under 25', lo: 18, hi: 24 },
  { id: '25-34', label: '25–34', lo: 25, hi: 34 },
  { id: '35-39', label: '35–39', lo: 35, hi: 39 },
  { id: '40-44', label: '40–44', lo: 40, hi: 44 },
  { id: '45-49', label: '45–49', lo: 45, hi: 49 },
  { id: '50-64', label: '50–64', lo: 50, hi: 64 },
  { id: '65-75', label: '65–75', lo: 65, hi: 75 },
  { id: '76-99', label: '76+', lo: 76, hi: 99 },
]

export const INSURANCE = [
  { id: 'employer', label: 'Through a job' },
  { id: 'marketplace', label: 'Marketplace (healthcare.gov)' },
  { id: 'medicare', label: 'Medicare' },
  { id: 'medicaid', label: 'Medicaid' },
  { id: 'tricare', label: 'TRICARE' },
  { id: 'none', label: "I don't have insurance" },
  { id: 'unsure', label: 'Not sure' },
]

// Personal questions. `effects[answer]` lists rec ids to add or remove.
// Anything not resolved stays as "ask your doctor".
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
      { id: 'pregnant', label: "I'm pregnant" },
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

// The passive, self-select sexual health card. The app never records which factor applies.
export const SEXUAL_HEALTH = {
  factors: [
    'A new partner, or more than one',
    "Didn't always use condoms with someone whose status you didn't know",
    'Had an STI, like chlamydia, gonorrhea, or syphilis',
    'A partner who has HIV or hepatitis B',
    'Shared needles',
  ],
  maleFactor: 'Sex with men',
  recs: ['prep-hiv', 'syphilis-screening', 'hepatitis-b-screening-adults', 'chlamydia-gonorrhea-screening'],
}

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
export function buildPlan(eligible, answers, sexualHealth) {
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

// Visit name/tip can change by insurance (Medicare has no "annual physical").
export function visitForInsurance(visit, insurance) {
  if (visit.id === 'primary-care' && insurance === 'medicare') {
    return {
      ...visit,
      name: 'Annual Wellness Visit',
      booking_tip: 'Book an "Annual Wellness Visit", not an "annual physical". Medicare doesn’t cover a routine physical, so it can be billed. In your first year on Medicare, ask for the "Welcome to Medicare" visit.',
      coverage: 'Covered once a year at $0 when your doctor accepts Medicare.',
    }
  }
  if (insurance === 'none') {
    return {
      ...visit,
      coverage: 'Without insurance this isn’t automatically free. Community health centers charge based on what you can pay, and health departments often test for free.',
    }
  }
  return visit
}

export const INSURANCE_NOTES = {
  medicaid: 'Medicaid covers these free in most states. If you’re not sure, call the number on your card and ask about preventive care.',
  unsure: 'Most job-based and Marketplace plans cover these at $0. To confirm, call the number on your insurance card.',
  none: 'You can still get most of this. Community health centers charge based on what you can pay.',
}
