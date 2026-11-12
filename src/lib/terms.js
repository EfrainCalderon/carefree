// Glossary. Copy marks a term with [[double brackets]] and the plan shows it as a tap-to-define Term.
// [[display text]] looks up the text itself; [[display text|key]] looks up `key`.
export const TERMS = {
  'primary care provider': 'The doctor, nurse practitioner, or physician assistant you see for routine care. Also called a PCP or family doctor.',
  'in-network': 'Doctors, labs, and pharmacies that have a contract with your insurance plan. Staying in-network is what keeps these at $0.',
  'ob-gyn': 'A doctor who focuses on women’s reproductive health.',
  'gi clinic': 'A clinic for digestive health. Its doctors, called gastroenterologists, do colonoscopies.',
  referral: 'A note from your doctor that sends you to another service. Some insurance plans need one before they’ll pay.',
  prep: 'A medicine that lowers your chance of getting HIV. It comes as a pill or a shot.',
  statin: 'A daily pill that lowers cholesterol, to help prevent a heart attack or stroke.',
  bmi: 'Body mass index: a number based on your height and weight. Your doctor can work it out with you.',
  preeclampsia: 'A pregnancy condition that causes dangerously high blood pressure.',
}

const MARK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

export const defineTerm = key => TERMS[String(key).toLowerCase()]

// "With a [[primary care provider]]" → ['With a ', { text: 'primary care provider', term: 'primary care provider' }]
export function parseTerms(text = '') {
  const parts = []
  let last = 0
  for (const m of text.matchAll(MARK)) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push({ text: m[1], term: (m[2] || m[1]).toLowerCase() })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

// The same copy without the markup, for email and plain text.
export const plainText = (text = '') => text.replace(MARK, '$1')
