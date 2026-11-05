// OptInCard: At the bottom of the plan, a second chance to answer the extra questions.
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function OptInCard({ count, onImprove }) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <p>
          <span className="block text-heading font-bold">Make your plan more accurate</span>
          <span className="text-muted-foreground">A few quick questions could add up to {count} more free {count === 1 ? 'screening' : 'screenings'}. About a minute. Your answers stay on this device.</span>
        </p>
        <Button variant="outline" onClick={onImprove}>Improve my plan</Button>
      </CardContent>
    </Card>
  )
}
