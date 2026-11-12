// VisitIcon: One icon per kind of visit, shown once on the card. It replaces a number, because only the
// first visit has an order, and replaces per-row icons, which repeated the same picture down the list.
import { ClipboardList, Dna, FlaskConical, HeartPulse, Package, Pill, ScanLine, Stethoscope, Users } from 'lucide-react'

const ICONS = {
  'primary-care': Stethoscope,
  'well-woman': HeartPulse,
  prenatal: HeartPulse,
  lab: FlaskConical,
  imaging: ScanLine,
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
