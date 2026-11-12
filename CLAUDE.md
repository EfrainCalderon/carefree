# Carefree — Project Context for Claude

## What this is
A single-page React app that asks users 3 questions (insurance type, age, sex assigned at birth) and returns a personalized list of U.S. Preventive Services Task Force (USPSTF) A & B grade preventive health screenings they qualify for. Built as a portfolio piece by a product designer demonstrating design systems technical fluency.

## Tech stack
- **Vite + React** — no framework, plain JSX + CSS modules
- **Storybook 8.6.14** — component explorer, hosted on Chromatic
- **Style Dictionary 4.x** — converts design tokens to CSS custom properties
- **Tokens Studio for Figma** — manages design tokens in Figma, syncs to GitHub
- **Chromatic** — hosts Storybook, used with Storybook Connect Figma plugin
- **Vercel** — hosts the live app (auto-deploys from GitHub main)

## Design token pipeline
This is the core of the design system setup. The flow is:

```
Figma (Tokens Studio plugin)
    ↓  push via Tokens Studio GitHub sync
tokens/tokens.json  ← source of truth for all design decisions
    ↓  npm run tokens:build  (Style Dictionary)
src/tokens.css  ← CSS custom properties, auto-generated, do not edit manually
    ↓
Every component CSS file reads from --cf-* variables
```

### Scale: base 8, 16px minimum (Nov 2026)
Less but better: only the tokens the app uses, every value a multiple of 8.
- **Spacing:** `spacing.1–6, 8` = 8–48, 64. Tailwind's `--spacing` is set to `--cf-spacing-1` (8px), so the class number is the token number: `p-2` = 16, `gap-3` = 24. Avoid half steps (`p-0.5`); the only one in use is the document thumbnail drawing in OutputPreview.
- **Insets:** cards 16 (`p-2`), gradient surfaces (StatCard, plan header) 24 (`p-3`), controls and bubbles 16 left and right, list rows 16 top and bottom, pills 32 tall with 16 left and right. Gaps: 8 inside a group, 16 between groups, 24 between sections and between chat speakers.
- **Sizes:** controls and touch targets 48 (`min-h-6`, `size-6`), pills 32, icon tiles 24 (= one line of text, so no alignment offsets), icons 16 (24 in the composer). Bubble heights land on 8 (40, 64, 88…); the assistant bubble draws its border inside (`shadow-[inset_0_0_0_1px_var(--border)]`) to keep that.
- **Type:** Red Hat Text 400/600/700 only. Four sizes: body 16/24, heading 20/24, title 24/32, display 40/48 (`text-body`, `text-heading`, `text-title`, `text-display`). Tailwind's default sizes and `leading-*` are cleared in `src/app/index.css`, so 12–15px classes no longer exist. Secondary text is set apart by color and weight, not size. `.cf-label` is 16px semibold green-600.
- **Radius:** sm 8 (controls, bubble tails), md 16 (cards), lg 24 (bubbles, sheets, composer), full (chips, pills).
- **Why Red Hat Text:** Red Hat replaced Overpass with it, so it's the closest relative. Unlike Overpass, its capitals sit centered in the line, so text centers in bubbles and buttons with plain padding (measured within 0.2px). The old metric overrides and `text-box-trim` hacks were removed.

### Token naming convention
All CSS custom properties are prefixed `--cf-` (for Carefree).
Examples: `--cf-color-neutral-900`, `--cf-spacing-4`, `--cf-border-radius-lg`

### Key Style Dictionary config notes (sd.config.js)
Tokens Studio wraps all tokens in a named set called `"global"`. The config uses a custom `name/kebab-no-set` transform to strip that wrapper so variable names stay clean (no `--cf-global-` prefix). A custom `ts/size/px` transform adds `px` to bare numeric spacing/borderRadius/fontSize values.

### When tokens change in Figma
1. Designer pushes from Tokens Studio (writes a commit message, creates a GitHub commit)
2. `git pull origin main` locally
3. `npm run tokens:build` — regenerates `src/tokens.css`
4. Commit and push `src/tokens.css`

## Component structure (updated Nov 2026: the chat became a short form + plan page)
```
src/
  app/
    main.jsx        — entry: loads data, renders App
    App.jsx         — one page: the answer panel beside (or above) the plan it changes; browser Back/Forward and saved answers; only composes components
    logic.js        — plan logic: age ranges, questions, buildPlan, derivePlan, coverage line, insurance notes, find-a-doctor copy, cleanAnswers. No React and no `@/` imports, because api/send-plan.js imports it too
    index.css       — Tailwind + shadcn theme variables mapped to --cf-* tokens; .cf-rise (staged reveal), .cf-collapse, print styles
  components/
    ui/             — shadcn/ui primitives in use (button, input, label, popover), restyled to Direction D; stories for the main ones
    chat/<Name>/    — one folder per component: <Name>.jsx + <Name>.stories.jsx (folder name is historical; stories are under Form/ and Plan/)
    chat/index.js   — exports every chat component (the app imports from '@/components/chat')
    chat/fixtures.js — story sample data (Marcus 47M private, Marcus after the extra questions, Linda 67F Medicare, Sam 29M uninsured) built with derivePlan
  lib/              — utils (cn), visits.js (groupByVisit, visitGroups), terms.js (glossary + [[term]] markup), planEmail.js (the email), useLoaded.js
  stories/          — Introduction.mdx, Foundations (color, type, shape), Email (the emailed plan at phone and desktop width)
  tokens.css        — AUTO-GENERATED by Style Dictionary, do not edit manually
api/send-plan.js    — emails a plan: takes an address and the answers, rebuilds the plan server-side, sends with Resend
scripts/email-preview.mjs — writes sample emails to dist/email/ without sending
```
Rule: the app never styles things inline that a component should own. New UI = a component folder with a story.

## Recommendation data
`public/data/recommendations.json` — must be in `public/` for Vite to serve it at `/data/recommendations.json`. The app fetches it at runtime. Do not move it.

Filtering and plan logic is in `src/app/logic.js` (`eligibleRecs`, `buildPlan`, `derivePlan`).

## Storybook + Chromatic
- Every component has a `.stories.jsx` file alongside it. Storybook loads the app theme (`.storybook/preview.jsx` imports `src/app/index.css`, which also loads the self-hosted fonts).
- Storybook is hosted on Chromatic (free tier): https://main--6a028d420ec59b7bb3bbaa5e.chromatic.com/ (always the latest build on main) (project: https://www.chromatic.com/setup?appId=6a028d420ec59b7bb3bbaa5e)
- Storybook Connect Figma plugin links Figma components to live Chromatic stories
- To republish Storybook after component changes: `npm run chromatic`

## Figma setup
- Tokens Studio plugin manages the token set named `"global"`
- Tokens exported to Figma native Variables via Tokens Studio → Export Styles & Variables
- Storybook Connect plugin installed and authenticated with Chromatic
- html.to.design was used to import an initial visual layer from the live Vercel URL

## Commands
```bash
npm run dev              # local dev server at localhost:5173
npm run storybook        # Storybook at localhost:6006
npm run tokens:build     # regenerate src/tokens.css from tokens/tokens.json
npm run email:preview    # write sample plan emails to dist/email/ (nothing is sent)
npm run chromatic        # publish Storybook to Chromatic
npm run build            # production build
```

## Key decisions made
- **Plain CSS over CSS-in-JS** — keeps token integration simple, no extra tooling
- **Tokens Studio format** — uses legacy (non-W3C DTCG) Tokens Studio format; tokens.json has a `"global"` wrapper that Style Dictionary strips at build time
- **No component library** — components are hand-built to keep the token-to-component relationship transparent and easy to understand
- **Storybook pinned to 8.6.14** — all @storybook/* packages pinned to exact same version to avoid peer dependency conflicts

---

## Where v1 landed (as of Oct 2026)
Things built after the original setup above, so the structure section is a bit out of date:
- **Audience:** men (roughly 35–55) who haven't seen a doctor in years and don't know what preventive care the ACA already covers at $0. Goal is: show what's available → explain each briefly in plain language → build a plan they can take to a doctor.
- **Results evolved** through several explorations (`src/exploration/` — ResultsR1–R3, ResultsV2, category grid + "claim" cards with an unlock mechanic). Grade A/B badges were dropped from results because they imply a priority USPSTF doesn't intend. See `carefree prd.md` for the reasoning.
- **"Your Plan" system:** `PlanBar` (persistent bar at top) + `PlanSheet` (the plan view). Users "claim" screenings into a plan.
- **Share + email:** plans can be shared via `?plan=` URL links (handled in `App.jsx`), and emailed via `api/send-plan.js` (Vercel serverless function using Resend, `RESEND_API_KEY`). Email splits items into "schedule this" vs "ask your doctor" (`conditional`).
- **Data:** `public/data/recommendations.json` — 32 USPSTF A/B recs, each with `plain_name`, `description`, `doctor_prompt`, `condition_note`, frequency, age/sex eligibility.
- **Copy & hooks docs:** `copy.md`, `copy_v2.md`, `hooks.md`, `hooks_v2.md`.

## Next direction: chat-first redesign (not started — exploring)
Restarting the project as a **chat-first experience**, possibly with **voice**. Nothing built yet; this is the brief to iterate from.

**Core idea**
- The user talks (text or voice) instead of filling a 3-step form. The assistant gathers the same inputs conversationally (insurance type, age, sex at birth) and can pick up extra context that currently becomes "ask your doctor" (smoking history, family history, etc.).
- **Responses aren't just text.** The assistant renders **cards/widgets inline in the conversation** — screening cards, short explainers, "add to plan" actions — similar to how efrain.fm uses widgets rather than plain text bubbles.
- **Plan as a "checkout":** a plan view the user can pop in and out of at any time (drawer/sheet/cart pattern) showing what they've added. From there they can **email the plan to themselves** to book care.

**What carries over from v1**
- `recommendations.json` as the source of truth (the assistant should only surface recs from this data, never invent medical guidance).
- Existing card thinking (RecCard / claim cards), PlanBar/PlanSheet as the starting point for the checkout UI.
- `api/send-plan.js` email flow and `?plan=` share links.
- Design token pipeline (Tokens Studio → Style Dictionary → `--cf-*`) and Storybook — new chat widgets should be components with stories like everything else.
- Plain-language, low-pressure tone; no grade-based priority signals; "schedule this" vs "ask your doctor" framing.

**Open questions to work through together**
- Fully conversational vs. hybrid (chat with quick-reply chips/buttons for the 3 core inputs)?
- Voice: input only (speech-to-text) or full voice conversation? How do cards show up during a voice exchange?
- Which LLM/backend, and how to constrain it to the dataset (tool calls that return structured cards rather than free text)?
- Widget set: which card types are needed (screening card, explainer, eligibility check, plan summary, email confirmation)?
- How does the checkout feel on mobile vs desktop — slide-over drawer, bottom sheet, side panel?
- Privacy: no accounts in v1; keep it that way? What gets stored or sent to the LLM?

## Information architecture: organized by visit, not by test (decided Oct 2026)
People think in terms of appointments ("go see my doctor"), not lists of USPSTF tests. So the plan is organized around **the visits a person actually makes**, and each screening explains what happens at each one.

**Data**
- `public/data/visits.json` lists the visit types in display order: primary care checkup (the hub), well-woman, prenatal, lab work, imaging, colon cancer screening, pharmacy pickup, coaching/program, and genetic counseling. Each has `who`, `description`, `booking_tip`, and `coverage` copy.
- Each rec in `recommendations.json` has a `journey`: ordered steps of `{ visit, as, action, also_at? }`.
  - `as` is what happens at that step: `question | measurement | exam | lab | order | prescription | counseling | procedure`. Use it to show what will be asked, measured, or ordered at a visit.
  - Example: lung cancer has a conversation at primary care, then a low-dose CT at imaging. A statin has a lab test, then a primary care conversation, then a pharmacy pickup.
- `src/lib/visits.js` → `groupByVisit(recs, visits)` turns filtered recs into visits with `items: [{ rec, step }]`. A rec can appear in more than one visit.
- Primary care is the hub. Most recs start there, and it's where follow-on visits get ordered.

**Mental health screeners (one-way rule)**
- Depression, anxiety, and alcohol recs carry a `screener` field: PHQ-2→PHQ-9, GAD-2→GAD-7, AUDIT-C→AUDIT. Start with the short version and expand only if it flags something.
- **A score can only raise the signal, never lower it.** A high score means "worth bringing up", with a doctor prompt and an option to include the score in the emailed plan. A low score means "your doctor will likely ask about this, and now you know what to expect". Never say "you can skip this". These screenings ride along with the checkup anyway, so a low score doesn't save a visit, and this audience already avoids care. `screenerSignal()` encodes this.
- PHQ-9 item 9 (self-harm) needs a crisis path (988) designed before shipping.
- Keep screener answers on the device. Don't send them to an LLM.
- PHQ and GAD are free to use; AUDIT is from the WHO.

**Coverage facts to keep straight**
- Adult skin cancer *screening* (dermatologist skin check) is USPSTF grade **I**, not A/B, so it isn't free under these rules. Only sun-safety counseling for ages 6 months–24 years (fair skin) is grade B. There's no dermatologist visit in the model.
- **Verify:** `vision-screening-adults` is marked grade B in the data, but USPSTF rates vision screening in older adults as **I** (2022). It's likely the rec should be removed. Not changed yet.
- Bringing up a new problem during a preventive visit can make that part billable. Surface this as a booking tip, not a scare.
- `journey.action` and `visits.json` copy are first drafts. Run them through a copy pass (see copy_v2.md tone).

## UX review findings (Oct 2026)
From a walkthrough of the live app as Marcus (47M, employer insurance) on mobile. Current app: **6/10**. Content and tone are strong; the weak points are the ending (the plan) and accessibility.

**Core insight:** the user's job isn't "learn about 15 screenings", it's "book one checkup and know what to say". Organizing by visit serves that.

**Keep:** the "Ask:" doctor scripts (the strongest part), "$0 with most insurance" plus short hooks, the respectful sex-at-birth explainer, the persistent plan count, and email and link sharing.

**Fix in the current app**
- Critical: the results headline "7 covered benefits you haven't used" assumes facts. Try "7 free screenings you qualify for", and avoid "benefits" (insurance jargon).
- Critical (a11y): category tiles and the Email and Copy Link buttons have no accessible name. Insurance and sex OptionCards aren't keyboard-focusable (they render as divs). The AgeInput label is "—".
- Critical: category subtitles are static. The Cancer tile says "Colorectal · Lung · Skin" for a user with 1 item, and "Skin" implies an uncovered skin check. Build subtitles from the user's own items.
- Doctor prompts assume facts ("My BMI is over 30 —"). Make them conditional ("If my BMI is over 30…").
- PlanSheet is a flat checklist with no visit, script, or booking step. It's the last screen people see, so it matters most.
- 15 equal-weight "+ Add to plan" buttons is too many decisions. Pre-include items that happen automatically at the checkup; only optional items need a choice.
- Category grid vs visit IA conflict: make visits the main structure, categories as tags.
- "My situation is different" ends in a soft exit. Uninsured men are core to the audience; route them to community health centers and free screening programs instead.

**Chat-first opportunities**
- Use chat to resolve the conditional ("ask your doctor") items with 3–4 light questions (ever smoked? weight? family history?), turning maybes into yeses. This is the strongest case for chat over a form.
- Hybrid input: chips for the 3 basics, free text optional.
- Ask "Do you have a primary care doctor?" and help find an in-network one. Likely the biggest real-world blocker.
- End with a booking kit: call script, visit itinerary, calendar reminder (.ics), and a printable sheet for the doctor.
- Voice stays optional. Sensitive questions (HIV, alcohol, IPV) and screeners are always tap-based.
- Trust: "Source: USPSTF" on cards. The LLM only shows cards built from our data and never writes coverage claims itself.
- Biggest risk: chat feels like a slower form. Success = fewer total decisions to a finished plan than v1.

**Tests to run**
- 5-second test on the results headline.
- Chat prototype vs the current flow with 5 men aged 35–55: time to plan, and "would you book this?"
- Riskiest assumption: that users have a primary care doctor to book with.

## Decisions: age ranges and visit-first framing (Oct 2026)

**Ask age as tap-to-pick ranges, not an exact number** (superseded Nov 2026: age is now one typed number field, `AgeInput`, mapped to these ranges; eight chips were too many at once. Only the range is kept, never the exact age.)
- Checked against recommendations.json (ages 18–90): results only change at a few cutoffs. Men have 6 distinct ranges (12 including conditional items); women have 9 (14). The main cutoffs are 35 (diabetes), 40 (statins, mammogram), 45 (colorectal), 50 (lung), and 65.
- Chips: `Under 25` · `25–34` · `35–39` · `40–44` · `45–49` · `50–64` · `65–75` · `76+`
- Single-year edges (HIV through 65, diabetes through 70, hep C through 79, lung through 80, etc.) go in card copy ("recommended through age 70") instead of extra chips.
- Bonus: we never collect an exact age or birth year (privacy and trust).
- When implementing, filterRecs needs to work with a range. Decide how a rec that starts or ends mid-range shows up (e.g. include it with edge copy).

**Visit-first framing is the core of the product**
- Lead with the visit to book, who to see, what they'll check, and what to ask for. Don't lead with a breakdown of every covered benefit.
- Screenings like blood pressure, mood, anxiety, and alcohol aren't booked on their own. They happen inside the checkup, so the checkup is what the user books.
- The annual checkup isn't itself a USPSTF recommendation. It's the container. Most ACA plans cover one preventive visit a year at $0 (well-woman visits are covered by law).
- Secondary visits branch off the checkup: lab, imaging, colon test, pharmacy, programs. A few can happen without the checkup (self-referred mammograms, walk-in HIV/STI testing, pharmacy pickups), so show these as "can also do directly" rather than hiding them.
- Plan shape: "Book a preventive visit with a primary care doctor → here's what they'll check → here's what to ask for → here's what may come after."

## Decision: sexual health is a passive, self-select card (Oct 2026)
- Covered items it unlocks: PrEP, syphilis, and hepatitis B (men and women), plus chlamydia/gonorrhea (**women only**; USPSTF rates screening men as "I", so it isn't free for men). HIV testing is universal ages 15–65 and is already a regular checkup item. No question needed.
- No questionnaire. Show one card listing behavior-based risk factors (new or multiple partners, inconsistent condoms with partners of unknown status, a recent STI, a partner with HIV or hep B, sex with men (for men), shared needles). Buttons: "Add these tests to my plan" / "Not for me". The app never records which factor applies.
- Place it near the end of the journey (in or next to the plan), never as an upfront question.
- Doctor script stays general: "I'd like to talk about STI testing and whether PrEP makes sense for me."
- Never use race or ethnicity as a risk question, even where USPSTF prevalence data mentions it.
- Hep B "born in or parents from a high-prevalence country" is a separate, non-sexual question.

## Decision: question order (Oct 2026)
Principles: easy questions to personal ones; show value before asking for more; one opt-in instead of many "prefer not to say" answers; only ask what changes this person's plan.

1. **Easy questions (chips):** age range → sex at birth → insurance. Age first is a warmer opener than insurance; the trade-off is that the Medicare/Medicaid soft exit comes one question later.
2. **Motivating stat moment** (see below), right after age + sex.
3. **Logistics:** "Do you have a primary care doctor?" If no, the plan includes a find-a-doctor card.
4. **Show the plan:** checkup plus what's covered.
5. **One opt-in:** "3 quick questions could add up to N more free screenings." [Improve my plan] / [I'm good]
6. **Personal questions, least to most sensitive, only if relevant to age/sex:** heart (told BP/cholesterol is high?) → smoking → weight → family history (women) → pregnancy (women in range, opt-in). After each answer, show what it added ("+ Diabetes screening added to your checkup").
7. **Passive cards at the end:** sexual health self-select card, mental health "know what they'll ask" preview.
- Fallback: anything skipped stays as an "ask your doctor" card with a "does this apply to me?" toggle. Skipping never loses anything.
- Example (Marcus, 47): 45–49 → Male → Employer → no doctor → plan → Improve → heart: not sure → smoking: quit 8 yrs ago → weight: a bit over → "+2 added" → sexual health card. About 7 taps.

## Direction: tell people what they'll get up front
- On the first screen, show what they'll leave with, e.g. "You'll get a 1-page visit plan: what to book, what to say, what's covered. Email it or save it." A small thumbnail of the plan/email helps; people commit more when they can see the finish line.
- Repeat it at the opt-in ("…added to your emailed plan") and on the plan view.
- The email itself should mirror the visit structure: the visit to book, a call script, what they'll check, what to ask for, then follow-on visits.

## Direction: one motivating stat, matched to age and sex
- Show **one** stat right after age + sex, matched to the screening that matters most for that person. Never stack stats.
- Rules:
  - Gain-framed and tied to an action ("a blood test finds it"), not fear.
  - Cite the source in small print.
  - **Avoid "most men skip this" framing.** Telling people that most others skip something makes skipping feel normal (descriptive-norm backfire). Use "most who have it don't know" instead, which is about hidden risk, not other people's behavior.
- Draft stat per age band (men). **Verify every number before shipping:**
  - 18–34: blood pressure. Nearly half of U.S. adults have high blood pressure, often with no symptoms (CDC).
  - 35–44: prediabetes. About 1 in 3 adults have it, and more than 8 in 10 of them don't know (CDC).
  - 45–49: colorectal. Screening now starts at 45. Found early, about 9 in 10 people are alive 5 years later (ACS). A home test counts.
  - 50–64: colorectal, or lung for smokers (annual low-dose CT cut lung cancer deaths by about 20% in the NLST trial).
  - 65+: heart disease is the leading cause of death for men (CDC); blood pressure and statin checks.
- **Fix before reusing old hooks (hooks_v2.md):**
  - "2.4 million Americans are living with hepatitis C and don't know it" mixes two numbers. About 2.4M have hep C, and roughly 40% of them don't know.
  - "Most cancers are 90%+ survivable when caught early" is too broad (true for colorectal and breast, not lung).
  - Check the "less than 40% found early" colorectal stat against current ACS data.

## Direction: support Medicare, Medicaid, and uninsured users (Oct 2026)
The v1 soft exit for non-private insurance was too cautious. All three groups can get a plan; only the coverage rules and visit names change. **Everything below is from memory. Check it against medicare.gov, Medicaid.gov, and state sources before building.**

**Medicare (most people 65+)**
- One national list: Part B covers preventive services at $0 when the provider accepts assignment. Same in every state.
- Large overlap with USPSTF A/B: colorectal (incl. follow-up colonoscopy after a positive stool test), mammogram, cervical, lung LDCT, AAA (one-time, with referral), diabetes, CV blood tests, hep B/C, HIV, STI, depression, alcohol, tobacco cessation, bone density, obesity counseling, PrEP, vaccines.
- Differences: yearly PSA prostate screening is covered (not USPSTF A/B). Medicare Diabetes Prevention Program. Statins are Part D, so not automatically $0. Glaucoma exams have cost sharing.
- **Visit names differ:** Medicare does not cover an "annual physical". It covers a "Welcome to Medicare" preventive visit (first 12 months) and then a yearly **Annual Wellness Visit**. The plan must say "book an Annual Wellness Visit" to avoid surprise bills.
- Likely fewer questions (age is already 65+, no state variation).

**Medicaid**
- ACA expansion adults (about 40 states + DC) get USPSTF A/B services at $0, the same list as ours.
- Traditional Medicaid categories usually cover them too (states get a funding incentive), but it varies by state. Adult ACIP vaccines are $0 in Medicaid.
- Ask "What state are you in?" (people don't know whether they're in the "expansion" group), then label: "Your state covers these" vs "Likely covered, call the number on your card to confirm".

**Uninsured**
- Don't exit. Point to community health centers (sliding-scale fees), local health departments (often free HIV/STI/hepatitis testing), and state breast and cervical cancer screening programs (CDC-funded).

**Data model**
- Add per-insurance coverage to each rec (private / medicare / medicaid / uninsured-resource), and per-insurance visit names in visits.json (e.g. primary-care → "Annual Wellness Visit" for Medicare).
- Question order and plan structure stay the same.

## Idea: nearby community health center finder by ZIP (Oct 2026)
**Set aside (Nov 2026)** for the MVP: provider data goes stale, and keeping our own copy fresh is ongoing work. `FindDoctorCard` gives text plus at most one link out, picked by `findDoctorVariant(insurance, doctor)` in logic.js: insured + doctor → no card; insured + no/not sure → call the number on your card and ask for in-network primary care doctors taking new patients (Medicare: 1-800-MEDICARE or the plan card); insurance not sure → the same, plus a link for if they have none; uninsured + no/not sure → HRSA's search (https://findahealthcenter.hrsa.gov/); uninsured + has a doctor → "If cost is a worry": ask the office the self-pay price, health centers as the fallback. Checked: HRSA's sites file (data.hrsa.gov, updated daily, has coordinates and phones) and the Census ZCTA file both download fine if we revisit this. Zocdoc's API is partner-only; HRSA's old embed widget is gone.

Turns "uninsured" and "no primary care doctor" from dead ends into a next step. Health centers take uninsured patients (sliding-scale fees) as well as Medicaid, Medicare, and most private insurance.

- **Data (verify):** HRSA's downloadable health center service delivery sites file (believed to be on data.hrsa.gov) has addresses, phone numbers, and lat/long. ZIP → lat/long comes from the Census ZCTA Gazetteer file (public domain). Ship both as static files, trimmed to the needed columns.
- **No server, no API key:** compute the nearest sites in the browser. The ZIP never leaves the device.
- **Fallback:** link to HRSA's "Find a Health Center" tool.
- **When to ask:** only for uninsured users or people with no primary care doctor, with the reason attached: "What's your ZIP? We'll find clinics near you. It stays on your device." Never up front.
- **Card:** 3 nearest (with "Show more"): name, distance, call button, address that opens in maps, "sliding-scale fees" label, plus the booking script ("I'd like to schedule a preventive visit. I don't have insurance.").
- **Edge cases:** rural users with a nearest center 30+ miles away still see it with the distance (mention telehealth). Refresh the data a few times a year and show "Updated [month]". Hours probably aren't in the federal data, so say "Call to check hours".
- **Later:** the same pattern for free HIV/STI testing sites (CDC locator), local health departments, and state breast and cervical cancer screening programs.

## Lofi branch: chat-first prototype (`lofi-chat`, Oct 2026)
- **Now the main app (merged to main, Nov 2026):** the chat is at `/`. The v1 app, its components and stories were removed (still in git history before Nov 2026). The old `#/components` showcase was replaced by Storybook; the header's Components link opens it. Old `/?plan=` share links no longer open a plan.
- Code: see Component structure above (`src/app/`, `src/components/chat/`).
- **shadcn/ui** (radix-nova, Tailwind v4) in `src/components/ui/`. Theme variables in `src/app/index.css` map to `--cf-*` tokens, so Tokens Studio still drives colors. Tailwind is scoped to the lofi entry. This departs from "plain CSS only" as an experiment.
- **React upgraded to 19 on this branch** because current shadcn components rely on React 19's ref-as-prop (React 18 broke Radix triggers and sheets). Storybook 8.6 is not yet verified on React 19.
- Superseded Nov 2026: no conversation, no text input, no voice. See "Form redesign" below.
- Stubs: email doesn’t send; stats are drafts marked "verify".
- Layout (superseded): the plan was a side panel / sheet. It's now its own page.
- Claude Design prompt for visual exploration: `docs/claude-design-prompt.md`.

## Design system: Direction D (Nov 2026)
- Visual direction comes from the Claude Design canvas (https://claude.ai/artifact/DQzzwp9nUYzRkBchKNfjfp). The Claude Design System built from this repo is https://claude.ai/artifact/BG8W22kCUQUcLo1P2befCJ; use it for future Claude Design work.
- Tokens in `tokens/tokens.json` (v1 neutral/grade tokens removed Nov 2026): `color.green` 50–950, `color.gradient`, `page`, `surface`, `border`, `feedback.error`; spacing, radius, type and size per "Scale" above; `boxShadow.sheet`; `chat` gaps 8/24; `size` touch 48 / plan 440; `motion` fast/base.
- `src/app/index.css` maps shadcn variables to the green tokens and adds Tailwind utilities (`bg-brand`, `bg-tint`, `border-outline`, `rounded-bubble`, `rounded-card`, `shadow-sheet`, …) plus `.cf-gradient`, `.cf-gradient-bubble` and `.cf-label`. Red Hat Text is self-hosted (`src/assets/fonts/`, @font-face in `src/app/index.css`). See "Scale" above.
- Still shadcn/ui: the base components in `src/components/ui/` (button, input, card) were restyled to Direction D states (48px targets, 2px green-900 focus ring, pressed scale .98).
- One color only: success/info/caution all map to greens. No grade colors in the chat UI.
- The design system's component previews are static, hand-written renditions; if the React components change, update the system too.

## Feedback round (Nov 2026)
- **Pacing:** (superseded by the form redesign below)
- **Stat removed from the flow:** a stat between questions felt random. `StatCard` stays in the library for later.
- **Naming:** the primary care visit is "Preventive care visit", who = "Your primary care provider". These are the words people use when booking.
- **VisitCard:** collapsed by default. Items are grouped by kind (Questions, Checks, Tests, Choices, Prescriptions) instead of per-item labels; 40px icon tiles; hover darkens the border (no fill). Visits can carry a `coverage_tip` (lab work: not every blood test counts as preventive, e.g. vitamin D).
- **Ask your doctor** only shows if the user answered the extra questions, and lists name + doctor prompt only.
- **Header:** "Carefree" wordmark, no Components link.

## Form redesign (Nov 2026)
Chat input wasn't adding anything, and once the plan exists there's no reason to look back at the conversation. So Carefree is now a short form that ends on a plan page.
- **Flow:** start screen → age, sex, insurance, doctor (one per screen, a tap answers and moves on, Back on every step) → "Want a more accurate plan?" → Yes: the extra questions (personal questions, then the sexual health list) → plan. No: straight to the plan, with the same offer ("Make your plan more accurate") at the very bottom. Improving from there returns to a revised plan.
- **Progress:** segmented bar above each question. Finished steps are green-800, the current one green-300. The basics ("About you", 4) and the extra questions ("Improve your plan") each get their own bar.
- **Plan page:** header, insurance note and how to find a doctor (FindDoctorCard), a lead line ("Start with visit 1…"), visit cards, ask-your-doctor (only after the extra questions), then email. "Start over" in the top bar.
- **Motion:** the only animation is the plan reveal. Once fonts load and the page paints, sections fade up one by one (`.cf-rise`: 700ms, 24px, 150ms apart), email last. Reduced motion shows everything at once. No nudge, no panel animation.
- **Dropped:** the mental health "what they'll ask" card ("Two more things for your visit"). Telling people who to see is enough; the doctor handles the questions.
- **Copy:** well-woman visit is "An OB-GYN" (not "or your primary care doctor", which confused). Per-card coverage lines are gone (repetitive); coverage facts live in one place: the plan header ($0 in-network) and an insurance note (Medicare: "free when your doctor accepts Medicare"; uninsured). Visit-specific gotchas stay as tips (lab: vitamin D; imaging: screening vs symptoms). The lab "fast beforehand" tip was removed (the lab's job).
- **Components:** StartScreen, Progress, QuestionStep, OptionList, PlanView are new. Removed: Bubble, Typing, Composer, Chips, AddedLine, MentalHealthCard, SexualHealthCard (now a QuestionStep with `details`), PlanSnapshot, PlanPanel, ui/sheet, ui/badge. OptInCard is now the bottom-of-plan offer. StatCard is kept but unused.
- **Unused tokens to prune in Tokens Studio:** `chat` gaps, `size.plan`, `boxShadow.sheet`.


## UX pass (Nov 2026, branch `ux-iteration`, not merged)
A pass for cognitive load, fewer steps, and working equally well on a phone and a computer. Supersedes the parts of "Form redesign" it touches.

**Flow: 3 taps to a plan**
- Start → age → sex → insurance → plan. The opt-in screen and the "do you have a doctor?" question are gone.
- The offer to answer more questions ("Up to N more could be free for you") sits on the plan, after the visits and before email, so people see value before they're asked for more. After the extra questions, a note says what was added ("Added from your answers: …").
- Find-a-doctor help is a disclosure inside the first visit ("No doctor yet? Find one"), chosen from insurance alone (`findDoctor` in logic.js). Without insurance it starts open ("Where to go without insurance").
- **Rule: one option per different outcome.** If two answers lead to the same plan, they are one answer. Insurance went from 7 options to 5 (job, healthcare.gov, a family member's plan and TRICARE are one option with a hint line). "Not sure" stays wherever it changes the plan (heart, family history).
- **Age is tap-to-pick again, 7 ranges in a 2-column grid** (`18–34`, `35–39`, `40–44`, `45–49`, `50–64`, `65–75`, `76 or older`). Supersedes the typed age field. Every cutoff inside the core audience (35, 40, 45, 50) keeps its own range; under 35 is one range and its few edges show as item notes ("Starts at age 21").

**Plan page**
- Two sections replace the lead-in sentence and the 1–4 numbering: **Start here** (visits you book: `kind: "book"` in visits.json) and **What may come after** (`kind: "follow"`). Only the first visit has an order, so numbers became one icon per visit type (`VisitIcon`).
- The header is three lines: "Your plan", the one thing to do ("Book 1 visit. The rest follows from it."), and the cost line (`COVERAGE` in logic.js). Cost is stated there and nowhere else; Medicaid, not-sure and uninsured get one extra note.
- The first visit starts open. A card follows the order things happen: **how to book** (script, find-a-doctor) → **what to say and expect** → **one "Good to know"** about cost. Booking info used to sit under the list.
- **One point of view per group.** The group label carries the verb and each row is a short noun phrase: "Ask for" (An HIV test), "Talk about" (Whether PrEP fits you), "They'll ask about" (Mood and energy), "They'll check" (Blood pressure). What you need to say comes before what happens anyway. One icon per group, not per row. Follow-ups are one list ("Tests for", "Scans", "You choose", "To pick up"). `visitGroups` in lib/visits.js builds this; rows that read the same show once.
- "Ask your doctor about" is now a group on the first visit, "Ask if these apply to you", listing each item with who it's for (`applies` on the rec, plain language). `doctor_prompt` is no longer shown.
- **Who you're seeing:** every visit's second line starts with "With" or "At" ("With a primary care provider", "At home or a GI clinic"), kept short enough for one line at 375px.
- **Terms:** words like primary care provider, in-network, referral, GI clinic, PrEP, statin open a short definition on tap, click or Enter (`Term`, Radix Popover; never hover-only). Copy marks them with `[[double brackets]]`; definitions are in `src/lib/terms.js`. Use sparingly: a term gets a definition only if the plan needs the word.
- Renamed: "Colon cancer screening" visit → "Colon cancer test", "Coaching or program" → "Coaching program" (both fit one line on a phone).
- On screens 1024px and wider, email and print sit in a column beside the plan and stay in view. On a phone they follow the plan.
- Print: "Print or save as PDF" prints the whole plan with every section opened and no app chrome.

**Words**
- **Book, never schedule.** "Book" is the one verb for making an appointment, in the interface, in scripts and in the email. A "visit" is something you book; lab work, a home test kit and a pharmacy pickup are follow-ups, not visits.
- Start screen says each thing once: headline, one line on what it is, what you leave with, the button ("Build my plan"), one line of reassurance.
- Sexual health step: the title is the question ("Any of these true for you in the past year?"), each line leads with its key words in bold, and one line under the list says what "Yes" does. Answers: "Yes, add the tests" / "No, not for me".
- Wordmark: no "C" tile. "Care" regular + "free" bold, so the name reads both ways.

**Motion (attention, not decoration)**
- `.cf-rise` with `--i`: blocks arrive in reading order. Start screen: headline → what it is → what you get → button. Questions: the question a beat before its answers (quicker, 8px), which also makes it clear the screen changed when two questions share the same answers. Plan: header → notes → start here → after → offer → email.
- Reveals never wait on an animation frame (browsers pause frames in background tabs and embedded previews) and never hide content for more than half a second. Reduced motion shows everything at once.
- Visit cards and disclosures open by height (`.cf-collapse`); closed content stays in the page so it prints.

**Robustness**
- The browser's Back and Forward move between steps (a phone's back gesture no longer leaves the site). Answers are kept in sessionStorage for the tab, so a refresh, or coming back after a call to book, keeps the plan. "Start over" clears them.
- No horizontal scroll from 320px up; safe-area insets respected; long words wrap; headings use `text-wrap: balance`.
- Focus moves to the new question, and to the plan heading when the plan appears.

**Email**
- `src/lib/planEmail.js` builds the email (HTML + plain text) from a plan; the plan page preview, the Storybook story and `api/send-plan.js` all use it. It mirrors the plan page: header, Start here, What may come after.
- Built for every client: tables and inline styles, solid colors with a gradient as an extra, no images or web fonts (system font stack), 600px max, light-only, bullets as table cells, 15–41 KB (Gmail clips at 102 KB).
- The browser posts the address and the answers; the server rebuilds the plan (`cleanAnswers` → `derivePlan`), so the email can only contain a real plan.
- Running locally, Send shows a preview link instead of sending. **Not yet tested:** a real send through Resend, and rendering in real Gmail, Outlook and Apple Mail (run `npm run email:preview` and send the HTML through a testing tool).

**Tokens added** (in tokens.json; pull into Tokens Studio): `boxShadow.popover`, `motion.slow` (480ms), `motion.stagger` (80ms).

## Second round on `ux-exploration` (Nov 2026, after review; supersedes the "live plan" idea and parts of the UX pass)
The side-by-side live plan was dropped: showing a plan placeholder while asking questions told people about the tool instead of letting them use it. What stayed from it: the first question on the landing page, and marking what the extra questions added.

**Flow:** landing (headline + age) → sex → insurance → **the plan on its own page** → optional health questions → plan. "Change" on the plan walks back through all three questions with the old answers ticked. Browser Back works throughout; answers and checklist ticks are kept for the tab.

**Copy rules learned the hard way**
- Don't narrate the interface or coach behavior ("Three taps show you yours", "Your plan builds here", "One more answer shows what it costs", "Book 1 visit. The rest follows from it."). If a line only describes what the design already shows, cut it.
- **Schedule, never book** (reverses the UX pass). It's the word US doctor's offices use. The internal `kind: "book"` key in visits.json is unchanged.
- "Covered" means insurance coverage only. The checklist says "once you've talked about it".
- Medicare is "$0 **if** your doctor accepts Medicare", not "when".
- Privacy reassurance isn't on the landing page; it's one tap away in the footer (`PrivacyNote`).

**Insurance options depend on age** (`insuranceOptions` in logic.js), so nobody has to tell Medicare from Medicaid. Under 65: "Through work, or a plan I bought" (hint: a family member’s plan, healthcare.gov, TRICARE), Medicaid, none, not sure. 65 and older: Medicare first (hint: "Including Medicare Advantage"), work or bought plan, none, not sure. Program names carry no explanation: anyone who has one knows it. Known gap: people under 65 on Medicare through disability pick "Not sure".

**Plan page (Rams pass: less, and color only where it means something)**
- No header card. Plain "Your plan", the cost line, the answers in a few words with "Change", then one row of three actions: **Checklist, Email, Print**.
- Visit cards are **closed by default** and already carry the value: name, who, a summary ("3 to ask for · 4 routine checks · About 30 minutes"), and the "Good to know" tip, which shows open or closed. No "Start here" label; "What may come after" is a real heading.
- The whole card header toggles, including the icon and chevron (they let clicks through).
- The first time the plan appears, visits arrive one at a time over placeholder blocks (`useBuild` in PlanView: timers, never animation frames; skipped for reduced motion).
- **Dark green is used once**, on `FirstStep` at the end of the plan: "Schedule your preventive care visit", the script, and an answer for each thing that gets in the way: no doctor, no time, cost (`firstStep` in logic.js). Find-a-doctor help moved here from the first visit. Visit lengths (`time` in visits.json) and "the call takes about 5 minutes" are drafts: **verify**.
- `ChecklistView` is its own page, not a dialog. Ticking crosses a line out there and changes nothing in the plan.
- Email opens in a small dialog (`EmailDialog`); there's no "take it with you" card. The calendar reminder was removed.
- `PrintSheet` is a separate paper layout (9.5pt, two columns, no cards or color) that only exists in print; the screen layout is hidden when printing. The longest plan measured (7 visits) takes about 70% of one letter page.
- Buttons: outline hover fills with tint and darkens the border (more contrast than rest, not less). Tertiary actions are underlined text.
- Display type is 40/40 (was 40/48).

**Feedback and credit**
- `FeedbackButton` floats bottom right on every screen (a round icon on phones). Free text, anonymous, posted to `api/send-feedback.js`, which emails it to `FEEDBACK_TO`. **Set `FEEDBACK_TO` in Vercel's environment variables**; locally it's in .env.local.
- `SiteFooter` on every screen: "Carefree by Efrain Calderon" (links to efrain.design), "Buy me a coffee" (a plain link to buymeacoffee.com/efrainfm, not the floating widget, which would sit on the feedback button's corner and load a third-party script), and Privacy.

**Email**
- Mirrors the new plan: title, cost line, visit cards, then the dark first-step block.
- `npm run dev` now runs the functions in `api/` (a small plugin in vite.config.js), so Send and Feedback really send from localhost using .env.local.
- `npm run email:send -- you@example.com` sends three sample plans through Resend. Sent and accepted by Resend on Nov 12, 2026; how they look in Gmail, Outlook and Apple Mail still needs a human look.
- No rate limiting on either function yet.

**Removed:** AnswerPanel, PlanGhost, VisitSheet, ReminderLink, PlanHeader, FindDoctorHelp, OutputPreview. Unused but kept: NoteCard, StatCard.

## Third round on `ux-exploration` (Nov 2026): the plan is a timeline
Supersedes the plan-page parts of the second round (the dark first-step block, the Visits/Checklist switch, the checklist view, the barriers section at the end).

- **Why a timeline:** a hero block ranks things, and the plan isn't ranked. Lab work isn't less important than the visit; it comes later and because of it. Order in time carries the hierarchy.
- **Three steps** (`PlanStep`, in `PlanView`): **Now · about 5 minutes** (who to call, the script, three barrier links, "I've scheduled it"), **At your visit** (the visit cards, "I've had my visit"), **After, if your doctor orders it** (follow-up cards, "I've done these"). A finished step folds to one line with a check and reopens on tap; tapping any marker moves there. Progress (`at`) is kept with the answers, for the tab only. Step buttons are full width on a phone and right-aligned from 640px.
- **Finished state** (`PlanDone`): "You're done for this year", when the next visit is due (a year on), and a calendar file to be reminded. No reminder email: Resend can only schedule 30 days ahead, and a year-ahead email would mean storing addresses.
- **Dark green** appears only on the current step's marker and on `PlanDone`.
- **Who to call** is explicit (`call` in visits.json): "Call your primary care doctor to schedule a visit". Barriers (`Barriers`) are quiet links under the script that open a short answer.
- **Header:** title, cost line, answers with "Change", and Email and Print on the right (they act on the whole plan).
- **No on-screen checklist.** The printed plan has tick boxes beside everything to say at the visit.
- **Footer:** "Carefree by Efrain Calderon", "Privacy and sources" (privacy notes plus links to the USPSTF A and B list and HealthCare.gov's adult list), and a quiet "Start over" once there are answers. The coffee link is in the feedback dialog.
- **Coverage, checked against HealthCare.gov (Nov 2026):** a routine blood panel (CBC, metabolic panel, vitamin D) is not on the required $0 list, though many plans pay for it; the lab tip says so. **Cholesterol test added** as a default item for ages 40–75 (`cholesterol-screening`). **Still missing from Carefree:** vaccines and tuberculosis screening, both on HealthCare.gov's adult list.
- **Email** follows the same three steps and labels, without the rail or the buttons.
- **Request limits** (`api/_guard.js`): POST only, must come from Carefree's own pages, 10 KB cap, 5 calls an hour per visitor per function, 3 plan emails an hour per recipient, a hidden field that catches scripts in the feedback form. Counters are in memory, so they reset on restart and aren't shared between instances: **add a Vercel Firewall rate-limit rule on `/api/*`** (or a shared store) before real traffic.
- **View-control lesson:** a control that sits beside outline buttons should be built from the same parts (height, border, radius) and stay on the 8px grid.
