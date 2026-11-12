// PrivacyNote: What happens to answers, and where the recommendations come from. One tap away at the foot
// of the page, for anyone who wants to check either.
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const LINK = 'underline decoration-1 underline-offset-4 hover:decoration-2'
const SOURCES = [
  { label: 'U.S. Preventive Services Task Force, A and B recommendations', href: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations' },
  { label: 'HealthCare.gov, preventive care benefits for adults', href: 'https://www.healthcare.gov/preventive-care-adults/' },
]

export function PrivacyNote() {
  return (
    <Popover>
      <PopoverTrigger className={LINK}>Privacy and sources</PopoverTrigger>
      <PopoverContent className="space-y-2">
        <div>
          <p className="font-semibold">Privacy</p>
          <ul>
            <li>There’s no account. Your answers stay in this browser tab and are cleared when you close it.</li>
            <li>If you email your plan, your answers are sent once to build it, and your address is used only for that email.</li>
            <li>Feedback is anonymous.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Sources</p>
          <p>What’s listed here is what plans must cover at no cost. It isn’t medical advice.</p>
          <ul>
            {SOURCES.map(s => <li key={s.href}><a className={LINK} href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
