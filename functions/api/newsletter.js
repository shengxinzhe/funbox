// Cloudflare Pages Function: POST /api/newsletter
// Bindings: KV "SUBSCRIBERS", Env vars: ADMIN_KEY, RESEND_API_KEY, SITE_URL

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestPost(context) {
  const { env, request } = context;

  // Verify admin key
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token || token !== env.ADMIN_KEY) {
    return Response.json(
      { ok: false, error: 'unauthorized' },
      { status: 401, headers: CORS }
    );
  }

  try {
    const { subject, html } = await request.json();

    if (!subject || !html) {
      return Response.json(
        { ok: false, error: 'missing subject or html' },
        { status: 400, headers: CORS }
      );
    }

    // Get all subscribers
    const list = JSON.parse(await env.SUBSCRIBERS.get('__list__') || '[]');

    if (list.length === 0) {
      return Response.json(
        { ok: true, sent: 0, message: 'no_subscribers' },
        { headers: CORS }
      );
    }

    const siteUrl = env.SITE_URL || 'https://funbox.pages.dev';

    // Send via Resend API (batch, max 100 per call)
    let sent = 0;
    let errors = [];
    const batchSize = 50;

    for (let i = 0; i < list.length; i += batchSize) {
      const batch = list.slice(i, i + batchSize);

      const promises = batch.map(async (email) => {
        const unsubLink = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`;
        const fullHtml = html + `
          <hr style="border:none;border-top:1px solid #333;margin:32px 0 16px">
          <p style="font-size:12px;color:#888;text-align:center">
            不想再收到邮件？<a href="${unsubLink}" style="color:#6c63ff">点击退订</a>
          </p>`;

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.FROM_EMAIL || 'FunBox <noreply@funbox.dev>',
            to: [email],
            subject: subject,
            html: fullHtml,
          }),
        });

        if (res.ok) {
          sent++;
        } else {
          const err = await res.text();
          errors.push({ email, error: err });
        }
      });

      await Promise.all(promises);
    }

    return Response.json(
      { ok: true, sent, total: list.length, errors: errors.length > 0 ? errors : undefined },
      { headers: CORS }
    );
  } catch (err) {
    return Response.json(
      { ok: false, error: err.message },
      { status: 500, headers: CORS }
    );
  }
}
