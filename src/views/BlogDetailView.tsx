import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import type { BlogPost, Language } from '../types';
import { getT, API_BASE } from '../constants';

interface BlogDetailViewProps {
  blogPosts: BlogPost[];
  isBlogLoading: boolean;
  lang: Language;
}

const BlogDetailView: React.FC<BlogDetailViewProps> = ({ blogPosts, isBlogLoading, lang }) => {
  const { id } = useParams<{ id: string }>();
  const t = getT(lang);
  const fromList = blogPosts.find((p) => p.id === id);
  const [fetched, setFetched] = useState<BlogPost | null>(null);
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    if (!id || fromList || isBlogLoading) {
      if (fromList) setFetchDone(true);
      return;
    }
    let cancelled = false;
    setFetchDone(false);
    fetch(`${API_BASE}/api/posts/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && data.id) setFetched(data as BlogPost);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setFetchDone(true);
      });
    return () => { cancelled = true; };
  }, [id, fromList, isBlogLoading]);

  const post = fromList || fetched;
  const stillLoading = isBlogLoading || (!fromList && !fetchDone);

  if (stillLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem', color: 'var(--muted)' }} role="status">
        {t.blog.loading}
      </div>
    );
  }
  if (!post) return <Navigate to="/" replace />;

  const title = lang === 'th' ? post.title : (post.title_en || post.title);
  const body = (lang === 'th' ? post.content_th : (post.content_en || post.content_th) || '').replace(/\\n/g, '\n');
  const pageUrl = `https://myitdev.com/blog/${post.id}`;
  const description = post.excerpt || title;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
      <Helmet>
        <title>{title} | MYITDEV Blog</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={post.image || 'https://myitdev.com/og-image.jpg'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      <nav className="container" style={{ padding: '1.5rem' }} aria-label="Blog">
        <Link to="/#blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          <ChevronLeft size={20} aria-hidden="true" /> {t.blog.back}
        </Link>
      </nav>
      <article className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
        {post.image ? (
          <img
            src={post.image}
            alt=""
            width={800}
            height={400}
            loading="eager"
            decoding="async"
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '24px', marginBottom: '3rem' }}
          />
        ) : null}
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.2 }}>
          {title}
        </h1>
        <div className="preserve-whitespace" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          {body}
        </div>
      </article>
    </div>
  );
};

export default React.memo(BlogDetailView);
