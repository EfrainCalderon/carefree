// Design tokens from tokens/tokens.json (Tokens Studio → Style Dictionary → src/tokens.css).
export default { title: 'Foundations/Tokens', parameters: { layout: 'padded' } }

const GREENS = ['50', '100', '200', '300', '500', '600', '700', '800', '900']
const SURFACES = [['page', 'Page background'], ['border', 'Borders and dividers'], ['feedback-error', 'Error text'], ['feedback-error-bg', 'Error background']]
const Swatch = ({ v, name, note }) => (
  <div className="text-sm">
    <div className="h-14 rounded-control border" style={{ background: `var(${v})` }} />
    <p className="mt-1 font-mono text-xs">{name}</p>
    {note && <p className="text-xs text-muted-foreground">{note}</p>}
  </div>
)

export const Color = {
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-9">
        {GREENS.map(g => <Swatch key={g} v={`--cf-color-green-${g}`} name={`green-${g}`} />)}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SURFACES.map(([t, n]) => <Swatch key={t} v={`--cf-color-${t}`} name={t} note={n} />)}
      </div>
      <div className="cf-gradient h-24 rounded-card p-4 text-sm font-semibold">Brand gradient · 160° gradient-start → mid → end</div>
    </div>
  ),
}

const TYPE = [
  ['Display · 40/800', 'text-[40px] font-extrabold leading-none tracking-tight', '9 in 10'],
  ['Title · 26/800', 'text-[26px] font-extrabold leading-tight tracking-tight', 'Your visit plan'],
  ['Heading · 18/800', 'text-lg font-extrabold', 'Primary care checkup'],
  ['Item · 16/600', 'text-base font-semibold', 'Blood pressure'],
  ['Body · 16/400', 'text-base', 'First, how old are you?'],
  ['Secondary · 15/400', 'text-[15px] text-muted-foreground', 'Once a year · doctor or nurse practitioner'],
  ['Small · 13/400', 'text-[13px] text-muted-foreground', 'Source: CDC'],
]
export const Type = {
  render: () => (
    <div className="space-y-4">
      {TYPE.map(([n, c, s]) => <div key={n}><p className="cf-label">{n}</p><p className={c}>{s}</p></div>)}
      <div><p className="cf-label">Label · Overpass Mono 11/600</p><p className="cf-label text-foreground">What should happen</p></div>
    </div>
  ),
}

const RADII = ['tail', 'control', 'card', 'bubble', 'sheet', 'composer']
export const Shape = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {RADII.map(r => (
        <div key={r} className="text-center">
          <div className="size-20 border bg-card" style={{ borderRadius: `var(--cf-borderRadius-${r})` }} />
          <p className="mt-1 font-mono text-xs">{r}</p>
        </div>
      ))}
    </div>
  ),
}
