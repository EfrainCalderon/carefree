import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ChatApp } from './ChatApp'
import { ComponentsPage } from './ComponentsPage'
import './index.css'

function useData() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    Promise.all([
      fetch('/data/recommendations.json').then(r => r.json()),
      fetch('/data/visits.json').then(r => r.json()),
    ])
      .then(([r, v]) => setData({ recs: r.recommendations, visits: v.visits }))
      .catch(setError)
  }, [])
  return { data, error }
}

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

function Root() {
  const { data, error } = useData()
  const hash = useHash()
  if (error) return <p className="p-6 text-sm">Couldn’t load screening data. Refresh to try again.</p>
  if (!data) return <p className="p-6 text-sm text-muted-foreground" role="status">Loading…</p>
  return hash === '#/components' ? <ComponentsPage data={data} /> : <ChatApp data={data} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TooltipProvider>
      <Root />
    </TooltipProvider>
  </React.StrictMode>
)
