import { useState } from 'react'
import './AgeInput.css'

export function AgeInput({ value, onChange }) {
  const [error, setError] = useState('')

  function handleChange(e) {
    const val = parseInt(e.target.value)
    setError('')
    if (val >= 18 && val <= 99) {
      onChange(val)
    } else {
      onChange(null)
    }
  }

  function handleBlur(e) {
    const val = parseInt(e.target.value)
    if (!e.target.value) return
    if (val < 18) setError('This tool is for adults 18 and older.')
    else if (val > 99) setError('Please enter a valid age.')
  }

  return (
    <div>
      <div className="age-input-wrap">
        <input
          type="number"
          className="age-input"
          min={18}
          max={99}
          placeholder="—"
          defaultValue={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="age-unit">years old</span>
      </div>
      <div className="age-error">{error}</div>
    </div>
  )
}
