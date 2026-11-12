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

export function VisitIcon({ id }) {
  const Icon = ICONS[id] || ClipboardList
  return (
    <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-control bg-tint text-primary">
      <Icon className="size-3" strokeWidth={1.75} />
    </span>
  )
}
