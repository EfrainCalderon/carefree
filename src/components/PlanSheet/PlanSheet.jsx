import { useState } from 'react'
import './PlanSheet.css'

export function PlanSheet({ planItems, onEmail, onClose, onClearPlan }) {
  const [emailExpanded, setEmailExpanded] = useState(false)
  const [emailValue, setEmailValue] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [confirmingClear, setConfirmingClear] = useState(false)

  const count = planItems.length
  const previewItems = planItems.slice(0, 5)
  const overflowCount = count - previewItems.length

  function handleCopyLink() {
    const ids = planItems.map(r => r.id).join(',')
    const url = `${window.location.origin}${window.location.pathname}?plan=${encodeURIComponent(ids)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // Fallback for older browsers / non-https
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function handleSendEmail(e) {
    e.preventDefault()
    if (!emailValue.trim()) return
    await onEmail(emailValue.trim())
    setEmailSent(true)
  }

  function handleClearConfirmed() {
    onClearPlan()
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="sheet-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Sheet */}
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Save your plan">
        {/* Drag handle */}
        <div className="sheet__handle" aria-hidden="true" />

        {/* Header */}
        <div className="sheet__header">
          <span className="sheet__title">Your plan</span>
          <button className="sheet__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Summary list */}
        <ul className="sheet__summary" aria-label="Items in your plan">
          {previewItems.map(rec => (
            <li key={rec.id} className="sheet__summary-item">
              <span className="sheet__check" aria-hidden="true">✓</span>
              {rec.plain_name}
            </li>
          ))}
          {overflowCount > 0 && (
            <li className="sheet__summary-more">
              +{overflowCount} more
            </li>
          )}
        </ul>

        <div className="sheet__divider" />

        {/* Email option */}
        <div className={`sheet__option${emailExpanded ? ' sheet__option--expanded' : ''}`}>
          {!emailSent ? (
            <>
              <button
                className="sheet__option-trigger"
                onClick={() => setEmailExpanded(e => !e)}
                aria-expanded={emailExpanded}
              >
                <span className="sheet__option-icon" aria-hidden="true">✉</span>
                <div className="sheet__option-body">
                  <span className="sheet__option-label">Email plan</span>
                  <span className="sheet__option-desc">Get a formatted list in your inbox</span>
                </div>
                <span className="sheet__option-chevron" aria-hidden="true">
                  {emailExpanded ? '∧' : '∨'}
                </span>
              </button>
              {emailExpanded && (
                <form className="sheet__email-form" onSubmit={handleSendEmail}>
                  <input
                    className="sheet__email-input"
                    type="email"
                    placeholder="your@email.com"
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    autoFocus
                    required
                    aria-label="Email address"
                  />
                  <button
                    className="sheet__email-send"
                    type="submit"
                    disabled={!emailValue.trim()}
                  >
                    Send
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="sheet__option-sent">
              <span className="sheet__option-icon" aria-hidden="true">✓</span>
              <div className="sheet__option-body">
                <span className="sheet__option-label">Sent!</span>
                <span className="sheet__option-desc">Check your inbox</span>
              </div>
            </div>
          )}
        </div>

        {/* Copy link option */}
        <div className="sheet__option">
          <button className="sheet__option-trigger" onClick={handleCopyLink}>
            <span className="sheet__option-icon" aria-hidden="true">🔗</span>
            <div className="sheet__option-body">
              <span className="sheet__option-label">
                {copied ? 'Copied!' : 'Copy plan link'}
              </span>
              <span className="sheet__option-desc">Bookmark it or send it to your doctor</span>
            </div>
            {copied && <span className="sheet__option-check" aria-hidden="true">✓</span>}
          </button>
        </div>

        {/* Start over */}
        <div className="sheet__footer">
          {!confirmingClear ? (
            <button className="sheet__start-over" onClick={() => setConfirmingClear(true)}>
              Start over
            </button>
          ) : (
            <div className="sheet__confirm">
              <span className="sheet__confirm-label">
                Remove all {count} item{count !== 1 ? 's' : ''} from your plan?
              </span>
              <div className="sheet__confirm-actions">
                <button className="sheet__confirm-yes" onClick={handleClearConfirmed}>
                  Yes, clear it
                </button>
                <button className="sheet__confirm-no" onClick={() => setConfirmingClear(false)}>
                  Keep them
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
