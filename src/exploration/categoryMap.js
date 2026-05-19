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
