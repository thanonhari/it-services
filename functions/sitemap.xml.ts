interface BlogPostRow {
  id: string;
  date?: string;
  created_at?: string;
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function urlEntry(loc: string, lastmod?: string, changefreq = 'weekly', priority = '0.8'): string {
  const lm = lastmod ? `\n    <lastmod>${xmlEscape(lastmod.slice(0, 10))}</lastmod>` : '';
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>${lm}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const onRequestGet: PagesFunction = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries: string[] = [
    urlEntry('https://myitdev.com/', today, 'weekly', '1.0'),
  ];

  try {
    const res = await fetch('https://notify.myitdev.com/api/posts', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = (await res.json()) as BlogPostRow[] | { error?: string };
      if (Array.isArray(data)) {
        for (const post of data) {
          if (!post?.id) continue;
          const lastmod = post.date || post.created_at || today;
          entries.push(
            urlEntry(`https://myitdev.com/blog/${encodeURIComponent(post.id)}`, lastmod, 'monthly', '0.7'),
          );
        }
      }
    }
  } catch (err) {
    console.error('sitemap posts fetch failed', err);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
