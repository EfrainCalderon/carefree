// Shared checks for the functions that send email: only Carefree's own pages may call them, requests are
// small, and each visitor and each address can only be emailed a few times an hour.
const hits = new Map()

// True if `key` is still under `max` calls in the last `windowMs`; counts this call if so.
export function allow(key, max, windowMs, now = Date.now()) {
  const recent = (hits.get(key) || []).filter(t => now - t < windowMs)
  if (recent.length >= max) { hits.set(key, recent); return false }
  recent.push(now)
  hits.set(key, recent)
  // Keep the map from growing without bound.
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < windowMs)) hits.delete(k)
  return true
}

const HOUR = 60 * 60 * 1000
const visitor = req => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()

function fromThisSite(req) {
  const source = req.headers.origin || req.headers.referer
  if (!source) return false
  try { return new URL(source).host === req.headers.host } catch { return false }
}

const tooMany = res => { res.setHeader('Retry-After', '3600'); return res.status(429).json({ error: 'Too many requests. Try again in an hour.' }) }

// Runs the checks. Returns true if the request may go on; otherwise it has already answered.
// name: the function, for its own counter. max: calls per visitor per hour.
export function guard(req, res, { name, max }) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return false }
  if (!fromThisSite(req)) { res.status(403).json({ error: 'Not allowed' }); return false }
  if (JSON.stringify(req.body ?? {}).length > 10000) { res.status(413).json({ error: 'Too large' }); return false }
  if (!allow(`${name}:${visitor(req)}`, max, HOUR)) { tooMany(res); return false }
  return true
}

// A ceiling on a function as a whole, whoever is calling. For feedback, every note lands in one inbox, so
// many visitors (or one sender behind many addresses) could still flood it without this.
export function allowTotal(res, name, max) {
  if (allow(`all:${name}`, max, HOUR)) return true
  tooMany(res)
  return false
}

// A second limit for plan emails: how often any one address can be sent to, whoever is asking.
export function allowRecipient(res, address, max = 3) {
  if (allow(`to:${address.toLowerCase()}`, max, HOUR)) return true
  tooMany(res)
  return false
}
