// Term: A word people may not know. Tap, click or press Enter to see what it means; it never relies on hover.
// RichText turns [[marked]] words in copy into Terms (see src/lib/terms.js).
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { defineTerm, parseTerms } from '@/lib/terms'

export function Term({ term, children }) {
  const meaning = defineTerm(term)
  if (!meaning) return children
  return (
    <Popover>
      {/* relative + z-1 keeps the term tappable when it sits on top of a larger tap area, like a visit header. */}
      <PopoverTrigger className="relative z-1 cursor-help rounded-[2px] text-left underline decoration-dotted decoration-1 underline-offset-4 hover:decoration-solid aria-expanded:decoration-solid">
        {children}
      </PopoverTrigger>
      <PopoverContent>{meaning}</PopoverContent>
    </Popover>
  )
}

export function RichText({ children }) {
  return parseTerms(children).map((part, i) =>
    typeof part === 'string' ? part : <Term key={i} term={part.term}>{part.text}</Term>)
}
