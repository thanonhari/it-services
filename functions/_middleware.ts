interface Env {
  BOT_LOG_SECRET?: string;
}

interface BlogPostMeta {
  id?: string;
  title?: string;
  title_en?: string;
  excerpt?: string;
  image?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectBlogMeta(html: string, post: BlogPostMeta, pathId: string): string {
  const title = escapeHtml(post.title || pathId);
  const description = escapeHtml(post.excerpt || title);
  const image = escapeHtml(post.image || 'https://myitdev.com/og-image.jpg');
  const url = `https://myitdev.com/blog/${encodeURIComponent(post.id || pathId)}`;
  const pageTitle = `${title} | MYITDEV Blog`;

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${pageTitle}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${description}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${description}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${image}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`,
  );
  // Ensure og:type article for blog posts
  if (!/property="og:type"/i.test(out)) {
    out = out.replace('</head>', `<meta property="og:type" content="article" />\n</head>`);
  } else {
    out = out.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="article" />`,
    );
  }
  return out;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';

  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot|xml|json|txt|map|webp)$/i)) {
    return next();
  }

  const aiBotRegex = /(GPTBot|ChatGPT|ClaudeBot|Claude|Google-Extended|Perplexity|OAI-SearchBot|Omgili|FacebookBot|Bytespider|Applebot)/i;
  const searchBotRegex = /(Googlebot|bingbot|YandexBot|Baiduspider|Slurp|DuckDuckBot)/i;

  let botName = '';
  if (aiBotRegex.test(userAgent)) {
    const match = userAgent.match(aiBotRegex);
    botName = match ? match[0] : 'AI Bot';
  } else if (searchBotRegex.test(userAgent)) {
    const match = userAgent.match(searchBotRegex);
    botName = match ? match[0] : 'Search Bot';
  }

  if (botName && env.BOT_LOG_SECRET) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    context.waitUntil(
      fetch('https://notify.myitdev.com/api/bot-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Bot-Log-Secret': env.BOT_LOG_SECRET,
        },
        body: JSON.stringify({
          bot_name: botName,
          user_agent: userAgent,
          path: url.pathname,
          ip_address: ip,
        }),
      }).catch((err) => console.error('Failed to log bot:', err)),
    );
  }

  const response = await next();

  // SPA blog SEO: inject title/description/OG into HTML for crawlers and link previews
  const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/);
  const contentType = response.headers.get('Content-Type') || '';
  if (blogMatch && request.method === 'GET' && contentType.includes('text/html')) {
    const postId = decodeURIComponent(blogMatch[1]);
    try {
      const postRes = await fetch(`https://notify.myitdev.com/api/posts/${encodeURIComponent(postId)}`);
      if (postRes.ok) {
        const post = (await postRes.json()) as BlogPostMeta;
        if (post && (post.id || post.title)) {
          const html = await response.text();
          const injected = injectBlogMeta(html, post, postId);
          const headers = new Headers(response.headers);
          headers.delete('Content-Length');
          return new Response(injected, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        }
      }
    } catch (err) {
      console.error('Blog meta inject failed:', err);
    }
  }

  return response;
};
