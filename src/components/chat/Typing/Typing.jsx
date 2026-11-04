// Typing: Shows that Carefree is about to reply.


export function Typing() {
  return (
    <div className="flex w-fit gap-1 rounded-bubble rounded-bl-tail bg-card px-2 py-2 shadow-[inset_0_0_0_1px_var(--border)]" aria-label="Carefree is typing" role="status">
      {[0, 1, 2].map(i => (
        <span key={i} className="size-1 rounded-full bg-outline animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  )
}
