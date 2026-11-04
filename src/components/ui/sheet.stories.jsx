import { Button } from './button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

export default { title: 'Primitives/Sheet', component: Sheet, tags: ['autodocs'] }

// The plan opens as a bottom sheet on mobile (<768px) and a right sheet on tablet (768–1023px).
const make = side => ({
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open {side} sheet</Button></SheetTrigger>
      <SheetContent side={side} className={side === 'right' ? 'w-(--cf-size-plan-sheet) sm:max-w-(--cf-size-plan-sheet)' : ''}>
        <SheetHeader><SheetTitle>Your visit plan</SheetTitle><SheetDescription>What to book, what to say, and what’s covered.</SheetDescription></SheetHeader>
      </SheetContent>
    </Sheet>
  ),
})
export const Bottom = make('bottom')
export const Right = make('right')
