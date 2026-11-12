import { RichText, Term } from './Term'

export default { title: 'Plan/Term', component: Term, tags: ['autodocs'] }

// A dotted underline marks a word with a definition. It opens on tap, click or Enter.
export const InASentence = { render: () => <p className="pt-8">With a <Term term="primary care provider">primary care provider</Term></p> }
// Copy in the data files marks terms with [[double brackets]]; RichText renders them.
export const FromCopy = { render: () => <p className="pt-8"><RichText>{'$0 with [[in-network]] providers'}</RichText></p> }
// On the plan header the term takes the header's color.
export const OnGradient = { render: () => <p className="cf-gradient mt-8 rounded-card p-3"><RichText>{'$0 with [[in-network]] providers'}</RichText></p> }
