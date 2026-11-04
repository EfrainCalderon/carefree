// MentalHealthCard: Sets expectations for the mood questions at a checkup.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function MentalHealthCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Your doctor will likely ask how you’ve been feeling</CardTitle>
        <CardDescription>It’s a normal part of the checkup, and it’s covered. Questions sound like:</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-1 rounded-control bg-tint-subtle p-2 pl-4">
          <li>“Over the last 2 weeks, how often have you felt little interest in doing things?”</li>
          <li>“How often have you felt nervous, anxious, or on edge?”</li>
          <li>“How often do you have 5 or more drinks at once?”</li>
        </ul>
        <p className="mt-2 text-muted-foreground">Share as much or as little as you want. If you’re struggling right now, you can call or text 988 any time.</p>
      </CardContent>
    </Card>
  )
}
