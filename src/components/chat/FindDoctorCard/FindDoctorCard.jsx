// FindDoctorCard: How to find a doctor to book with, chosen from the insurance and doctor answers
// (findDoctorVariant in src/app/logic.js). Text plus at most one link out, so there's no provider data to keep fresh.
import { ExternalLink, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const HRSA = 'https://findahealthcenter.hrsa.gov/'

const Script = ({ children }) => <p className="rounded-control bg-tint p-2"><strong>Ask:</strong> {children}</p>
const HrsaLink = ({ children = 'Find a health center near you' }) => (
  <Button asChild variant="outline">
    <a href={HRSA} target="_blank" rel="noreferrer">{children}<ExternalLink /><span className="sr-only">(opens HRSA’s site in a new tab)</span></a>
  </Button>
)

const COPY = {
  // Insured, no doctor (or not sure).
  insurer: insurance => ({
    title: 'Find a primary care doctor',
    text: `Call the member services number on your ${insurance === 'medicaid' ? 'Medicaid or health plan card' : 'insurance card'}. They can tell you which doctors near you are in your network.`,
    ask: '“Which in-network primary care doctors near me are taking new patients?”',
  }),
  medicare: () => ({
    title: 'Find a primary care doctor',
    text: 'Call 1-800-MEDICARE (1-800-633-4227), or the number on your plan card if you have a Medicare Advantage plan.',
    ask: '“Which primary care doctors near me accept Medicare and are taking new patients?”',
  }),
  // Not sure about insurance, no doctor: cover both cases.
  unsure: () => ({
    title: 'Find a primary care doctor',
    text: 'If you have an insurance card, call the member services number on it. They can tell you which doctors near you are in your network and whether these visits are $0.',
    ask: '“Which in-network primary care doctors near me are taking new patients?”',
    link: 'No insurance? Find a health center',
  }),
  // Uninsured, no doctor.
  clinic: () => ({
    title: 'Find a community health center',
    text: 'They see people without insurance and charge based on what you can pay. Many can also be your regular doctor.',
    ask: '“I’d like to schedule a preventive visit. I don’t have insurance. What would it cost?”',
    link: 'Find a health center near you',
  }),
  // Uninsured, has a doctor: keep the doctor, but know the cheaper option.
  cost: () => ({
    title: 'If cost is a worry',
    text: 'Ask your doctor’s office what a preventive visit costs without insurance. If it’s too much, community health centers charge based on what you can pay.',
    ask: '“What does a preventive visit cost if I pay myself? Do you offer a discount?”',
    link: 'Find a health center near you',
  }),
}

export function FindDoctorCard({ variant, insurance }) {
  if (!variant) return null
  const c = COPY[variant](insurance)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1"><Stethoscope className="size-2" />{c.title}</CardTitle>
        <CardDescription>{c.text}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Script>{c.ask}</Script>
        {c.link && <HrsaLink>{c.link}</HrsaLink>}
      </CardContent>
    </Card>
  )
}
