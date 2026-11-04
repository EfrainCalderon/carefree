// Grain: Film grain overlay for the brand gradient.


// Film grain over the brand gradient (16% overlay).
export function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full opacity-16 mix-blend-overlay">
      <filter id="cf-grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#cf-grain)" />
    </svg>
  )
}
