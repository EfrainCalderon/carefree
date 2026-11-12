// VisitCard: One visit in the plan. Closed, it already gives the value: what it is, who it's with, how much
// is in it, how long it takes, and the one thing to know about cost. Open, it lists what to say and expect.
// Each group has one label that carries the verb ("Ask for", "They'll check"), so rows are short.
import { useId, useState } from 'react'
import { ChevronDown, CircleHelp, ClipboardList, Gauge, MessageCircle, MessageCircleQuestion } from 'lucide-react'
import { cn } from '@/lib/utils'
import { visitGroups, visitSummary } from '@/lib/visits'
import { Collapse } from '../Collapse/Collapse'
import { Script } from '../Script/Script'
import { RichText } from '../Term/Term'
import { VisitIcon } from '../VisitIcon/VisitIcon'

const GROUP_ICONS = { ask: ClipboardList, talk: MessageCircle, questions: MessageCircleQuestion, checks: Gauge, maybe: CircleHelp }

// A group reads like a small version of the card's header: an icon tile the same size and tint as the
// visit's, with the label and its rows beside it. Under 400px wide the tiles (decoration only) are hidden so
// the words get the width.
function Group({ id, label, children }) {
  const Icon = GROUP_ICONS[id]
  return (
    <section className="flex gap-2">
      <span aria-hidden className={cn('flex size-5 shrink-0 items-center justify-center rounded-control text-primary max-[399px]:hidden', Icon && 'bg-tint')}>
        {Icon && <Icon className="size-3" strokeWidth={1.75} />}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="cf-label">{label}</h4>
        <ul>{children}</ul>
      </div>
    </section>
  )
}

// A row: a small dot, then the words. A row an answer just added is tinted and announced as new.
const Row = ({ isNew, children }) => (
  <li className={cn('relative pl-2 before:absolute before:top-1 before:left-0 before:size-1 before:rounded-full before:bg-faint', isNew && 'cf-new before:bg-primary')}>
    {isNew && <span className="sr-only">New: </span>}{children}
  </li>
)
const NONE = new Set()

// askIf: [{ rec, note }] items that may apply, shown on the first visit. showSay: include the scheduling script
// (the first visit's script lives in the plan's first step instead).
// fresh: ids of recommendations the last answer added; their rows are marked, and a closed card's icon gets a dot.
export function VisitCard({ visit, defaultOpen = false, askIf = [], showSay = true, fresh = NONE }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const groups = visitGroups(visit)
  const summary = visitSummary(visit)
  const isNew = it => it.ids.some(i => fresh.has(i))
  const hasNew = groups.some(g => g.items.some(isNew))
  return (
    // Hover darkens the border instead of filling the card.
    <article className="rounded-card border bg-card transition-colors duration-(--cf-motion-fast) has-[h3>button:hover]:border-outline">
      {/* On a phone the icon and chevron sit at the top, beside the name, so a wrapped header reads from the top. */}
      <div className="relative flex items-start gap-2 p-2 sm:items-center">
        {/* The icon and chevron let clicks through, so the whole header opens and closes the card. */}
        <div className="pointer-events-none max-[399px]:hidden"><VisitIcon id={visit.id} isNew={hasNew && !open} /></div>
        <div className="min-w-0 flex-1">
          <h3 className="text-heading font-bold">
            {/* The button's hit area covers the whole header; a term in the line below stays tappable on top of it. */}
            <button
              type="button"
              className="rounded-card text-left outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen(o => !o)}
            >
              {visit.name}
            </button>
          </h3>
          <p><RichText>{visit.who}</RichText></p>
          {/* Each part keeps its dot, so a wrapped line never starts with one. */}
          {summary.length > 0 && (
            <p className="text-muted-foreground">
              {summary.map((part, i) => [<span key={part} className="whitespace-nowrap">{part}{i < summary.length - 1 && ' ·'}</span>, ' '])}
            </p>
          )}
        </div>
        <ChevronDown aria-hidden className={cn('pointer-events-none size-3 shrink-0 text-outline transition-transform duration-(--cf-motion-base)', open && 'rotate-180')} />
      </div>
      <Collapse open={open} id={id}>
        <div className="mx-2 space-y-2 border-t border-tint py-2">
          {((showSay && visit.say) || visit.how) && (
            <div className="space-y-1 min-[400px]:pl-7">
              {showSay && visit.say && <Script label="When you call, say">{visit.say}</Script>}
              {visit.how && <p>{visit.how}</p>}
            </div>
          )}
          {groups.map(g => (
            <Group key={g.id} id={g.id} label={g.label}>
              {g.items.map(it => (
                <Row key={it.text} isNew={isNew(it)}><RichText>{it.text}</RichText>{it.note && <span className="text-muted-foreground"> · {it.note}</span>}</Row>
              ))}
            </Group>
          ))}
          {askIf.length > 0 && (
            <Group id="maybe" label="Ask if these apply to you">
              {askIf.map(({ rec, note }) => (
                <Row key={rec.id}>
                  {rec.plain_name}
                  <span className="block text-muted-foreground"><RichText>{rec.applies}</RichText>{note && ` ${note}.`}</span>
                </Row>
              ))}
            </Group>
          )}
        </div>
      </Collapse>
      {/* The tip shows open or closed: it's the part people most need before they go. */}
      {visit.tip && <p className="mx-2 border-t border-tint py-2 text-muted-foreground min-[400px]:pl-7"><span className="font-semibold text-foreground">Good to know:</span> {visit.tip}</p>}
    </article>
  )
}
