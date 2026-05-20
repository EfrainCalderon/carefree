// ─── Category-level hooks (shown at top of detail view) ──────────────────────
// Source: hooks_v2.md — category-level hooks section
export const CATEGORY_HOOKS = {
  heart_metabolic:   "Heart disease is the #1 killer of Americans — and most of the damage happens silently, years before any symptoms. These screenings catch it before it becomes an emergency.",
  cancer:            "When caught early, most cancers are 90%+ survivable. These screenings find them before symptoms ever start.",
  mental_health:     "1 in 5 adults will experience a mental health condition this year. Most are never asked about it at a doctor's appointment. A short check can open the door to something better.",
  infectious_disease:"Many of the most common infectious diseases have no symptoms for years. The only way to know is a blood test.",
  womens_health:     "Several preventive screenings are recommended specifically for women — not because they're at greater risk for everything, but because some conditions only your OB or primary care doctor would know to check.",
  healthy_aging:     null, // no hook written yet
}

// ─── Screening-level hooks (shown on each item row) ──────────────────────────
// Source: hooks_v2.md — screening-level hooks section
export const SCREENING_HOOKS = {
  'high-blood-pressure-screening':  "Nearly half of U.S. adults have high blood pressure — and most find out only after it's caused damage. It has no symptoms. A two-minute cuff check is the only way to know.",
  'statin-cvd':                     "A free statin prescription can cut your risk of a first heart attack by up to 35%. Most people who qualify have never been told they qualify.",
  'healthy-diet-counseling':        "Adults with cardiovascular risk factors are entitled to structured, covered coaching on diet and exercise. Not a pamphlet — a real program. Most never claim it.",
  'diabetes-screening':             "Prediabetes affects 1 in 3 American adults. 8 out of 10 don't know they have it. A simple blood test is all it takes to find out where you stand.",
  'colorectal-cancer-screening':    "Colorectal cancer is 90% survivable if caught early — but less than 40% of cases are found that way. A stool test or colonoscopy can shift those odds in your favor.",
  'breast-cancer-screening':        "Mammograms reduce breast cancer deaths by up to 20%. Most women don't realize they're fully covered starting at 40 — every other year, at no cost.",
  'lung-cancer-screening':          "Lung cancer kills more Americans than any other cancer. In adults with a significant smoking history, annual low-dose CT scans cut mortality by 20%. Most who qualify never get one.",
  'cervical-cancer-screening':      "Cervical cancer is almost entirely preventable when caught early — but it has no symptoms in its early stages. A Pap smear or HPV test every few years is all it takes.",
  'depression-adults':              "Depression affects 21 million Americans and is one of the most treatable conditions — when it's identified. A short questionnaire at your annual visit is all it takes.",
  'anxiety-adults':                 "Anxiety disorders affect 40 million adults in the U.S. Most go undiagnosed for years, not because they're untreatable, but because no one ever asked.",
  'unhealthy-alcohol-use':          "Brief counseling after a simple screening has been shown to measurably reduce drinking in adults with unhealthy alcohol use. It takes less than 10 minutes — and it's covered.",
  'hepatitis-c-screening':          "An estimated 2.4 million Americans are living with hepatitis C and don't know it. It causes no symptoms for decades. A one-time blood test can rule it out completely.",
  'hiv-screening':                  "HIV is now a manageable condition — but only if it's caught. A routine blood test, recommended for every adult 15–65, is the only way to know your status.",
  'hepatitis-b-screening-adults':   "Hepatitis B affects an estimated 2 million Americans and causes no symptoms until it's caused serious liver damage. A single blood test takes it off the table.",
  'intimate-partner-violence':      "1 in 4 women will experience intimate partner violence. Most are never screened for it in a medical setting — and most don't bring it up unless someone asks. Your doctor is required to ask and connect you to resources if needed.",
  'brca-risk':                      "A family history of breast or ovarian cancer may mean you carry a gene mutation that significantly raises your own risk. Most women with this history have never been referred for a risk assessment — and most don't know it's covered.",
  'chlamydia-gonorrhea-screening':  "Chlamydia and gonorrhea often cause no symptoms — especially in women. Untreated, they can lead to serious long-term complications. Screening takes a few minutes and is covered at no cost.",
}

export const CATEGORIES = {
  heart_metabolic: { id: 'heart_metabolic', label: 'Heart & Metabolic', icon: '🫀', colorKey: 'heart' },
  cancer: { id: 'cancer', label: 'Cancer', icon: '🎗️', colorKey: 'cancer' },
  mental_health: { id: 'mental_health', label: 'Mental Health & Behavior', icon: '🧠', colorKey: 'mental' },
  infectious_disease: { id: 'infectious_disease', label: 'Infectious Disease', icon: '🧬', colorKey: 'infectious' },
  womens_health: { id: 'womens_health', label: "Women's Health", icon: '🩺', colorKey: 'womens' },
  healthy_aging: { id: 'healthy_aging', label: 'Healthy Aging', icon: '🌿', colorKey: 'aging' },
}

// Maps rec ID → category + testType (what the screening actually involves) + frequency
export const REC_META = {
  'high-blood-pressure-screening': { category: 'heart_metabolic', frequency: 'Every 1–2 years', testType: 'Physical exam' },
  'diabetes-screening': { category: 'heart_metabolic', frequency: 'Every 3 years if normal', testType: 'Blood test' },
  'statin-cvd': { category: 'heart_metabolic', frequency: 'Ongoing if prescribed', testType: 'Medication' },
  'healthy-diet-counseling': { category: 'heart_metabolic', frequency: 'As recommended', testType: 'Counseling' },
  'obesity-counseling-adults': { category: 'heart_metabolic', frequency: 'As recommended', testType: 'Counseling' },
  'aaa-screening': { category: 'heart_metabolic', frequency: 'One-time', testType: 'Ultrasound' },
  'colorectal-cancer-screening': { category: 'cancer', frequency: 'Every 10 years', testType: 'Colonoscopy or stool test' },
  'breast-cancer-screening': { category: 'cancer', frequency: 'Every 2 years', testType: 'Mammogram' },
  'lung-cancer-screening': { category: 'cancer', frequency: 'Yearly', testType: 'CT scan' },
  'brca-risk': { category: 'cancer', frequency: 'One-time assessment', testType: 'Genetic counseling' },
  'breast-cancer-meds': { category: 'cancer', frequency: 'Ongoing if prescribed', testType: 'Medication' },
  'skin-cancer-counseling': { category: 'cancer', frequency: 'As recommended', testType: 'Counseling' },
  'depression-adults': { category: 'mental_health', frequency: 'Yearly', testType: 'Questionnaire' },
  'anxiety-adults': { category: 'mental_health', frequency: 'Yearly', testType: 'Questionnaire' },
  'unhealthy-alcohol-use': { category: 'mental_health', frequency: 'Yearly', testType: 'Questionnaire' },
  'tobacco-cessation': { category: 'mental_health', frequency: 'As needed', testType: 'Counseling + medication' },
  'hepatitis-c-screening': { category: 'infectious_disease', frequency: 'One-time', testType: 'Blood test' },
  'hiv-screening': { category: 'infectious_disease', frequency: 'Every 3–5 years', testType: 'Blood test' },
  'hepatitis-b-screening-adults': { category: 'infectious_disease', frequency: 'One-time or as needed', testType: 'Blood test' },
  'prep-hiv': { category: 'infectious_disease', frequency: 'Daily if prescribed', testType: 'Medication' },
  'syphilis-screening': { category: 'infectious_disease', frequency: 'As recommended', testType: 'Blood test' },
  'cervical-cancer-screening': { category: 'womens_health', frequency: 'Every 3–5 years', testType: 'Pap smear or HPV test' },
  'intimate-partner-violence': { category: 'womens_health', frequency: 'Yearly', testType: 'Questionnaire' },
  'chlamydia-gonorrhea-screening': { category: 'womens_health', frequency: 'Yearly', testType: 'Lab test' },
  'aspirin-preeclampsia': { category: 'womens_health', frequency: 'During pregnancy', testType: 'Medication' },
  'folic-acid': { category: 'womens_health', frequency: 'Daily', testType: 'Supplement' },
  'gestational-diabetes': { category: 'womens_health', frequency: 'During pregnancy', testType: 'Blood test' },
  'perinatal-depression': { category: 'womens_health', frequency: 'During/after pregnancy', testType: 'Counseling' },
  'bacteriuria-pregnant': { category: 'womens_health', frequency: 'During pregnancy', testType: 'Urine test' },
  'osteoporosis-screening': { category: 'healthy_aging', frequency: 'Periodically', testType: 'Bone density scan' },
  'fall-prevention-exercise': { category: 'healthy_aging', frequency: 'As recommended', testType: 'Exercise program' },
  'vision-screening-adults': { category: 'healthy_aging', frequency: 'Periodically', testType: 'Eye exam' },
}

export function filterRecs(recommendations, { age, sex }) {
  return recommendations.filter(r => {
    if (!r.sex.includes(sex)) return false
    if (age < r.age_min) return false
    if (r.age_max !== null && age > r.age_max) return false
    return true
  })
}

const CATEGORY_ORDER = ['heart_metabolic', 'cancer', 'mental_health', 'infectious_disease', 'womens_health', 'healthy_aging']

export function groupByCategory(recs) {
  const groups = {}
  recs.forEach(rec => {
    const meta = REC_META[rec.id]
    if (!meta) return
    const catId = meta.category
    if (!groups[catId]) {
      groups[catId] = { ...CATEGORIES[catId], schedulable: [], askDoctor: [] }
    }
    const enriched = { ...rec, frequency: meta.frequency, testType: meta.testType }
    if (rec.conditional) groups[catId].askDoctor.push(enriched)
    else groups[catId].schedulable.push(enriched)
  })
  return CATEGORY_ORDER.filter(id => groups[id]).map(id => groups[id])
}
