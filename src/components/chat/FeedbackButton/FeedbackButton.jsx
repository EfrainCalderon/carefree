// FeedbackButton: Always on screen. Anyone can say what's working or not, in their own words, without
// giving a name or address. The note is emailed to the person who makes Carefree (api/send-feedback.js).
import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

async function postFeedback(message, screen, website) {
  const res = await fetch('/api/send-feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, screen, website }),
  })
  if (!res.ok) throw Object.assign(new Error('send failed'), { status: res.status })
}

// screen: which screen the person is on, sent with the note. No answers are sent.
export function FeedbackButton({ screen, send = postFeedback, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed | limited

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await send(message.trim(), screen, new FormData(e.currentTarget ?? e.target).get('website') || undefined)
      setMessage('')
      setStatus('sent')
    } catch (err) {
      setStatus(err?.status === 429 ? 'limited' : 'failed')
    }
  }
  // Closing after a send resets the form for next time.
  const onOpenChange = next => { setOpen(next); if (!next && status === 'sent') setStatus('idle') }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* A round icon on a phone, where it would otherwise sit over the page; the word joins it from 640px. */}
        <Button variant="outline" aria-label="Send feedback" className="cf-no-print fixed right-2 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 size-6 rounded-full px-0 shadow-popover sm:size-auto sm:px-2"><MessageSquare /><span className="hidden sm:inline">Feedback</span></Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <DialogTitle className="text-heading font-bold">Send feedback</DialogTitle>
              <DialogDescription className="text-muted-foreground">Your personal info is not collected or shared.</DialogDescription>
            </div>
            <DialogClose asChild><Button variant="ghost" size="icon-lg" className="-mt-1 -mr-1 shrink-0" aria-label="Close"><X /></Button></DialogClose>
          </div>
          {status === 'sent' ? (
            <div role="status" className="space-y-2">
              <p className="font-semibold">Thanks. Your feedback was sent.</p>
              <DialogClose asChild><Button className="w-full">Close</Button></DialogClose>
            </div>
          ) : (
            <form className="space-y-1" onSubmit={submit}>
              {/* Hidden from people. A script that fills in every field gives itself away here. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <Label htmlFor="feedback-message" className="font-semibold">What’s working, and what isn’t?</Label>
              <Textarea id="feedback-message" maxLength={4000} value={message} onChange={e => setMessage(e.target.value)} />
              {status === 'failed' && <p role="alert" className="text-destructive">We couldn’t send your feedback. Check your connection and try again.</p>}
              {status === 'limited' && <p role="alert" className="text-destructive">That’s the limit for now. You can send more in an hour.</p>}
              <Button type="submit" className="w-full" disabled={!message.trim() || status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send feedback'}</Button>
            </form>
          )}
          {/* The quietest thing here: a way to say thanks, for anyone who wants one. */}
          <p className="text-muted-foreground">Finding Carefree useful? <a className="underline decoration-1 underline-offset-4 hover:decoration-2" href="https://www.buymeacoffee.com/efrainfm" target="_blank" rel="noreferrer">Buy me a coffee</a>.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
