# Screening hooks — v2

Stat-driven hooks written for the unlock prototype. Each is meant to appear *before* the user sees what the screening is — to create motivation first, then reveal the benefit.

**What changed from v1:** See the [changelog](#changelog) at the bottom of this file.

---

## Category-level hooks

These appear on the category card while locked, before any individual screenings are revealed.

| Category | Hook |
|---|---|
| Heart & Metabolic | Heart disease is the #1 killer of Americans — and most of the damage happens silently, years before any symptoms. These screenings catch it before it becomes an emergency. |
| Cancer Detection | When caught early, most cancers are 90%+ survivable. These screenings find them before symptoms ever start. |
| Mental Health & Behavior | 1 in 5 adults will experience a mental health condition this year. Most are never asked about it at a doctor's appointment. A short check can open the door to something better. |
| Infectious Disease | Many of the most common infectious diseases have no symptoms for years. The only way to know is a blood test. |
| Women's Health | Several preventive screenings are recommended specifically for women — not because they're at greater risk for everything, but because some conditions only your OB or primary care doctor would know to check. |

---

## Screening-level hooks

These appear on each individual screening card while locked.

### Heart & Metabolic

**Blood pressure screening**
Nearly half of U.S. adults have high blood pressure — and most find out only after it's caused damage. It has no symptoms. A two-minute cuff check is the only way to know.

**Statin medication (heart disease prevention)**
A free statin prescription can cut your risk of a first heart attack by up to 35%. Most people who qualify have never been told they qualify.

**Healthy diet and exercise counseling**
Adults with cardiovascular risk factors are entitled to structured, covered coaching on diet and exercise. Not a pamphlet — a real program. Most never claim it.

**Diabetes screening**
Prediabetes affects 1 in 3 American adults. 8 out of 10 don't know they have it. A simple blood test is all it takes to find out where you stand.

---

### Cancer Detection

**Colorectal cancer screening**
Colorectal cancer is 90% survivable if caught early — but less than 40% of cases are found that way. A stool test or colonoscopy can shift those odds in your favor.

**Mammogram (breast cancer screening)**
Mammograms reduce breast cancer deaths by up to 20%. Most women don't realize they're fully covered starting at 40 — every other year, at no cost.

**Lung cancer screening (low-dose CT scan)**
Lung cancer kills more Americans than any other cancer. In adults with a significant smoking history, annual low-dose CT scans cut mortality by 20%. Most who qualify never get one.

**Cervical cancer screening**
Cervical cancer is almost entirely preventable when caught early — but it has no symptoms in its early stages. A Pap smear or HPV test every few years is all it takes.

---

### Mental Health & Behavior

**Depression screening**
Depression affects 21 million Americans and is one of the most treatable conditions — when it's identified. A short questionnaire at your annual visit is all it takes.

**Anxiety screening**
Anxiety disorders affect 40 million adults in the U.S. Most go undiagnosed for years, not because they're untreatable, but because no one ever asked.

**Alcohol use screening and counseling**
Brief counseling after a simple screening has been shown to measurably reduce drinking in adults with unhealthy alcohol use. It takes less than 10 minutes — and it's covered.

---

### Infectious Disease

**Hepatitis C screening**
An estimated 2.4 million Americans are living with hepatitis C and don't know it. It causes no symptoms for decades. A one-time blood test can rule it out completely.

**HIV screening**
HIV is now a manageable condition — but only if it's caught. A routine blood test, recommended for every adult 15–65, is the only way to know your status.

**Hepatitis B screening**
Hepatitis B affects an estimated 2 million Americans and causes no symptoms until it's caused serious liver damage. A single blood test takes it off the table.

---

### Women's Health

**Intimate partner violence screening**
1 in 4 women will experience intimate partner violence. Most are never screened for it in a medical setting — and most don't bring it up unless someone asks. Your doctor is required to ask and connect you to resources if needed.

**BRCA genetic counseling**
A family history of breast or ovarian cancer may mean you carry a gene mutation that significantly raises your own risk. Most women with this history have never been referred for a risk assessment — and most don't know it's covered.

**Chlamydia and gonorrhea screening**
Chlamydia and gonorrhea often cause no symptoms — especially in women. Untreated, they can lead to serious long-term complications. Screening takes a few minutes and is covered at no cost.

---

## Notes on hook writing

- Lead with a surprising or uncomfortable number — not reassurance
- The hook earns the reveal; it shouldn't describe the service, just the risk
- Conditional screenings (ones that only apply if…) should hook on the *impact if ignored*, not the condition itself
- "Most people don't know" is a strong frame — it removes shame and creates urgency at the same time
- The primary persona (Marcus, 47M, hasn't seen a doctor in years) doesn't respond to health anxiety — he responds to facts he wasn't aware of. Hooks that lead with "most people who qualify never find out" work better than "this could kill you"
- Avoid stacking multiple stats in one hook — pick the sharpest one and stop

---

## Changelog — v1 → v2

### Category hooks

**Heart & Blood Vessels → Heart & Metabolic**
- v1: "Heart disease is the #1 killer of Americans — but it's largely preventable."
- v2: "Heart disease is the #1 killer of Americans — and most of the damage happens silently, years before any symptoms."
- *Why:* "Largely preventable" is reassuring, which undercuts the urgency. The v2 replaces it with the specific mechanism that makes this scary (silent damage) — which is also why the screening matters. The hook earns the reveal.

**Mental Health**
- v1: "A brief check at your annual visit can open the door to support."
- v2: "A short check can open the door to something better."
- *Why:* "Support" is the language of a brochure. "Something better" is what the user actually wants. Small change, different emotional register.

**Infectious Disease — added (was missing in v1)**
- v2: "Many of the most common infectious diseases have no symptoms for years. The only way to know is a blood test."
- *Why:* The PRD includes Infectious Disease as a results category. Hooks.md v1 had no category-level hook for it.

**Women's Health — added (was missing in v1)**
- *Why:* The PRD introduces Women's Health as a distinct results category for female users. Hook added to match.

---

### Screening hooks

**Blood pressure screening**
- v1: "Nearly half of U.S. adults have high blood pressure. Most go years without knowing — it has no symptoms."
- v2: "Nearly half of U.S. adults have high blood pressure — and most find out only after it's caused damage."
- *Why:* "Go years without knowing" is passive. "Find out only after it's caused damage" raises the stakes without being alarmist — it's the consequence, not just the absence of knowledge.

**Statin medication**
- v1: "Most people who qualify never think to ask."
- v2: "Most people who qualify have never been told they qualify."
- *Why:* "Never think to ask" subtly blames the user. "Never been told" puts the accountability on the system — which is more accurate and removes shame.

**Healthy diet and exercise counseling**
- v1: "Personalized coaching on diet and exercise — covered at no cost — can measurably lower your risk of heart attack and stroke."
- v2: "Not a pamphlet — a real program. Most never claim it."
- *Why:* "Measurably lower" is weak (all improvements are measurable). The v2 hook works by reframing the expectation: users assume they'll get a brochure, not an actual covered program. Surprise creates motivation.
- *Tradeoff:* The v2 hook is more provocative — some users might bristle at "not a pamphlet" if it reads as dismissive. Test against the original if this context appears in copy audits.

**Colorectal cancer screening**
- v1: "A stool test or colonoscopy changes those odds."
- v2: "A stool test or colonoscopy can shift those odds in your favor."
- *Why:* "Changes those odds" is ambiguous — in whose favor? "Shift those odds in your favor" makes the direction explicit without adding length.

**Mammogram**
- v1: "Mammograms reduce breast cancer deaths by up to 20%. Starting at 40, they're fully covered every other year."
- v2: "Mammograms reduce breast cancer deaths by up to 20%. Most women don't realize they're fully covered starting at 40 — every other year, at no cost."
- *Why:* The v1 second sentence was a logistics statement. The v2 reframes it as a gap most women don't know about — which is more consistent with the hook writing principle ("Most people don't know" removes shame and creates urgency).

**Lung cancer screening**
- v1: "Annual low-dose CT scans cut mortality by 20% in people with a heavy smoking history."
- v2: "In adults with a significant smoking history, annual low-dose CT scans cut mortality by 20%. Most who qualify never get one."
- *Why:* The v1 hook ended on the stat. Adding "Most who qualify never get one" converts the stat into an action gap — consistent with the hook writing principles.

**New hooks added (not in v1):**
- Cervical cancer screening
- Diabetes screening
- Alcohol use screening and counseling
- Hepatitis C screening
- HIV screening
- Hepatitis B screening
- Intimate partner violence screening
- BRCA genetic counseling
- Chlamydia and gonorrhea screening

*Rationale:* v1 only had hooks for 8 screenings. The results view will surface up to 20+ screenings per persona. All conditional screenings in the unlock prototype need a hook to earn the reveal — they can't just appear with a name and description.

**Added persona note to writing guidelines**
- The primary persona (Marcus, 47M, hasn't seen a doctor in years) responds to awareness gaps, not fear. Hooks framed as "you didn't know you qualified" outperform "this could be serious." Documented in the Notes section.
