# Product copy inventory — v2

All user-facing strings in the product, organized by location. Use this as a source of truth for copy review and refinement.

**What changed from v1:** See the [changelog](#changelog) at the bottom of this file.

---

## Onboarding flow

### Step 1 — Insurance type

| Element | v2 copy |
|---|---|
| Step label | Step 1 of 3 |
| Question | What kind of health insurance do you have? |
| Hint | Preventive care rules vary by plan type. This helps us show only what applies to yours. |
| Option: Employer | Employer · Coverage through a job |
| Option: Marketplace | Marketplace · healthcare.gov |
| Option: TRICARE | TRICARE · Military coverage |
| Expander trigger | My situation is different |
| Expander option | Medicare |
| Expander option | Medicaid or Medi-Cal |
| Expander option | Short-term or limited plan |
| Expander option | I'm not sure |
| CTA | Continue |

### Step 2 — Age

| Element | v2 copy |
|---|---|
| Step label | Step 2 of 3 |
| Question | How old are you? |
| Hint | Your age determines which screenings apply to you. |
| CTA | Continue |

### Step 3 — Sex assigned at birth

| Element | v2 copy |
|---|---|
| Step label | Step 3 of 3 |
| Question | What sex were you assigned at birth? |
| Hint | Some screenings are recommended based on the body you were born with, not your gender identity. |
| Option | Male |
| Option | Female |
| CTA | See what's covered for me |

---

## Soft exits

Shown when the user selects a plan type that this tool doesn't cover.

**Medicare**
Medicare covers many preventive services, but through its own rules — not the same law this tool is based on. For the most accurate picture of what you're entitled to, visit medicare.gov or call 1-800-MEDICARE.

**Medicaid / Medi-Cal**
Medicaid coverage varies by state and doesn't follow the same rules as employer or marketplace plans. Call the number on your insurance card or contact your state's Medicaid office to ask about free preventive care.

**Short-term or limited plan**
Short-term health plans aren't required to cover preventive care at no cost. Check your plan documents or call your insurer to find out what's covered — and what you'd pay out of pocket.

**I'm not sure**
Your insurance card is a good starting point — the plan name and a customer service number should be on the back. One quick call can tell you what type of plan you have and confirm your preventive care benefits.

---

## Results page

| Element | v2 copy |
|---|---|
| Summary heading | {n} preventive services covered for you |
| Subhead | {n} you can schedule today. {n} more may apply — worth a conversation with your doctor. |
| Section heading (universal) | Schedule these |
| Accordion trigger (conditional) | Ask your doctor about these — {n} services |
| Back button | ← Back |

---

## Recommendation cards

### Universal recommendations — description and grade only

| Name (plain) | Grade | Description |
|---|---|---|
| Anxiety screening | B | Screening for anxiety disorders, including during pregnancy and postpartum. Recommended for all adults 18–64. |
| Mammogram (breast cancer screening) | B | Mammography every other year to screen for breast cancer. Recommended for all women 40–74. |
| Cervical cancer screening | A | A Pap smear every 3 years, or an HPV test every 5 years, to detect early cervical changes. Recommended for all women 21–65. |
| Colorectal cancer screening | A | A colonoscopy, stool test, or other approved method to screen for colorectal cancer. Recommended for all adults 45–75. |
| Depression screening | B | Screening for depression, including during and after pregnancy. Recommended for all adults. |
| Hepatitis C screening | B | A one-time blood test to check for hepatitis C. Most people who have it don't know. Recommended for all adults 18–79. |
| Blood pressure screening | A | A routine blood pressure check to screen for hypertension before it causes damage. Recommended for all adults 18 and older. |
| HIV screening | A | A routine blood test to screen for HIV. Recommended for all adults and adolescents 15–65. |
| Intimate partner violence screening | B | Screening for intimate partner violence and connection to support services when needed. Recommended for all women of reproductive age. |
| Osteoporosis screening (bone density test) | B | A bone density scan to screen for osteoporosis and fracture risk. Recommended for all women 65 and older, and for younger postmenopausal women at increased risk. |
| Alcohol use screening and counseling | B | Screening for unhealthy alcohol use and a brief counseling session to reduce it. Recommended for all adults 18 and older. |
| Vision screening | B | Screening for vision problems. Recommended for adults 65 and older. |

---

### Conditional recommendations — description, condition note, and doctor prompt

The "Ask your doctor" prompts below are intentionally varied — each is written to match the specific conversation a patient would realistically have, not a generic formula.

| Name (plain) | Grade | Description | Condition note | Doctor prompt |
|---|---|---|---|---|
| Abdominal aortic aneurysm screening | B | A one-time ultrasound to check for a dangerous bulge in the main artery of your abdomen. Recommended for men 65–75 who have ever smoked. | Applies to men who have smoked at least 100 cigarettes in their lifetime. | "I've smoked in the past — am I due for the one-time AAA ultrasound?" |
| Low-dose aspirin to prevent preeclampsia | B | Low-dose aspirin (81mg/day) starting after 12 weeks of pregnancy to reduce preeclampsia risk in high-risk pregnancies. | Applies to pregnant people at high risk for preeclampsia. | "Am I at high risk for preeclampsia? Should I be taking low-dose aspirin?" |
| Urinary tract infection screening during pregnancy | B | A urine culture during pregnancy to check for bacteria — even without symptoms. | Applies to pregnant people only. | "Should UTI screening be part of my prenatal care visits?" |
| Genetic counseling for BRCA gene mutations | B | A risk assessment and, if indicated, genetic counseling and testing for inherited gene mutations that significantly raise the risk of breast and ovarian cancer. | Applies to women with a personal or family history of breast, ovarian, tubal, or peritoneal cancer, or ancestry associated with BRCA1/2 mutations. | "Given my family history, should I be assessed for BRCA mutations?" |
| Medications to reduce breast cancer risk | B | Medications like tamoxifen or raloxifene that can meaningfully reduce breast cancer risk for women at elevated risk. | Applies to women at increased risk for breast cancer and low risk for adverse medication effects. | "Am I at increased risk for breast cancer? Would preventive medication make sense for me?" |
| Chlamydia and gonorrhea screening | B | STI screening for chlamydia and gonorrhea. Recommended for sexually active women 24 and younger, and older women at increased risk. | Recommended for all sexually active women 24 and younger, and older women at increased risk. | "Should I be screened for chlamydia and gonorrhea based on my age and sexual history?" |
| Diabetes screening | B | A blood sugar test to check for prediabetes and type 2 diabetes. Recommended for adults 35–70 who are overweight or obese. | Applies to adults who are overweight or obese. | "Given my weight, should I be screened for prediabetes or type 2 diabetes?" |
| Fall prevention (exercise program) | B | Referral to an exercise program to prevent falls and fall-related injuries in older adults at increased risk. | Applies to adults 65+ who are at increased risk for falls. | "Am I at increased risk for falls? Is there a covered exercise program I should be in?" |
| Folic acid supplement | A | A daily folic acid supplement (0.4–0.8mg) to reduce the risk of neural tube defects. Recommended for people who are pregnant or could become pregnant. | Applies to people who are pregnant or planning to become pregnant. | "Should I be taking folic acid, and what's the right dose for me?" |
| Gestational diabetes screening | B | Blood sugar screening during pregnancy, typically after 24 weeks, to check for diabetes that develops during pregnancy. | Applies to pregnant people after 24 weeks of gestation. | "When should I be screened for gestational diabetes, and what does that test involve?" |
| Healthy diet and exercise counseling | B | Behavioral counseling to support a healthier diet and regular activity in adults with cardiovascular risk factors. | Applies to adults with cardiovascular risk factors such as high blood pressure, high cholesterol, or mixed dyslipidemia. | "Do I have enough cardiovascular risk factors to qualify for covered diet and activity counseling?" |
| Hepatitis B screening | B | A blood test to screen for hepatitis B in adults at increased risk based on background or vaccination history. | Applies to adults at increased risk (e.g., born in countries with HBV prevalence ≥2%, unvaccinated U.S.-born people whose parents were from high-prevalence regions, or HIV-positive individuals). | "Based on my background, should I be screened for hepatitis B?" |
| Lung cancer screening (low-dose CT scan) | B | An annual low-dose CT scan to screen for lung cancer in adults 50–80 with a significant smoking history. | Applies to adults with a 20 pack-year smoking history who currently smoke or quit within the past 15 years. | "Based on my smoking history, do I qualify for the annual low-dose CT scan?" |
| Weight loss counseling | B | Referral to intensive behavioral counseling to support weight loss in adults with obesity. | Applies to adults with a BMI of 30 or higher. | "My BMI is over 30 — am I eligible for covered weight loss counseling or a structured program?" |
| Counseling to prevent perinatal depression | B | Counseling to prevent depression during and after pregnancy for people at increased risk. | Applies to pregnant and postpartum people at increased risk for perinatal depression. | "Am I at increased risk for perinatal depression? Should I be connected with counseling now?" |
| PrEP (HIV prevention medication) | A | A daily medication that significantly reduces the risk of contracting HIV. Recommended for adults at increased risk. | Applies to adults at increased risk for HIV acquisition. | "Based on my risk factors, should I be taking PrEP?" |
| Skin cancer prevention counseling | B | Counseling about minimizing UV exposure to reduce skin cancer risk. Recommended for fair-skinned people up to age 24. | Applies to fair-skinned people aged 6 months to 24 years. | "Should I be getting counseling about UV exposure and skin cancer risk?" |
| Statin medication (heart disease prevention) | B | A statin medication to help prevent a first heart attack or stroke in adults 40–75 with cardiovascular risk factors. | Applies to adults with one or more cardiovascular risk factors and an estimated 10-year CVD risk of 10% or greater. | "Do my risk factors qualify me for a preventive statin prescription at no cost?" |
| Syphilis screening | A | A blood test to screen for syphilis. Recommended for adults at increased risk. | Applies to adults at increased risk for syphilis infection. | "Based on my sexual history, should I be screened for syphilis?" |
| Tobacco cessation counseling and medication | A | Counseling and covered medications to help quit smoking and other tobacco use. Recommended for all adults who currently use tobacco. | Applies to adults who currently use tobacco. | "I smoke — what cessation counseling or medications am I entitled to at no cost?" |

---

## Badge labels

| Badge | Label |
|---|---|
| Grade A | Grade A |
| Grade B | Grade B |

> **Design direction note:** Per the results redesign PRD, Grade A/B badges are being retired from the results view. Frequency + cost copy (e.g., "Every 10 years · $0 with most insurance") will carry the visual weight instead. Badge labels are retained here for reference and for any contexts outside the results screen.

---

## Changelog — v1 → v2

### Onboarding flow

**Step 1 hint**
- v1: "This tells us which rules apply to your coverage."
- v2: "Preventive care rules vary by plan type. This helps us show only what applies to yours."
- *Why:* The v1 hint was abstract — "rules" is bureaucratic. The v2 leads with a concrete reason (plans differ) and connects it directly to the user's outcome (showing what applies to them specifically). Same information, more trust-building framing.

**Step 3 hint**
- v1: "This helps your checklist include the right screenings, since some depend on which organs you were born with."
- v2: "Some screenings are recommended based on the body you were born with, not your gender identity."
- *Why:* "Organs you were born with" reads as clinical and slightly awkward. The v2 accomplishes the same inclusion signal (this question is about anatomy, not identity) in a more natural and respectful way. It also front-loads the distinction that matters.

**Soft exits**
- Small edits for natural language and clearer action framing
- "For the most accurate picture of your coverage" → "For the most accurate picture of what you're entitled to" (Medicare) — shifts from plan logistics to user rights
- Added "and what you'd pay out of pocket" to the short-term plan exit — makes the stakes concrete, not just "check your documents"
- "I'm not sure" exit: removed "A quick call can tell you what type of plan you have" → replaced the slightly redundant second sentence with the same message, tighter

### Results page

**Summary heading**
- v1: "{n} services covered for you"
- v2: "{n} preventive services covered for you"
- *Why:* "Preventive" disambiguates — "services covered for you" could mean anything. One word resolves the ambiguity without adding cognitive load.

**Subhead**
- v1: "{n} apply based on your age alone. {n} may apply depending on your health history."
- v2: "{n} you can schedule today. {n} more may apply — worth a conversation with your doctor."
- *Why:* The v1 subhead explains the filtering logic (age alone vs. health history). That's engineer thinking, not user thinking. The v2 reframes around action: what can I do right now, and what do I need to ask about? "Worth a conversation with your doctor" is warmer and less passive than "may apply."
- *Tradeoff:* "Schedule today" sets a mild urgency that some users may find pressure-y. Could be softened to "you can schedule" without "today" if testing reveals friction.

**Section heading (universal)**
- v1: "Covered for you"
- v2: "Schedule these"
- *Why:* "Covered for you" restates what's already on the summary card. "Schedule these" tells the user what to do with this information. It's the distinction the PRD calls for: universal items are action items, conditional items are conversation starters.
- *Tradeoff:* "Schedule these" implies the user is ready to book an appointment — which may not be true. "Ready to schedule" is a softer alternative if user research shows people feel overwhelmed by the direct imperative.

**Accordion trigger (conditional)**
- v1: "May also apply to you — {n} services"
- v2: "Ask your doctor about these — {n} services"
- *Why:* "May also apply to you" was flagged in v1 notes as passive and vague. The v2 tells the user exactly what to do: bring these up with their doctor. It also makes the purpose of the conditional section clearer — these aren't uncertain screenings, they're screenings that need a conversation first.

### Recommendation card descriptions

**Universal cards:** Light editing for consistency — removed redundant subject phrases, tightened passive constructions. No substantive changes to meaning.

**Doctor prompts (conditional cards):**
- v1: All prompts followed the format "Ask your doctor: '...'" with a full quoted question
- v2: The "Ask your doctor:" attribution frame is removed. The question itself is retained, made conversational rather than scripted. Each prompt is written to match the realistic tone of that specific conversation (e.g., pregnancy vs. smoking history vs. weight vs. family history) rather than following a template.
- *Why:* The v1 format felt like dialogue written by a committee — every conditional rec had the same "Ask your doctor: [formal question]" structure. The v2 prompts sound like something a person would actually say in a room.
- *Tradeoff:* Removing the "Ask your doctor:" attribution label saves space but removes the affordance that signals "this is a conversation starter, not a diagnosis." Consider retaining the label as an eyebrow above the prompt if the detail view design requires that context cue.

### Badge labels

Added a design direction note documenting the planned transition from grade badges to frequency + cost copy (per the results redesign PRD). The table is retained for non-results contexts.
