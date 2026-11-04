// Same theme as the app: tokens.css → shadcn variables → Tailwind (src/app/index.css).
import '../src/app/index.css'
import { TooltipProvider } from '../src/components/ui/tooltip'

/** @type {import('@storybook/react').Preview} */
const preview = {
  decorators: [Story => <TooltipProvider><Story /></TooltipProvider>],
  parameters: {
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#f4f6f4' },
        { name: 'surface', value: '#ffffff' },
      ],
    },
    layout: 'padded',
    options: { storySort: { order: ['Introduction', 'Foundations', 'Chat', ['Conversation', 'Cards', 'Plan'], 'Primitives'] } },
  },
}

export default preview
