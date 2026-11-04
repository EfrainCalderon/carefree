// PlanSnapshot: Compact summary of the plan inside the conversation.
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VisitNumber } from '../VisitNumber/VisitNumber'

// Compact summary of the plan inside the conversation.
export function PlanSnapshot({ visits, onOpen }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Your visit plan</CardTitle>
        <CardDescription>
          {visits.length} {visits.length === 1 ? 'visit' : 'visits'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-1">
          {visits.map((v, i) => (
            <li key={v.id} className="flex items-center gap-1">
              <VisitNumber n={i + 1} />
              <span className="flex-1">{v.name}</span>
              <span className="shrink-0 text-muted-foreground">{v.items.length} {v.items.length === 1 ? 'thing' : 'things'}</span>
            </li>
          ))}
        </ol>
        <Button className="mt-2 w-full" onClick={onOpen}>Open your plan</Button>
      </CardContent>
    </Card>
  )
}
