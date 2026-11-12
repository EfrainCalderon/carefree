// PlanGhost: Where the plan will be, before there's enough to build it. It shows the finish line
// (what you'll leave with) and how close it is.
export function PlanGhost({ remaining = 2 }) {
  return (
    <div className="space-y-2 rounded-card border border-dashed border-faint p-3">
      <div>
        <p className="text-heading font-bold">Your plan builds here</p>
        <p className="text-muted-foreground">Who to see, what to say, and what’s covered. {remaining === 1 ? 'One more tap.' : `${remaining} taps to go.`}</p>
      </div>
      <div aria-hidden className="space-y-1">
        {['w-full', 'w-3/4', 'w-1/2'].map(w => <div key={w} className={`h-2 rounded-full bg-tint ${w}`} />)}
      </div>
    </div>
  )
}
