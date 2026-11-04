// DoctorFinderCard: ZIP code search for nearby community health centers (stub).
import { useState } from 'react'
import { MapPin, Phone, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Stub: real version reads HRSA health center data and computes distance on-device.
export function DoctorFinderCard({ reason }) {
  const [zip, setZip] = useState('')
  const [shown, setShown] = useState(false)
  const valid = /^\d{5}$/.test(zip)
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Stethoscope className="size-4" />Find a clinic near you</CardTitle>
        <CardDescription>
          {reason === 'none'
            ? 'Community health centers charge based on what you can pay.'
            : 'Community health centers take most insurance, Medicaid, and Medicare, and can be your regular doctor.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!shown ? (
          <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (valid) setShown(true) }}>
            <div className="flex-1">
              <Label htmlFor="zip" className="sr-only">ZIP code</Label>
              <Input id="zip" inputMode="numeric" maxLength={5} placeholder="e.g. 07052" value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))} />
            </div>
            <Button type="submit" disabled={!valid}>Find</Button>
          </form>
        ) : (
          <div className="space-y-3">
            <span className="cf-label">Sample results · not real clinics</span>
            {['Sample Community Health Center', 'Sample Family Clinic', 'Sample Neighborhood Health'].map((n, i) => (
              <div key={n} className="flex items-center justify-between gap-3 border-t border-tint pt-3">
                <div>
                  <p className="font-semibold">{n}</p>
                  <p className="flex items-center gap-1 text-[13px] text-muted-foreground"><MapPin className="size-3.5" />{(1.2 + i * 1.7).toFixed(1)} mi · Call to check hours</p>
                  <span className="mt-1 inline-flex rounded-full bg-tint px-2.5 py-0.5 text-xs font-semibold">Sliding-scale fees</span>
                </div>
                <Button variant="outline" aria-label={`Call ${n}`}><Phone />Call</Button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-[13px] text-muted-foreground">
          ZIP stays on your device. Or search{' '}
          <a className="underline" href="https://findahealthcenter.hrsa.gov/" target="_blank" rel="noreferrer">HRSA’s Find a Health Center</a>.
        </p>
      </CardContent>
    </Card>
  )
}
