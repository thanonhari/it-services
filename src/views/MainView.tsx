import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Mail, Phone, MapPin, Sun, Moon, ArrowRight, Menu, X, MessageSquareMore, Star,
} from 'lucide-react';
import type { BlogPost, Language, Theme, ToastState } from '../types';
import {
  getT, services, portfolio, API_BASE,
  LINE_ADD_URL, PHONE_DISPLAY, PHONE_HREF, EMAIL_PUBLIC,
  MAPS_REVIEW_URL, MAPS_EMBED_URL, LINE_QR_URL,
} from '../constants';
import TurnstileWidget, { type TurnstileWidgetRef } from '../components/TurnstileWidget';

interface MainViewProps {
  lang: Language;
  theme: Theme;
  blogPosts: BlogPost[];
  isBlogLoading: boolean;
  isSubmitting: boolean;
  isMobileMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onSetIsMobileMenuOpen: (v: boolean) => void;
  onSetIsSubmitting: (v: boolean) => void;
  onSetToast: (toast: ToastState) => void;
}

const MainView: React.FC<MainViewProps> = ({
  lang, theme, blogPosts, isBlogLoading, isSubmitting, isMobileMenuOpen,
  onToggleTheme, onToggleLang, onSetIsMobileMenuOpen, onSetIsSubmitting, onSetToast,
}) => {
  const t = getT(lang);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileWidgetRef>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/config`)
      .then((res) => res.json())
      .then((data) => setTurnstileSiteKey(data.turnstileSiteKey || ''))
      .catch(() => {});
  }, []);

  const handleTurnstileExpire = useCallback(() => setTurnstileToken(''), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (turnstileSiteKey && !turnstileToken) {
      onSetToast({ show: true, message: t.contact.captcha, type: 'error' });
      return;
    }
    onSetIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      website: formData.get('website') as string,
    };

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          raw_message: data.message,
          website: data.website,
          turnstileToken,
        }),
      });
      if (response.ok) {
        onSetToast({ show: true, message: t.contact.success, type: 'success' });
        (e.target as HTMLFormElement).reset();
        setTurnstileToken('');
        turnstileRef.current?.reset();
      } else throw new Error();
    } catch {
      onSetToast({ show: true, message: t.contact.error, type: 'error' });
      turnstileRef.current?.reset();
      setTurnstileToken('');
    } finally {
      onSetIsSubmitting(false);
    }
  };

  const metaDescription =
    lang === 'th'
      ? 'ซ่อมคอมพิวเตอร์ ทำเว็บไซต์ LINE Bot จดโดเมน ฉะเชิงเทรา และทั่วไทย | MYITDEV.COM'
      : 'Computer repair, websites, LINE bots, and hosting in Chachoengsao & Thailand | MYITDEV.COM';

  return (
    <div>
      <a href="#main-content" className="skip-link">
        {lang === 'th' ? 'ข้ามไปเนื้อหาหลัก' : 'Skip to main content'}
      </a>

      <Helmet>
        <title>
          {lang === 'th'
            ? 'MYITDEV | ซ่อมคอม ทำเว็บ LINE Bot ฉะเชิงเทรา'
            : 'MYITDEV | PC Repair, Web & LINE Bots Thailand'}
        </title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content="MYITDEV.COM" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content="https://myitdev.com/" />
        <link rel="canonical" href="https://myitdev.com/" />
      </Helmet>

      {/* Navbar */}
      <nav
        className="container"
        style={{
          position: 'sticky', top: 0, background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
          zIndex: 1000, borderBottom: '1px solid var(--card-border)',
        }}
        aria-label="Primary"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <a href="/" className="nav-logo" style={{ padding: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
            MYITDEV<span style={{ color: 'var(--nav-text)' }}>.COM</span>
          </a>
          <div className="nav-links">
            <a href="#services">{t.nav.services}</a>
            <a href="#portfolio">{t.nav.portfolio}</a>
            <a href="#blog">{t.nav.blog}</a>
            <a href="#contact">{t.nav.contact}</a>
            <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
              <button type="button" onClick={onToggleTheme} className="theme-toggle" aria-label="Toggle Dark/Light Mode" style={{ width: '42px', height: '42px' }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button type="button" onClick={onToggleLang} className="theme-toggle" aria-label="Toggle Language" style={{ fontWeight: 700, width: '42px', height: '42px', fontSize: '0.8rem' }}>
                {lang === 'th' ? 'EN' : 'TH'}
              </button>
            </div>
          </div>
          <button type="button" className="hamburger" onClick={() => onSetIsMobileMenuOpen(true)} aria-label="Open Menu">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal={isMobileMenuOpen} aria-label="Mobile menu">
        <button type="button" onClick={() => onSetIsMobileMenuOpen(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'inherit' }} aria-label="Close Menu">
          <X size={32} />
        </button>
        <a href="#services" onClick={() => onSetIsMobileMenuOpen(false)}>{t.nav.services}</a>
        <a href="#portfolio" onClick={() => onSetIsMobileMenuOpen(false)}>{t.nav.portfolio}</a>
        <a href="#blog" onClick={() => onSetIsMobileMenuOpen(false)}>{t.nav.blog}</a>
        <a href="#contact" onClick={() => onSetIsMobileMenuOpen(false)}>{t.nav.contact}</a>
        <a
          href={LINE_ADD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
          style={{ marginTop: '1rem' }}
          onClick={() => onSetIsMobileMenuOpen(false)}
        >
          {t.hero.cta}
        </a>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
          <button type="button" onClick={onToggleTheme} className="theme-toggle" style={{ width: '50px', height: '50px' }} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button type="button" onClick={onToggleLang} className="theme-toggle" style={{ width: '50px', height: '50px', fontWeight: 700 }} aria-label="Toggle language">
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
      </div>

      <main id="main-content">
        {/* Hero */}
        <header className="hero">
          <div className="container">
            <h1 style={{ whiteSpace: 'pre-line' }}>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
              {t.hero.trust}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={LINE_ADD_URL} target="_blank" rel="noopener noreferrer" className="cta-button">
                {t.hero.cta}
              </a>
              <a href="#contact" className="btn-secondary">{t.hero.secondary}</a>
              <a href="#services" className="btn-secondary">{t.hero.tertiary}</a>
            </div>
          </div>
        </header>

        {/* Services */}
        <section className="container" id="services" style={{ padding: '8rem 0' }} aria-labelledby="services-title">
          <h2 id="services-title" className="section-title">{t.services.title}</h2>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.id} className="service-card">
                <div className="icon-wrapper" aria-hidden="true"><s.icon size={32} /></div>
                <h3>{lang === 'th' ? s.titleTh : s.title}</h3>
                <p>{lang === 'th' ? s.descTh : s.descEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section className="container" id="portfolio" style={{ padding: '4rem 0' }} aria-labelledby="portfolio-title">
          <h2 id="portfolio-title" className="section-title">{t.portfolio.title}</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {t.portfolio.subtitle}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {portfolio.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: '100%', height: '180px', background: item.accent,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={48} color="#fff" strokeWidth={1.5} />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {lang === 'th' ? item.categoryTh : item.category}
                    </p>
                    <h3 style={{ marginBottom: '0.75rem' }}>{lang === 'th' ? item.titleTh : item.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{lang === 'th' ? item.descTh : item.descEn}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Blog */}
        <section className="container" id="blog" style={{ padding: '8rem 0' }} aria-labelledby="blog-title">
          <h2 id="blog-title" className="section-title">{t.blog.title}</h2>
          {isBlogLoading ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)' }} role="status">{t.blog.loading}</div>
          ) : blogPosts.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)' }}>{t.blog.empty}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {blogPosts.map((post) => (
                <article key={post.id} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt=""
                      width={640}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '200px', background: 'var(--card-border)' }} aria-hidden="true" />
                  )}
                  <div style={{ padding: '2rem' }}>
                    <h3>{lang === 'th' ? post.title : post.title_en}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      {t.blog.readMore} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2 id="contact-title">{t.contact.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Mail color="var(--primary)" aria-hidden="true" />
                    <a href={`mailto:${EMAIL_PUBLIC}`} style={{ color: 'inherit' }}>{EMAIL_PUBLIC}</a>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Phone color="var(--primary)" aria-hidden="true" />
                    <a href={PHONE_HREF} style={{ color: 'inherit' }}>{PHONE_DISPLAY}</a>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <MapPin color="var(--primary)" aria-hidden="true" />
                    <div>
                      <span style={{ display: 'block', fontWeight: 'bold' }}>MyIT ร้านซ่อมคอมฯ และเวป</span>
                      <span>Chachoengsao, Thailand</span>
                    </div>
                  </div>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)', marginTop: '0.5rem', height: '200px' }}>
                    <iframe
                      src={MAPS_EMBED_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MyIT ร้านซ่อมคอมฯ และเวป Location"
                    />
                  </div>
                  <a
                    href={MAPS_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f59e0b', color: '#fff',
                      padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', fontWeight: 'bold', textDecoration: 'none',
                      alignSelf: 'flex-start', marginTop: '0.5rem',
                    }}
                  >
                    <Star fill="#fff" size={18} aria-hidden="true" />
                    {lang === 'th' ? 'รีวิวให้เราบน Google' : 'Review us on Google'}
                  </a>
                  <img
                    src={LINE_QR_URL}
                    alt={lang === 'th' ? 'QR เพิ่มเพื่อน LINE MYITDEV' : 'LINE QR code for MYITDEV'}
                    width={150}
                    height={150}
                    loading="lazy"
                    style={{ width: '150px', height: '150px', borderRadius: '12px', marginTop: '1rem' }}
                  />
                </div>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} noValidate>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                    <div>
                      <label htmlFor="contact-name" className="sr-only">{t.contact.name}</label>
                      <input id="contact-name" type="text" name="name" placeholder={t.contact.name} className="form-control" autoComplete="name" required />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">{t.contact.email}</label>
                      <input id="contact-email" type="email" name="email" placeholder={t.contact.email} className="form-control" autoComplete="email" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="sr-only">{t.contact.subject}</label>
                    <input id="contact-subject" type="text" name="subject" placeholder={t.contact.subject} className="form-control" required />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">{t.contact.message}</label>
                    <textarea id="contact-message" name="message" placeholder={t.contact.message} className="form-control" required style={{ height: '150px', resize: 'vertical' }} />
                  </div>
                  {turnstileSiteKey && (
                    <TurnstileWidget
                      ref={turnstileRef}
                      siteKey={turnstileSiteKey}
                      theme={theme}
                      onToken={setTurnstileToken}
                      onExpire={handleTurnstileExpire}
                    />
                  )}
                  <button type="submit" className="submit-btn" disabled={isSubmitting || (!!turnstileSiteKey && !turnstileToken)}>
                    {isSubmitting ? t.contact.sending : t.contact.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — no public Admin link */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">MYITDEV<span style={{ color: 'var(--primary)' }}>.COM</span></div>
          <p>© {new Date().getFullYear()} MYITDEV. {t.footer.rights}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
            {EMAIL_PUBLIC} · {PHONE_DISPLAY}
          </p>
        </div>
      </footer>

      <a href={LINE_ADD_URL} target="_blank" rel="noopener noreferrer" className="line-float" aria-label={lang === 'th' ? 'ติดต่อเราทาง LINE' : 'Contact us on LINE'}>
        <MessageSquareMore aria-hidden="true" />
      </a>
    </div>
  );
};

export default React.memo(MainView);
