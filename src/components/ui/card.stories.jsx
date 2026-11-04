import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

export default { title: 'Primitives/Card', component: Card, tags: ['autodocs'] }

export const Default = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader><CardTitle>Your doctor will likely ask how you’ve been feeling</CardTitle><CardDescription>It’s part of every checkup.</CardDescription></CardHeader>
      <CardContent>Cards are flat: white surface, 1px border, 12px radius.</CardContent>
    </Card>
  ),
}
