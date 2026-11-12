// VisitSheet: The plan boiled down to what to say in the room. Big type, first person, one screen:
// hand the phone to the doctor or read from it, and tick things off as they're covered.
import { useState } from 'react'
import { ClipboardList, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { plainText } from '@/lib/terms'
import { visitGroups } from '@/lib/visits'

// What the person says, per visit they book: things to ask for, things to talk about, and what might apply.
function sections(plan) {
  return plan.visits.filter(v => v.kind === 'book').map((visit, i) => {
    const groups = visitGroups(visit)
    const items = id => groups.find(g => g.id === id)?.items.map(it => plainText(it.text)) ?? []
    return {
      id: visit.id,
      name: visit.name,
      lists: [
        { label: 'I’d like to ask for', items: items('ask') },
        { label: 'I’d like to talk about', items: items('talk') },
        { label: 'Do any of these apply to me?', items: i === 0 ? plan.askDoctor.map(({ rec }) => rec.plain_name) : [] },
      ].filter(l => l.items.length),
    }
  }).filter(s => s.lists.length)
}

export function VisitSheet({ plan, defaultOpen = false }) {
  const [done, setDone] = useState(() => new Set())
  const toggle = key => setDone(prev => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next })
  const visits = sections(plan)
  if (!visits.length) return null
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full whitespace-normal"><ClipboardList />Show this at my visit</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <DialogTitle className="text-title font-bold tracking-tight">For my visit</DialogTitle>
              <DialogDescription className="text-muted-foreground">Show this to your doctor, or read from it. Tap a line when it’s covered.</DialogDescription>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon-lg" className="-mt-1 -mr-1 shrink-0" aria-label="Close"><X /></Button>
            </DialogClose>
          </div>
          {visits.map(v => (
            <section key={v.id} className="space-y-2">
              {visits.length > 1 && <h3 className="text-heading font-bold">{v.name}</h3>}
              {v.lists.map(l => (
                <div key={l.label} className="space-y-1">
                  <h4 className="cf-label">{l.label}</h4>
                  <ul className="divide-y divide-tint rounded-card border">
                    {l.items.map(text => {
                      const key = `${v.id}:${l.label}:${text}`
                      const checked = done.has(key)
                      return (
                        <li key={key}>
                          <label className="flex min-h-6 cursor-pointer items-center gap-2 px-2 py-1 text-heading">
                            <input type="checkbox" className="size-3 shrink-0 accent-[var(--cf-color-green-800)]" checked={checked} onChange={() => toggle(key)} />
                            <span className={checked ? 'text-muted-foreground line-through' : undefined}>{text}</span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </section>
          ))}
          <DialogClose asChild><Button className="w-full">Done</Button></DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
