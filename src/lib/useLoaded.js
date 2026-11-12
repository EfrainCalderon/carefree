import { useEffect, useState } from 'react'

// True once fonts have loaded, so a staged reveal doesn't start while the text is still swapping fonts.
// It never waits more than half a second, and never waits on an animation frame: browsers pause frames
// in background tabs and embedded previews, and content must not stay hidden there.
export function useLoaded() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    let alive = true
    const show = () => alive && setLoaded(true)
    const timer = setTimeout(show, 500)
    ;(document.fonts?.ready ?? Promise.resolve()).then(show, show)
    return () => { alive = false; clearTimeout(timer) }
  }, [])
  return loaded
}

// Props for the nth block of a staged reveal: hidden until loaded, then it rises in turn.
export const riseProps = (loaded, i) => (loaded ? { className: 'cf-rise', style: { '--i': i } } : { className: 'opacity-0' })
