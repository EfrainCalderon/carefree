// OptInCard: The one gate before personal questions.
import { Card, CardContent } from '@/components/ui/card'
import { Chips } from '../Chips/Chips'

export function OptInCard({ count, value, onChoose }) {
  return (
    <Card className="max-w-md">
      <CardContent className="space-y-3">
        <p className="text-[15px]">
          <span className="block text-[17px] leading-snug font-extrabold">A few quick questions could add up to {count} more free {count === 1 ? 'screening' : 'screenings'}.</span>
          <span className="text-muted-foreground">About a minute. Skip any question. Your answers stay on this device.</span>
        </p>
        <Chips
          label="Improve your plan?"
          keepAfterAnswer
          value={value}
          onSelect={onChoose}
          options={[{ id: 'yes', label: 'Improve my plan' }, { id: 'no', label: 'I’m good' }]}
        />
      </CardContent>
    </Card>
  )
}
