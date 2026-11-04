// Typing: Shows that Carefree is about to reply.


export function Typing() {
  return (
    <div className="flex w-fit gap-1.5 rounded-bubble rounded-bl-tail border bg-card px-4 py-3.5" aria-label="Carefree is typing" role="status">
      {[0, 1, 2].map(i => (
        <span key={i} className="size-2 rounded-full bg-outline animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  )
}
