// Collapse: Content that opens and closes by height. Closed content is hidden from keyboards and
// screen readers but stays in the page, so a printed plan shows everything.
export function Collapse({ open, id, children }) {
  return (
    <div id={id} className="cf-collapse" data-open={open ? '' : undefined} inert={!open}>
      <div>{children}</div>
    </div>
  )
}
