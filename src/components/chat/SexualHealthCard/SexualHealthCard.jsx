// SexualHealthCard: Passive self-select card for sexual health tests.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Chips } from '../Chips/Chips'

// Passive self-select card. Never records which factor applies.
export function SexualHealthCard({ factors, value, onChoose }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Some free tests depend on your sexual health</CardTitle>
        <CardDescription>If any of these have been true for you in the last year, they’re worth asking about. No need to say which.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul className="list-disc space-y-1 pl-3">
          {factors.map(f => <li key={f}>{f}</li>)}
        </ul>
        <Chips
          label="Add sexual health tests?"
          keepAfterAnswer
          value={value}
          onSelect={onChoose}
          options={[{ id: 'yes', label: 'Add these tests' }, { id: 'no', label: 'Not for me' }]}
        />
      </CardContent>
    </Card>
  )
}
