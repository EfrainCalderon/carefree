import './Button.css'

export function Button({ children, variant = 'primary', ready = true, onClick }) {
  return (
    <button
      className={`btn btn--${variant}${variant === 'primary' && ready ? ' btn--ready' : ''}`}
      onClick={ready ? onClick : undefined}
    >
      {children}
    </button>
  )
}
