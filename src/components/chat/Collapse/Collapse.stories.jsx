import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Collapse } from './Collapse'

export default { title: 'Plan/Collapse', component: Collapse, tags: ['autodocs'], decorators: [S => <div className="max-w-[560px]"><S /></div>] }

// Opens and closes by height. Closed content can't be reached by keyboard or screen reader, but still prints.
export const Default = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="space-y-1">
        <Button variant="outline" aria-expanded={open} aria-controls="collapse-demo" onClick={() => setOpen(o => !o)}>{open ? 'Close' : 'Open'}</Button>
        <Collapse open={open} id="collapse-demo"><p className="rounded-card border bg-card p-2">Usually one blood draw, often the same day as your visit.</p></Collapse>
      </div>
    )
  },
}
