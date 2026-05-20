import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function buildEmailHtml(plan) {
  const schedulable = plan.filter(r => !r.conditional)
  const askDoctor = plan.filter(r => r.conditional)

  const itemRow = (rec) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="font-size: 15px; font-weight: 500; color: #111;">${rec.plain_name}</div>
        <div style="font-size: 13px; color: #888; margin-top: 2px;">${rec.frequency} &nbsp;·&nbsp; <span style="color: #2a7a5a; font-weight: 500;">$0 with most insurance</span></div>
        ${rec.doctor_prompt ? `<div style="font-size: 13px; color: #555; margin-top: 4px; font-style: italic;">${rec.doctor_prompt.replace(/Ask your doctor:\s*/i, '').replace(/'/g, '')}</div>` : ''}
      </td>
    </tr>`

  const section = (label, items) => items.length === 0 ? '' : `
    <tr>
      <td style="padding: 20px 0 8px;">
        <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #aaa;">${label}</div>
      </td>
    </tr>
    ${items.map(itemRow).join('')}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your preventive care plan</title>
</head>
<body style="margin: 0; padding: 0; background: #f9f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; border-bottom: 1px solid #f0f0f0;">
              <div style="font-size: 22px; font-weight: 700; color: #111; margin-bottom: 6px;">Your preventive care plan</div>
              <div style="font-size: 14px; color: #888;">These screenings are covered at $0 under most ACA-compliant plans. Tap any item to learn more.</div>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 0 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${section('Schedule these', schedulable)}
                ${section('Ask your doctor about these', askDoctor)}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px 32px; border-top: 1px solid #f0f0f0;">
              <div style="font-size: 12px; color: #bbb; line-height: 1.6;">
                Recommendations are based on U.S. Preventive Services Task Force (USPSTF) A &amp; B grade guidelines.
                This is not medical advice — talk to your doctor about what's right for you.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, plan } = req.body

  if (!email || !plan || !Array.isArray(plan)) {
    return res.status(400).json({ error: 'Missing email or plan' })
  }

  try {
    await resend.emails.send({
      from: 'Carefree <hi@efrain.design>',
      to: email,
      subject: `Your preventive care plan (${plan.length} item${plan.length !== 1 ? 's' : ''})`,
      html: buildEmailHtml(plan),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
