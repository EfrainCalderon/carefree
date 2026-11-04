import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ChatApp } from './ChatApp'
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

function Root() {
  const { data, error } = useData()
  if (error) return <p className="p-3">Couldn’t load screening data. Refresh to try again.</p>
  if (!data) return <p className="p-3 text-muted-foreground" role="status">Loading…</p>
  return <ChatApp data={data} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
