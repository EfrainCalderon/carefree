// SiteFooter: Who made this, the privacy and sources note, and a quiet way to clear everything and start
// again. One line on every screen, set on one baseline, beside the feedback button.
import { PrivacyNote } from '../PrivacyNote/PrivacyNote'

const LINK = 'underline decoration-1 underline-offset-4 hover:decoration-2'

// onReset: clears the answers and goes back to the start. Only given once there's something to clear.
export function SiteFooter({ onReset }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 py-1 pr-8 text-muted-foreground">
      <span>Carefree by <a className={LINK} href="https://www.efrain.design" target="_blank" rel="noreferrer">Efrain Calderon</a></span>
      <PrivacyNote />
      {onReset && <button type="button" className={LINK} onClick={onReset}>Start over</button>}
    </p>
  )
}
