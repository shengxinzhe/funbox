// Cloudflare Pages Function: POST /api/subscribe
// Bindings needed: KV namespace "SUBSCRIBERS"

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { ok: false, error: 'invalid_email' },
        { status: 400, headers: CORS }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const existing = await env.SUBSCRIBERS.get(normalizedEmail);
    if (existing) {
      return Response.json(
        { ok: true, message: 'already_subscribed' },
        { headers: CORS }
      );
    }

    // Store subscriber with metadata
    await env.SUBSCRIBERS.put(normalizedEmail, JSON.stringify({
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      lang: request.headers.get('Accept-Language') || 'zh',
    }));

    // Also maintain a subscriber list for easy iteration
    const list = JSON.parse(await env.SUBSCRIBERS.get('__list__') || '[]');
    if (!list.includes(normalizedEmail)) {
      list.push(normalizedEmail);
      await env.SUBSCRIBERS.put('__list__', JSON.stringify(list));
    }

    return Response.json({ ok: true, message: 'subscribed' }, { headers: CORS });
  } catch (err) {
    return Response.json(
      { ok: false, error: 'server_error' },
      { status: 500, headers: CORS }
    );
  }
}
