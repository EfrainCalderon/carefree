# Claude Design prompt: Carefree chat components

How to use it:
1. In Claude Design, start a new design and attach these files from the repo: `src/tokens.css`, `src/lofi/index.css`, `components.json`, and a few screenshots of the lofi (`/lofi.html` at mobile, tablet, and desktop, plus `/lofi.html#/components`).
2. Paste the prompt below.
3. Iterate on visual direction there (type, color, density, card styling). Keep the component names the same as the code so they map 1:1.
4. Bring decisions back as tokens first (Tokens Studio → `tokens/tokens.json` → `npm run tokens:build`), then component changes in `src/lofi/widgets.jsx`. The shadcn theme variables already point at `--cf-*` tokens, so most visual changes should be token changes, not component rewrites.

---

## Prompt

Design a component set and three key screens for **Carefree**, a chat-first web app that helps people (especially men 35–55 who avoid the doctor) find the preventive care their insurance already covers at $0, then leave with a 1-page visit plan they can email to themselves.

**Product principles**
- Organized around the visits a person actually makes (primary care checkup, lab work, imaging, colon cancer screening, pharmacy, coaching/program), not a list of benefits.
- Calm, plain-spoken, a little warm. Health without fear. No medical-grade-letter badges, no urgency colors.
- Conversation is tap-first: most answers are chips; free text is optional; voice is a disabled "coming later" mic.
- Personal questions come after the user sees value, behind one opt-in. Sensitive topics (sexual health) are a passive self-select card, never a question.
- The plan is a "checkout" you can pop in and out of: side panel on desktop (≥1024px), right sheet on tablet (768–1023px), bottom sheet on mobile (<768px).

**Built on shadcn/ui (radix-nova style)**, themed by the attached Carefree tokens (`--cf-*`). Use these semantic roles: background (neutral-100), card (neutral-0), primary (neutral-900), muted-foreground (neutral-600), border (neutral-200), success (grade-a green, for "$0" and "+ added"), info (grade-b blue), caution (amber accent for notes). Propose any missing tokens you need (radius, shadow, spacing for chat, a warmer accent) as named tokens, not one-off values.

**Components to design (all states: default, hover, focus-visible, pressed, disabled, loading where relevant)**
1. `Bubble`: assistant and user message bubbles.
2. `Typing`: typing indicator.
3. `Chips`: tap-to-answer options (e.g. age ranges `Under 25 · 25–34 · 35–39 · 40–44 · 45–49 · 50–64 · 65–75 · 76+`). Show unanswered, selected, and locked-after-answer.
4. `Composer`: text field + disabled mic + send. Include empty, typing, and disabled send.
5. `OutputPreview`: "You'll leave with a 1-page visit plan" with a tiny document thumbnail.
6. `StatCard`: one big number + sentence + action line + small source.
7. `PlanSnapshot`: compact in-chat plan summary (numbered visits with item counts, "Open your plan").
8. `OptInCard`: "A few quick questions could add up to N more free screenings" with Improve / I'm good.
9. `AddedLine`: "+ Diabetes screening added" feedback after an answer; also a "no change" variant.
10. `SexualHealthCard`: passive self-select list with "Add these tests" / "Not for me".
11. `MentalHealthCard`: "Your doctor will likely ask how you've been feeling" with example questions.
12. `DoctorFinderCard`: ZIP input → 3 nearby community health centers (name, distance, sliding-scale label, Call button), plus empty, loading, and "nothing within 25 miles" states.
13. `NoteCard`: insurance-specific note (Medicare, Medicaid, uninsured).
14. `VisitCard`: collapsible visit with numbered badge, who you'll see, list of "what happens / what to ask for" items, booking tip, coverage line.
15. `AskDoctorList`: items that might apply, with the condition in plain language.
16. `EmailPlanForm`: email input + send, with success and error states.
17. `PlanPanel`: the full plan container (visits, ask-your-doctor, email), including the empty state before any answers.

**Screens**
- Mobile (390×844): conversation mid-flow, and the plan bottom sheet open.
- Tablet (834×1194): conversation with the plan right sheet open.
- Desktop (1440×900): conversation with the persistent plan side panel.
- Plus the emailed 1-page plan (what lands in the inbox), structured by visit.

**Example user to fill content:** Marcus, 47, male, insurance through his job, no regular doctor. His plan: Primary care checkup (blood pressure, mood and stress questions, alcohol questions, pick a colon test, HIV and hepatitis C test orders), Lab work (blood draw), Colon cancer screening (at-home kit or colonoscopy). Ask your doctor: statin, diabetes screening, diet counseling.

**Accessibility:** WCAG AA contrast (don't use neutral-500 for text on white), 44px minimum touch targets, visible focus rings, never color alone for meaning, respects reduced motion.

Deliver: a component sheet with every component and state, the four screens, and a short list of proposed new tokens with values.
