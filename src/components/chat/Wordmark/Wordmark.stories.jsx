import { Wordmark } from './Wordmark'

export default { title: 'Form/Wordmark', component: Wordmark, tags: ['autodocs'] }

// No lettermark tile: the weight change carries the idea (care that's free), so there's nothing else to draw.
export const Default = {}
export const OnGradient = { render: () => <div className="cf-gradient rounded-card p-3"><Wordmark /></div> }
