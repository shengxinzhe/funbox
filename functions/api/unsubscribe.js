// Cloudflare Pages Function: GET /api/unsubscribe?email=xxx
// Bindings needed: KV namespace "SUBSCRIBERS"

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const email = (url.searchParams.get('email') || '').toLowerCase().trim();

  if (!email) {
    return new Response('Missing email', { status: 400 });
  }

  // Remove from KV
  await env.SUBSCRIBERS.delete(email);

  // Remove from list
  const list = JSON.parse(await env.SUBSCRIBERS.get('__list__') || '[]');
  const idx = list.indexOf(email);
  if (idx > -1) {
    list.splice(idx, 1);
    await env.SUBSCRIBERS.put('__list__', JSON.stringify(list));
  }

  // Return a friendly HTML page
  return new Response(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Unsubscribed</title>
<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#0a0a0f;color:#e8e8f0}
.box{text-align:center;padding:40px;background:#14141f;border-radius:16px;max-width:400px}
h2{margin-bottom:12px}a{color:#6c63ff}</style></head>
<body><div class="box"><h2>已取消订阅</h2><p>你已成功退订 FunBox 通知邮件。</p><p style="margin-top:16px"><a href="/">返回 FunBox</a></p></div></body></html>`,
    { headers: { 'Content-Type': 'text/html;charset=UTF-8' } }
  );
}
