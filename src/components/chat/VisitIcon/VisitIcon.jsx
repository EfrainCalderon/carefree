// VisitIcon: One icon per kind of visit, shown once on the card, in the same light tile the groups inside use. It replaces a number, because only the
// first visit has an order, and replaces per-row icons, which repeated the same picture down the list.
import { ClipboardList, Dna, FlaskConical, HeartPulse, Package, Pill, Stethoscope, Users } from 'lucide-react'

// A scan of a person: a scanner's frame around a head and shoulders. Drawn here because the icon set has
// nothing for imaging that doesn't read as a barcode, a broken bone, or a heart. Same grid and stroke as the rest.
function BodyScan({ strokeWidth = 2, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="9.5" r="2.5" />
      <path d="M7.5 17a4.5 4.5 0 0 1 9 0" />
    </svg>
  )
}

const ICONS = {
  'primary-care': Stethoscope,
  'well-woman': HeartPulse,
  prenatal: HeartPulse,
  lab: FlaskConical,
  imaging: BodyScan,
  colorectal: Package,
  pharmacy: Pill,
  program: Users,
  'genetic-counseling': Dna,
}

// isNew: a dot on the corner, for a closed card that an answer just added something to.
export function VisitIcon({ id, isNew }) {
  const Icon = ICONS[id] || ClipboardList
  return (
    <span className="relative flex size-5 shrink-0 items-center justify-center rounded-control bg-tint text-primary">
      <Icon aria-hidden className="size-3" strokeWidth={1.75} />
      {isNew && <span className="cf-fade absolute -top-1 -right-1 size-2 rounded-full bg-primary ring-2 ring-card"><span className="sr-only">New items inside</span></span>}
    </span>
  )
}
