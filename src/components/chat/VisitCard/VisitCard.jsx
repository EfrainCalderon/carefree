// VisitCard: One visit in the plan. Closed, it says what it is and who it's with. Open, it follows the order
// things happen: how to book, then what to say and what to expect there, then one thing to know about cost.
// Each group has one label that carries the verb ("Ask for", "They'll check"), so rows are short and there
// is one icon per group, not one per row.
import { useId, useState } from 'react'
import { ChevronDown, CircleHelp, ClipboardList, Gauge, Info, MessageCircle, MessageCircleQuestion } from 'lucide-react'
import { cn } from '@/lib/utils'
import { visitGroups } from '@/lib/visits'
import { Collapse } from '../Collapse/Collapse'
import { Script } from '../Script/Script'
import { RichText } from '../Term/Term'
import { VisitIcon } from '../VisitIcon/VisitIcon'

const GROUP_ICONS = { ask: ClipboardList, talk: MessageCircle, questions: MessageCircleQuestion, checks: Gauge, maybe: CircleHelp }

function Group({ id, label, children }) {
  const Icon = GROUP_ICONS[id]
  return (
    <section className="space-y-1">
      <h4 className="cf-label flex items-center gap-1">
        {Icon && <span aria-hidden className="flex size-3 shrink-0 items-center justify-center rounded-control bg-tint text-primary"><Icon className="size-2" strokeWidth={1.75} /></span>}
        {label}
      </h4>
      <ul className="space-y-1">{children}</ul>
    </section>
  )
}

// A row: a dot in the icon column, then the words. A row an answer just added is tinted and announced as new.
const Row = ({ isNew, children }) => (
  <li className={cn('relative pl-4 before:absolute before:top-1 before:left-1 before:size-1 before:rounded-full before:bg-faint', isNew && 'cf-new before:bg-primary')}>
    {isNew && <span className="sr-only">New: </span>}{children}
  </li>
)
const NONE = new Set()

// askIf: [{ rec, note }] items that may apply, shown on the first visit. finder: help finding a doctor.
// fresh: ids of recommendations the last answer added; their rows are marked, and a closed card's icon gets a dot.
export function VisitCard({ visit, defaultOpen = false, askIf = [], finder, fresh = NONE }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const groups = visitGroups(visit)
  const isNew = it => it.ids.some(i => fresh.has(i))
  const hasNew = groups.some(g => g.items.some(isNew))
  return (
    // Hover darkens the border instead of filling the card.
    <article className="rounded-card border bg-card transition-colors duration-(--cf-motion-fast) has-[h3>button:hover]:border-outline">
      <div className="relative flex min-h-8 items-center gap-2 p-2">
        <VisitIcon id={visit.id} isNew={hasNew && !open} />
        <div className="min-w-0 flex-1">
          <h3 className="text-heading font-bold">
            {/* The button's hit area covers the whole header; the term in the line below stays tappable on top of it. */}
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
          <p className="text-muted-foreground"><RichText>{visit.who}</RichText></p>
        </div>
        <ChevronDown aria-hidden className={cn('cf-no-print size-3 shrink-0 text-outline transition-transform duration-(--cf-motion-base)', open && 'rotate-180')} />
      </div>
      <Collapse open={open} id={id}>
        <div className="mx-2 space-y-3 border-t border-tint py-2">
          {(visit.say || visit.how || finder) && (
            <div className="space-y-1">
              {visit.say && <Script label="When you book, say">{visit.say}</Script>}
              {visit.how && <p>{visit.how}</p>}
              {finder}
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
          {visit.tip && (
            <p className="flex gap-1 text-muted-foreground">
              <span aria-hidden className="flex size-3 shrink-0 items-center justify-center"><Info className="size-2" /></span>
              <span><span className="font-semibold text-foreground">Good to know:</span> {visit.tip}</span>
            </p>
          )}
        </div>
      </Collapse>
    </article>
  )
}
