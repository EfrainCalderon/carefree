// OutputPreview: Shows people what they will leave with before they start.
export function OutputPreview() {
  return (
    <div className="flex items-center gap-2 rounded-card border bg-card p-2">
      <div aria-hidden className="flex h-8 w-6 shrink-0 flex-col overflow-hidden rounded-control border bg-card">
        <div className="cf-gradient h-2" />
        <div className="flex flex-col gap-0.5 p-1">
          {['100%', '70%', '100%', '60%'].map((w, i) => <div key={i} className="h-0.5 rounded-full bg-[var(--cf-color-green-200)]" style={{ width: w }} />)}
        </div>
      </div>
      <div>
        <p className="font-bold">You’ll leave with a 1-page plan</p>
        <p className="text-muted-foreground">Who to see, what to say, and what’s covered.</p>
      </div>
    </div>
  )
}
