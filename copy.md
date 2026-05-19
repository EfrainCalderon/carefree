# Product copy inventory

All user-facing strings in the product, organized by location. Use this as a source of truth for copy review and refinement.

---

## Onboarding flow

### Step 1 — Insurance type

| Element | Current copy |
|---|---|
| Step label | Step 1 of 3 |
| Question | What type of health insurance do you have? |
| Hint | This tells us which rules apply to your coverage. |
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

| Element | Current copy |
|---|---|
| Step label | Step 2 of 3 |
| Question | How old are you? |
| Hint | Your age determines which screenings apply to you. |
| CTA | Continue |

### Step 3 — Sex assigned at birth

| Element | Current copy |
|---|---|
| Step label | Step 3 of 3 |
| Question | What sex were you assigned at birth? |
| Hint | This helps your checklist include the right screenings, since some depend on which organs you were born with. |
| Option | Male |
| Option | Female |
| CTA | See what's covered for me |

---

## Soft exits

Shown when the user selects a plan type that this tool doesn't cover.

**Medicare**
Medicare covers many preventive services, but through its own rules — not the same law this tool is based on. For the most accurate picture of your coverage, visit medicare.gov or call 1-800-MEDICARE.

**Medicaid / Medi-Cal**
Medicaid coverage varies by state and doesn't follow the same rules as employer or marketplace plans. Contact your state's Medicaid office or call the number on your insurance card to ask about free preventive care.

**Short-term or limited plan**
Short-term health plans aren't required to cover preventive care at no cost. Check your plan documents or call your insurer to understand what's covered.

**I'm not sure**
Check your insurance card — the plan name and a customer service number should be on the back. A quick call can tell you what type of plan you have and confirm your preventive care benefits.

---

## Results page

| Element | Current copy |
|---|---|
| Summary heading | {n} services covered for you |
| Subhead | {n} apply based on your age alone. {n} may apply depending on your health history. |
| Section heading (universal) | Covered for you |
| Accordion trigger (conditional) | May also apply to you — {n} services |
| Back button | ← Back |

---

## Recommendation cards

### Universal recommendations — description and grade only

| Name (plain) | Grade | Description |
|---|---|---|
| Anxiety screening | B | Screening for anxiety disorders, including during pregnancy and postpartum. Recommended for all adults 18–64. |
| Mammogram (breast cancer screening) | B | Mammography screening for breast cancer every other year. Recommended for all women 40–74. |
| Cervical cancer screening (Pap smear / HPV test) | A | A Pap smear every 3 years, or an HPV test every 5 years (or both together) for women 30–65. Recommended for all women 21–65. |
| Colorectal cancer screening | A | Screening for colorectal cancer using one of several methods (colonoscopy, stool tests, etc.). Recommended for all adults 45–75. |
| Depression screening | B | Screening for depression, including during and after pregnancy. Recommended for all adults. |
| Hepatitis C screening | B | A one-time blood test to check for hepatitis C infection. Most people who have it don't know. Recommended for all adults 18–79. |
| Blood pressure screening | A | Blood pressure measurement to screen for high blood pressure. Recommended for all adults 18 and older. |
| HIV screening | A | Blood test to screen for HIV. Recommended for all adults and adolescents 15–65. Older adults at increased risk should also be screened. |
| Intimate partner violence screening | B | Screening for intimate partner violence (domestic violence) and referral to support services when needed. Recommended for all women of reproductive age. |
| Osteoporosis screening (bone density test) | B | A bone density scan to screen for osteoporosis and fracture risk. Recommended for all women 65 and older, and for younger postmenopausal women at increased risk. |
| Alcohol use screening and counseling | B | Screening for unhealthy alcohol use and brief counseling to reduce it. Recommended for all adults 18 and older. |
| Vision screening | B | Screening for vision problems in older adults. Recommended for adults 65 and older. |

---

### Conditional recommendations — description, condition note, and doctor prompt

| Name (plain) | Grade | Description | Condition note | Doctor prompt |
|---|---|---|---|---|
| Abdominal aortic aneurysm screening | B | A one-time ultrasound to check for a dangerous bulge in the main artery in your abdomen. Recommended for men 65–75 who have ever smoked. | Applies to men who have ever smoked (at least 100 cigarettes in their lifetime). | Ask your doctor: "I've smoked in the past — am I due for a one-time ultrasound to check for an abdominal aortic aneurysm?" |
| Low-dose aspirin to prevent preeclampsia | B | Low-dose aspirin (81mg/day) after 12 weeks of pregnancy to reduce the risk of preeclampsia in high-risk pregnancies. | Applies to pregnant people at high risk for preeclampsia. | Ask your doctor: "Am I at high risk for preeclampsia, and should I be taking low-dose aspirin during my pregnancy?" |
| Urinary tract infection screening during pregnancy | B | A urine culture to check for bacteria in the urine during pregnancy, even if there are no symptoms. | Applies to pregnant people only. | Ask your doctor: "Should I be screened for a urinary tract infection as part of my prenatal care?" |
| Genetic counseling for BRCA gene mutations | B | A risk assessment and, if indicated, genetic counseling and testing for gene mutations that significantly raise the risk of breast and ovarian cancer. | Applies to women with a personal or family history of breast, ovarian, tubal, or peritoneal cancer, or ancestry associated with BRCA1/2 mutations. | Ask your doctor: "Given my family history, should I be assessed for BRCA gene mutations?" |
| Medications to reduce breast cancer risk | B | Medications like tamoxifen or raloxifene that can reduce the risk of breast cancer in women who are at increased risk. | Applies to women at increased risk for breast cancer and low risk for adverse medication effects. | Ask your doctor: "Am I at increased risk for breast cancer, and would risk-reducing medication be appropriate for me?" |
| Chlamydia and gonorrhea screening | B | STI screening for chlamydia and gonorrhea. Recommended for sexually active women 24 and younger, and older women at increased risk. | Recommended for all sexually active women 24 and younger. Also recommended for older women at increased risk. | Ask your doctor: "Should I be screened for chlamydia and gonorrhea based on my age and sexual history?" |
| Diabetes screening | B | Blood sugar testing to check for prediabetes and type 2 diabetes. Recommended for adults 35–70 who are overweight or obese. | Applies to adults who are overweight or obese. | Ask your doctor: "Given my weight, should I be screened for prediabetes or type 2 diabetes?" |
| Fall prevention (exercise program) | B | Referral to exercise programs to prevent falls and fall-related injuries in older adults at increased risk. | Applies to community-dwelling adults 65+ at increased risk for falls. | Ask your doctor: "Am I at increased risk for falls, and should I be referred to a fall prevention exercise program?" |
| Folic acid supplement (pregnancy / birth defect prevention) | A | A daily folic acid supplement (0.4–0.8mg) to reduce the risk of neural tube defects in pregnancy. Recommended for people planning or capable of pregnancy. | Applies to people who are pregnant or planning to become pregnant. | Ask your doctor: "Should I be taking a folic acid supplement, and what dose is right for me?" |
| Gestational diabetes screening | B | Blood sugar screening to check for diabetes that develops during pregnancy, typically after 24 weeks. | Applies to pregnant people after 24 weeks of gestation. | Ask your doctor: "When should I be screened for gestational diabetes during my pregnancy?" |
| Healthy diet and exercise counseling | B | Behavioral counseling to encourage a healthy diet and regular physical activity in adults with cardiovascular risk factors. | Applies to adults with cardiovascular risk factors such as high blood pressure, high cholesterol, or mixed dyslipidemia. | Ask your doctor: "Do I have cardiovascular risk factors that qualify me for free diet and physical activity counseling?" |
| Hepatitis B screening | B | Blood test to screen for hepatitis B virus infection in adults at increased risk. | Applies to adults at increased risk (e.g., born in countries with HBV prevalence ≥2%, U.S.-born people not vaccinated as infants whose parents were born in high-prevalence regions, or HIV-positive individuals). | Ask your doctor: "Based on my background or risk factors, should I be screened for hepatitis B?" |
| Lung cancer screening (low-dose CT scan) | B | A yearly low-dose CT scan to screen for lung cancer in adults 50–80 with a significant smoking history. | Applies to adults with a 20 pack-year smoking history who currently smoke or quit within the past 15 years. | Ask your doctor: "Based on my smoking history, do I qualify for a yearly low-dose CT scan to screen for lung cancer?" |
| Weight loss counseling | B | Referral to intensive behavioral counseling programs to support weight loss in adults with obesity. | Applies to adults with a BMI of 30 or higher. | Ask your doctor: "My BMI is over 30 — am I eligible for free weight loss counseling or a structured program?" |
| Counseling to prevent perinatal depression | B | Counseling interventions to prevent depression during and after pregnancy for people at increased risk. | Applies to pregnant and postpartum people at increased risk for perinatal depression. | Ask your doctor: "Am I at risk for perinatal depression, and should I be referred to counseling during or after my pregnancy?" |
| PrEP (HIV prevention medication) | A | A daily medication (PrEP) that significantly reduces the risk of getting HIV. Recommended for adults at increased risk. | Applies to adults at increased risk for HIV acquisition. | Ask your doctor: "Based on my risk factors, should I be taking PrEP to prevent HIV?" |
| Skin cancer prevention counseling | B | Counseling about minimizing UV exposure to reduce the risk of skin cancer. Recommended for fair-skinned people up to age 24. | Applies to fair-skinned people aged 6 months to 24 years. | Ask your doctor: "Should I receive counseling about reducing my UV exposure and skin cancer risk?" |
| Statin medication (heart disease prevention) | B | A statin medication to prevent a first heart attack or stroke in adults 40–75 with cardiovascular risk factors. | Applies to adults with one or more cardiovascular risk factors (dyslipidemia, diabetes, hypertension, or smoking) and an estimated 10-year CVD risk of 10% or greater. | Ask your doctor: "Do I have enough cardiovascular risk factors to qualify for a free statin prescription under preventive care?" |
| Syphilis screening | A | Blood test to screen for syphilis. Recommended for adults at increased risk. | Applies to adults at increased risk for syphilis infection. | Ask your doctor: "Based on my sexual history, should I be screened for syphilis?" |
| Tobacco cessation counseling and medication | A | Counseling and medications to help quit smoking and other tobacco use. Recommended for all adults who currently use tobacco. | Applies to adults who currently use tobacco. | Ask your doctor: "I currently smoke — what free cessation counseling or medications am I entitled to?" |

---

## Badge labels

| Badge | Label |
|---|---|
| Grade A | Grade A |
| Grade B | Grade B |

---

## Notes on copy issues to revisit

- **"May also apply to you"** — passive and vague. Doesn't signal what the user needs to do to find out.
- **"Ask your doctor: '...'"** — the current doctor prompt format sounds scripted. Every conditional rec uses the same frame; consider context-specific language (e.g., "If you smoke", "If you're pregnant", "If your BMI is over 30") to lead instead.
- **"Covered for you" / "May also apply"** — the section labels don't convey why one group is certain and the other isn't. Could be clearer about what "may apply" actually means (depends on your health history, not age alone).
- **Step 3 hint** — "since some depend on which organs you were born with" is explanatory but clinical. Worth a plain-language pass.
- **Results subhead** — "{n} apply based on your age alone" is accurate but cold. Could lead with the benefit, not the logic.
