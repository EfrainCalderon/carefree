# Carefree

Carefree asks three questions (age, sex assigned at birth, insurance) and returns a plan for the preventive care a person can get at $0: who to call, what to say, what to ask for at the visit, and what may follow.

It's built for people who haven't seen a doctor in years, so the plan leads with one small action: a five-minute call.

By [Efrain Calderon](https://www.efrain.design). A portfolio project in product design and design systems.

## How it works

1. **Three questions**, one per screen. Each answer is a tap, and every option leads to a different plan.
2. **The plan**, as a timeline:
   - **Now:** who to call and the words to say, with short answers for what tends to get in the way (no doctor, no time, cost).
   - **At your visit:** what to ask for, what to talk about, and what they'll check anyway.
   - **After:** what your doctor may send you for, such as lab work or a scan.
3. **Take it with you:** email the plan to yourself, or print it. The printed plan fits one page and has boxes to tick at the visit.

A few optional health questions (smoking, blood pressure, weight) refine the plan. Tick steps off as you go; when they're all done, the plan says when the next visit is due.

## What the plan is based on

Only services that insurance plans must cover at no cost:

- [U.S. Preventive Services Task Force, A and B recommendations](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations)
- [HealthCare.gov, preventive care benefits for adults](https://www.healthcare.gov/preventive-care-adults/)

Carefree isn't medical advice. Not yet included from those lists: vaccines and tuberculosis screening.

## Privacy

There's no account. Answers stay in the browser tab and clear when it closes. Emailing a plan sends the answers once so the server can build it, and the address is used only for that email. Feedback is anonymous.

## Run it

```bash
npm install
npm run dev          # the app, at localhost:5173
npm run storybook    # every component, at localhost:6006
npm run build        # production build
```

Other commands:

```bash
npm run tokens:build              # rebuild src/tokens.css from tokens/tokens.json
npm run email:preview             # write sample plan emails to dist/email/ (sends nothing)
npm run email:send -- you@example.com   # send three sample plans through Resend
npm run chromatic                 # publish Storybook to Chromatic
```

### Environment variables

Set these in `.env.local` for local work and in the Vercel project for the live site:

| Variable | Used for |
| --- | --- |
| `RESEND_API_KEY` | Sending plan emails and feedback through [Resend](https://resend.com) |
| `FEEDBACK_TO` | The address that receives feedback |

`npm run dev` runs the functions in `api/` locally, so Email and Feedback really send from localhost.

## How it's built

- **Vite + React 19**, Tailwind v4, and [shadcn/ui](https://ui.shadcn.com) primitives.
- **Design tokens** live in `tokens/tokens.json` (managed in Figma with Tokens Studio) and are built into `src/tokens.css` by Style Dictionary. Everything is on an 8px grid with one green palette.
- **Storybook** shows every component with the same code and theme as the app.
- **Vercel** hosts the app and runs the two functions in `api/`.

```
api/                  send-plan.js, send-feedback.js, and shared request limits (_guard.js)
public/data/          recommendations.json and visits.json: the source for every plan
src/app/              App.jsx (the flow) and logic.js (how a plan is worked out)
src/components/chat/  one folder per component, each with its Storybook story
src/components/ui/    shadcn/ui primitives, restyled
src/lib/              the email builder, glossary, visit grouping
tokens/               design tokens
```
