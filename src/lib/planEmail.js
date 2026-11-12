// The plan as an email. Pure: takes a plan from derivePlan (src/app/logic.js) and returns { subject, html, text }.
// The plan page (preview) and the mail function (api/send-plan.js) both use it, so they can't drift apart.
//
// Built to survive every mail client:
// - Tables and inline styles only. No flexbox, grid, CSS variables, images, web fonts or scripts.
// - Colors are solid, with a bgcolor attribute beside each background. The header's gradient is an extra on top
//   of a solid green, so clients that drop gradients (Outlook on Windows) still get the brand color.
// - 600px wide at most, fluid below that, 16px text, bullets drawn as table cells (list markup is unreliable).
// - Marked light-only, so dark mode doesn't invert half of it.
// - A plain-text version says the same thing for clients and people that don't show HTML.
import { visitGroups } from './visits.js'
import { plainText } from './terms.js'

// Mirrors tokens/tokens.json (email can't read CSS variables). Update both together.
const C = {
  page: '#f4f6f4', surface: '#ffffff', border: '#dde3df', tint: '#e4ece7',
  ink: '#16291f', muted: '#3f5e4d', faint: '#9fb6a8', brand: '#234235', brandLight: '#34594a', brandDark: '#183027',
}
// Red Hat Text can't be relied on in email, so this is the closest system stack.
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const t = s => esc(plainText(s))

const text = (color = C.ink, extra = '') => `margin:0;font-family:${FONT};font-size:16px;line-height:24px;color:${color};${extra}`
const p = (html, color, extra) => `<p style="${text(color, extra)}">${html}</p>`
const label = s => p(esc(s), C.muted, 'font-weight:600;')
const gap = h => `<tr><td height="${h}" style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</td></tr>`
const row = html => `<tr><td>${html}</td></tr>`

const bullets = items => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  ${items.map(html => `<tr>
    <td width="24" valign="top" style="width:24px;${text(C.faint)}">&bull;</td>
    <td valign="top" style="padding-bottom:4px;${text()}">${html}</td>
  </tr>`).join('')}
</table>`

const script = (lead, words) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td bgcolor="${C.tint}" style="background-color:${C.tint};border-radius:8px;padding:16px;">
    ${label(lead)}
    ${p(`&ldquo;${esc(words)}&rdquo;`, C.ink, 'font-weight:600;')}
  </td></tr>
</table>`

function visitBlock(visit, { finder, askIf = [] } = {}) {
  const parts = [
    `<h3 style="${text(C.ink, 'font-size:20px;line-height:28px;font-weight:700;')}">${esc(visit.name)}</h3>${p(t(visit.who), C.muted)}`,
  ]
  if (visit.say) parts.push(script('When you book, say', visit.say))
  if (visit.how) parts.push(p(esc(visit.how)))
  if (finder) {
    parts.push([
      label(finder.title),
      p(esc(finder.text)),
      finder.ask ? p(`Ask: &ldquo;${esc(finder.ask)}&rdquo;`, C.ink, 'font-weight:600;') : '',
      finder.more ? p(esc(finder.more), C.muted) : '',
      finder.link ? p(`<a href="${esc(finder.link.href)}" style="color:${C.brand};font-weight:600;text-decoration:underline;">${esc(finder.link.label)}</a>`) : '',
    ].join(''))
  }
  for (const g of visitGroups(visit))
    parts.push(label(g.label) + bullets(g.items.map(it => t(it.text) + (it.note ? ` <span style="color:${C.muted};">&middot; ${esc(it.note)}</span>` : ''))))
  if (askIf.length)
    parts.push(label('Ask if these apply to you') + bullets(askIf.map(({ rec, note }) =>
      `${esc(rec.plain_name)}<br><span style="color:${C.muted};">${t(rec.applies)}${note ? ` ${esc(note)}.` : ''}</span>`)))
  if (visit.tip) parts.push(p(`<strong style="color:${C.ink};">Good to know:</strong> ${esc(visit.tip)}`, C.muted))
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.surface}" style="background-color:${C.surface};border:1px solid ${C.border};border-radius:16px;border-collapse:separate;">
  <tr><td style="padding:16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${parts.map(row).join(gap(16))}
    </table>
  </td></tr>
</table>`
}

function visitText(visit, { finder, askIf = [] } = {}) {
  const lines = [`${visit.name.toUpperCase()}`, plainText(visit.who)]
  if (visit.say) lines.push('', `When you book, say: “${visit.say}”`)
  if (visit.how) lines.push('', visit.how)
  if (finder) lines.push('', finder.title, finder.text, ...(finder.ask ? [`Ask: “${finder.ask}”`] : []), ...(finder.more ? [finder.more] : []), ...(finder.link ? [`${finder.link.label}: ${finder.link.href}`] : []))
  for (const g of visitGroups(visit)) lines.push('', `${g.label}:`, ...g.items.map(it => `- ${plainText(it.text)}${it.note ? ` (${it.note})` : ''}`))
  if (askIf.length) lines.push('', 'Ask if these apply to you:', ...askIf.map(({ rec, note }) => `- ${rec.plain_name}: ${plainText(rec.applies)}${note ? ` ${note}.` : ''}`))
  if (visit.tip) lines.push('', `Good to know: ${visit.tip}`)
  return lines.join('\n')
}

const SOURCE = 'Based on the U.S. Preventive Services Task Force’s A and B recommendations. This isn’t medical advice. Your doctor can tell you what’s right for you.'
const WHY = 'You’re getting this because this address was entered at Carefree. It’s the only email we’ll send.'

export function buildPlanEmail(plan) {
  const book = plan.visits.filter(v => v.kind === 'book')
  const follow = plan.visits.filter(v => v.kind !== 'book')
  const coverage = plainText(plan.coverage)
  const subject = 'Your plan from Carefree'
  const first = i => (i === 0 ? { finder: plan.finder, askIf: plan.askDoctor } : {})

  const section = (title, visits, opts = () => ({})) => (visits.length ? [
    row(`<h2 style="${text(C.muted, 'font-weight:600;')}">${esc(title)}</h2>`),
    gap(8),
    visits.map((v, i) => row(visitBlock(v, opts(i)))).join(gap(8)),
    gap(24),
  ].join('') : '')

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(subject)}</title>
<!--[if mso]><style>table, td, p, h1, h2, h3, a, span { font-family: Arial, sans-serif !important; }</style><![endif]-->
<style>
  :root { color-scheme: light only; }
  body { margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; }
  table { border-spacing: 0; }
  @media (max-width: 480px) { .cf-pad { padding-left: 16px !important; padding-right: 16px !important; } }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.page};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${C.page};">${esc(`${plan.summary} ${coverage}.`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background-color:${C.page};">
  <tr><td align="center" style="padding:24px 8px;">
    <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
      <tr><td class="cf-pad" bgcolor="${C.brand}" style="background-color:${C.brand};background-image:linear-gradient(160deg,${C.brandLight} 0%,${C.brand} 55%,${C.brandDark} 100%);border-radius:16px;padding:24px;">
        ${p('Care<strong>free</strong>', '#ffffff', 'font-size:20px;')}
        <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
        <h1 style="${text('#ffffff', 'font-size:24px;line-height:32px;font-weight:700;')}">Your plan</h1>
        ${p(esc(plan.summary), '#ffffff', 'font-weight:600;')}
        ${p(esc(coverage), C.tint)}
      </td></tr>
      ${gap(24)}
      ${plan.note ? row(p(esc(plan.note), C.muted, 'padding:0 16px;')) + gap(24) : ''}
      ${section('Start here', book, first)}
      ${section('What may come after', follow)}
      <tr><td class="cf-pad" style="border-top:1px solid ${C.border};padding:24px 16px 8px;">
        ${p(esc(SOURCE), C.muted)}
        <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
        ${p(esc(WHY), C.muted)}
      </td></tr>
    </table>
    <!--[if mso]></td></tr></table><![endif]-->
  </td></tr>
</table>
</body>
</html>`

  const body = [
    'YOUR PLAN',
    plan.summary,
    coverage,
    ...(plan.note ? ['', plan.note] : []),
    ...(book.length ? ['', '', '== START HERE ==', '', book.map((v, i) => visitText(v, first(i))).join('\n\n')] : []),
    ...(follow.length ? ['', '', '== WHAT MAY COME AFTER ==', '', follow.map(v => visitText(v)).join('\n\n')] : []),
    '', '', SOURCE, '', WHY,
  ].join('\n')

  return { subject, html, text: body }
}
