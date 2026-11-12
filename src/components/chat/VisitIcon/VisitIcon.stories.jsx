import { VisitIcon } from './VisitIcon'

export default { title: 'Plan/VisitIcon', component: VisitIcon, tags: ['autodocs'] }

const IDS = ['primary-care', 'well-woman', 'lab', 'imaging', 'colorectal', 'pharmacy', 'program', 'genetic-counseling']
export const Default = { args: { id: 'primary-care' } }
export const All = { render: () => <div className="flex flex-wrap gap-2">{IDS.map(id => <div key={id} className="flex items-center gap-1"><VisitIcon id={id} />{id}</div>)}</div> }
