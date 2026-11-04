// AgeInput: One number field for age. Only the matching age range is kept; the number stays on the device.
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AgeInput({ value, onSubmit }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  if (value != null) return null
  const submit = e => {
    e.preventDefault()
    const n = Number(text)
    if (!Number.isInteger(n) || n < 1 || n > 120) return setError('Enter your age in years, like 47.')
    if (n < 18) return setError('Carefree is for adults 18 and older.')
    setError('')
    onSubmit(n)
  }
  return (
    <form className="max-w-md space-y-1" onSubmit={submit} noValidate>
      <Label htmlFor="age" className="sr-only">Your age</Label>
      <div className="flex gap-1">
        <Input
          id="age"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          autoComplete="off"
          placeholder="Your age"
          className="w-16"
          value={text}
          aria-invalid={!!error}
          aria-describedby={error ? 'age-error' : undefined}
          onChange={e => { setText(e.target.value.replace(/\D/g, '')); setError('') }}
        />
        <Button type="submit" disabled={!text}>Continue</Button>
      </div>
      {error && <p id="age-error" role="alert" className="text-destructive">{error}</p>}
    </form>
  )
}
