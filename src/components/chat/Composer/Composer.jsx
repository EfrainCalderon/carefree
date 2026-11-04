// Composer: Text field and send button.
import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function Composer({ onSend, hint }) {
  const [text, setText] = useState('')
  const send = e => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }
  return (
    <form onSubmit={send} className="flex items-center gap-1 rounded-composer border border-outline bg-card p-1 pl-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
      <Label htmlFor="composer" className="sr-only">Message</Label>
      <input
        id="composer"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={hint || 'Tap an answer above, or type here'}
        className="min-h-6 min-w-0 flex-1 bg-transparent outline-none focus-visible:outline-none placeholder:text-muted-foreground"
        autoComplete="off"
      />
      <Button type="submit" size="icon-lg" className="rounded-full" aria-label="Send" disabled={!text.trim()}>
        <ArrowUp className="size-3" />
      </Button>
    </form>
  )
}
