// AskDoctorList: Items that might apply, with what to say. Only shown after the extra questions,
// which already explain who each one is for, so it lists just the item and the script.
export function AskDoctorList({ recs }) {
  if (!recs.length) return null
  return (
    <div className="space-y-1">
      <h3 className="cf-label px-2">Ask your doctor about</h3>
      <ul className="rounded-card border bg-card px-2">
        {recs.map(r => (
          <li key={r.id} className="border-t border-tint py-2 first:border-t-0">
            <p className="font-semibold">{r.plain_name}</p>
            {r.doctor_prompt && <p className="text-muted-foreground">{r.doctor_prompt}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
