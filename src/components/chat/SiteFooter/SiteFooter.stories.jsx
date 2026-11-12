import { SiteFooter } from './SiteFooter'

export default { title: 'Form/SiteFooter', component: SiteFooter, tags: ['autodocs'], decorators: [S => <div className="pt-[240px]"><S /></div>] }

export const Default = {}
// Once there are answers, a quiet "Start over" joins the line.
export const WithReset = { args: { onReset: () => {} } }
