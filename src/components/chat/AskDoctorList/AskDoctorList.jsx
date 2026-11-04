// AskDoctorList: Items that might apply, to ask the doctor about.


export function AskDoctorList({ recs }) {
  if (!recs.length) return null
  return (
    <div className="space-y-2">
      <h3 className="cf-label px-2">Ask your doctor about</h3>
      <ul className="rounded-card border bg-card px-2">
        {recs.map(r => (
          <li key={r.id} className="flex flex-col gap-0 border-t border-tint py-2 first:border-t-0">
            <p className="font-semibold">{r.plain_name}</p>
            <p className="text-body text-muted-foreground">{r.condition_note}</p>
            {r.doctor_prompt && <p>{r.doctor_prompt}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
