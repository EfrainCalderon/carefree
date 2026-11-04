// Design tokens from tokens/tokens.json (Tokens Studio → Style Dictionary → src/tokens.css).
// Everything is on a base-8 scale, and no text is smaller than 16px.
export default { title: 'Foundations/Tokens', parameters: { layout: 'padded' } }

const GREENS = ['50', '100', '200', '300', '500', '600', '700', '800', '900']
const SURFACES = [['page', 'Page background'], ['surface', 'Cards, bubbles, inputs'], ['border', 'Borders and dividers'], ['feedback-error', 'Form errors only']]
const Swatch = ({ v, name, note }) => (
  <div>
    <div className="h-6 rounded-control border" style={{ background: `var(${v})` }} />
    <p className="mt-1 font-semibold">{name}</p>
    {note && <p className="text-muted-foreground">{note}</p>}
  </div>
)

export const Color = {
  render: () => (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
        {GREENS.map(g => <Swatch key={g} v={`--cf-color-green-${g}`} name={`green-${g}`} />)}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SURFACES.map(([t, n]) => <Swatch key={t} v={`--cf-color-${t}`} name={t} note={n} />)}
      </div>
      <div className="cf-gradient rounded-card p-3 font-semibold">Brand gradient · 160° gradient-start → mid → end</div>
    </div>
  ),
}

const TYPE = [
  ['Display · 40/48 bold', 'text-display font-bold tracking-tight', '9 in 10'],
  ['Title · 24/32 bold', 'text-title font-bold tracking-tight', 'Your visit plan'],
  ['Heading · 20/24 bold', 'text-heading font-bold', 'Preventive care visit'],
  ['Item · 16/24 semibold', 'font-semibold', 'Blood pressure'],
  ['Body · 16/24 regular', '', 'First, how old are you?'],
  ['Secondary · 16/24 regular, green-600', 'text-muted-foreground', 'Your primary care provider'],
]
export const Type = {
  render: () => (
    <div className="space-y-2">
      <p className="text-muted-foreground">Red Hat Text 400 / 600 / 700. Minimum size 16px: smaller text is set apart by color and weight, never size.</p>
      {TYPE.map(([n, c, s]) => <div key={n}><p className="cf-label">{n}</p><p className={c}>{s}</p></div>)}
    </div>
  ),
}

const SPACE = [[1, 8, 'Inside a group: icon to text, chips, lines'], [2, 16, 'Card and control inset; between groups'], [3, 24, 'Gradient surfaces; between sections and speakers'], [4, 32, 'Pills and icon tiles (height)'], [5, 40, 'One-line bubble height'], [6, 48, 'Controls and touch targets'], [8, 64, 'Visit card header']]
export const Spacing = {
  render: () => (
    <div className="space-y-1">
      <p className="text-muted-foreground">Tailwind steps are 8px, so the class number is the token: p-2 = 16, gap-3 = 24.</p>
      {SPACE.map(([n, px, use]) => (
        <div key={n} className="flex items-center gap-2">
          <span className="w-8 font-semibold">{n} · {px}</span>
          <span className="h-2 shrink-0 rounded-control bg-primary" style={{ width: px }} />
          <span className="text-muted-foreground">{use}</span>
        </div>
      ))}
    </div>
  ),
}

const RADII = [['sm', 8, 'Controls, tails'], ['md', 16, 'Cards'], ['lg', 24, 'Bubbles, sheets, composer'], ['full', '∞', 'Chips, pills']]
export const Shape = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {RADII.map(([r, px, use]) => (
        <div key={r} className="w-12">
          <div className="size-8 border bg-card" style={{ borderRadius: `var(--cf-borderRadius-${r})` }} />
          <p className="mt-1 font-semibold">{r} · {px}</p>
          <p className="text-muted-foreground">{use}</p>
        </div>
      ))}
    </div>
  ),
}
