// Barriers: The common reasons people put off the call (no doctor, no time, cost), as three quiet links
// right under the script, where they matter. Each opens a short answer on tap, click or Enter.
import { ExternalLink } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Script } from '../Script/Script'

// barriers: firstStep(plan).barriers from src/app/logic.js.
export function Barriers({ barriers = [] }) {
  if (!barriers.length) return null
  return (
    <ul className="flex flex-wrap gap-x-2 text-muted-foreground">
      {barriers.map(b => (
        <li key={b.id}>
          <Popover>
            <PopoverTrigger className="min-h-4 underline decoration-1 underline-offset-4 hover:text-foreground hover:decoration-2 aria-expanded:text-foreground">{b.title}</PopoverTrigger>
            <PopoverContent side="bottom">
              <div className="space-y-2">
                <p>{b.text}</p>
                {b.ask && <Script label="Ask">{b.ask}</Script>}
                {b.more && <p className="text-muted-foreground">{b.more}</p>}
                {b.link && (
                  <a className="inline-flex min-h-6 items-center gap-1 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2" href={b.link.href} target="_blank" rel="noreferrer">
                    {b.link.label}<ExternalLink aria-hidden className="size-2" /><span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </li>
      ))}
    </ul>
  )
}
