import { Input } from './input'
import { Label } from './label'

export default { title: 'Primitives/Input', component: Input, tags: ['autodocs'] }

export const WithLabel = {
  render: () => (
    <div className="max-w-xs space-y-1">
      <Label htmlFor="zip" className="text-body font-semibold">Your ZIP code</Label>
      <Input id="zip" inputMode="numeric" placeholder="e.g. 07052" />
    </div>
  ),
}
export const Disabled = { args: { placeholder: 'you@email.com', disabled: true } }
