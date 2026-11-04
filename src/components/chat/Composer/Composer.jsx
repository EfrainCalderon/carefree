// Composer: Text field with a disabled voice mic and a send button.
import { useState } from 'react'
import { ArrowUp, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function Composer({ onSend, hint }) {
  const [text, setText] = useState('')
  const send = e => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }
  return (
    <form onSubmit={send} className="flex items-center gap-1 rounded-composer border border-outline bg-card p-1 pl-4.5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
      <Label htmlFor="composer" className="sr-only">Message</Label>
      <input
        id="composer"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={hint || 'Tap an answer above, or type here'}
        className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:outline-none placeholder:text-muted-foreground"
        autoComplete="off"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          {/* aria-disabled keeps it focusable so the tooltip explains why */}
          <Button type="button" variant="ghost" size="icon-lg" aria-disabled="true" className="rounded-full text-faint hover:bg-transparent hover:text-faint" aria-label="Voice input, coming later">
            <Mic />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Voice is coming later</TooltipContent>
      </Tooltip>
      <Button type="submit" size="icon-lg" className="rounded-full" aria-label="Send" disabled={!text.trim()}>
        <ArrowUp className="size-5" />
      </Button>
    </form>
  )
}
