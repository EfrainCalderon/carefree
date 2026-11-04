// OutputPreview: Tells people up front what they will leave with.
import { Card, CardContent } from '@/components/ui/card'

// Tells people up front what they'll leave with.
export function OutputPreview() {
  return (
    <Card className="max-w-md">
      <CardContent className="flex items-center gap-2">
        <div aria-hidden className="flex h-8 w-6 shrink-0 flex-col overflow-hidden rounded-control border bg-card">
          <div className="cf-gradient h-2" />
          <div className="flex flex-col gap-0.5 p-1">
            {['100%', '70%', '100%', '60%'].map((w, i) => <div key={i} className="h-0.5 rounded-full bg-[var(--cf-color-green-200)]" style={{ width: w }} />)}
          </div>
        </div>
        <div>
          <p className="font-bold">You’ll leave with a 1-page visit plan</p>
          <p className="text-muted-foreground">What to book, what to say, and what’s covered. Email it to yourself, no account needed.</p>
        </div>
      </CardContent>
    </Card>
  )
}
