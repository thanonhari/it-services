import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import LiffForm from './LiffForm';
import MainView from './views/MainView';
import BlogDetailView from './views/BlogDetailView';
import type {
  BlogPost, AdminData, LineUser, ChatMessage, RichMenu, ToastState, Language, Theme,
} from './types';
import { API_BASE, API_CREDENTIALS } from './constants';

const AdminView = lazy(() => import('./views/AdminView'));

function App() {
  // ── Global UI State ──────────────────────────────────────────────────────────
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'dark');
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Auth & Admin State ───────────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  // ── Blog State ───────────────────────────────────────────────────────────────
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // ── LINE Community State ─────────────────────────────────────────────────────
  const [selectedUser, setSelectedUser] = useState<LineUser | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [userFilter, setUserFilter] = useState('');
  const [pushingTo, setPushingTo] = useState<string | null>(null);
  const [pushMessage, setPushMessage] = useState('');

  // ── Rich Menu State ──────────────────────────────────────────────────────────
  const [richMenus, setRichMenus] = useState<RichMenu[]>([]);
  const [activeRichMenuId, setActiveRichMenuId] = useState<string | null>(null);
  const [isMenuLoading, setIsMenuLoading] = useState(false);

  // ── AI Lab State ─────────────────────────────────────────────────────────────
  const [labPrompt, setLabPrompt] = useState('');
  const [labResult, setLabResult] = useState('');
  const [isLabLoading, setIsLabLoading] = useState(false);

  // ── Form Submit State ────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ── Theme & Lang Effects ─────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // ── Legacy hash redirects ──────────────────────────────────────────────────────
  useEffect(() => {
    if (location.hash.startsWith('#blog/')) {
      navigate(`/blog/${location.hash.replace('#blog/', '')}`);
    } else if (location.hash === '#admin') {
      navigate('/admin');
    }
  }, [location.hash, navigate]);

  // ── Session auth check (httpOnly cookie) ─────────────────────────────────────
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, API_CREDENTIALS);
      const data = await res.json();
      setIsAuthenticated(data.authenticated === true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setAuthChecked(false);
      checkAuth();
    }
  }, [location.pathname, checkAuth]);

  // ── Scroll Effect ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Toast Auto-dismiss ───────────────────────────────────────────────────────
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // ── Data Fetching ────────────────────────────────────────────────────────────
  const fetchBlogPosts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/posts`);
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
      setBlogPosts(Array.isArray(data) ? data : []);
    } catch { console.error('Failed to load blog posts'); setBlogPosts([]); }
    finally { setIsBlogLoading(false); }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', ...API_CREDENTIALS });
    } catch { /* ignore */ }
    setIsAuthenticated(false);
    setAdminData(null);
    navigate('/');
  }, [navigate]);

  const fetchAdminData = useCallback(() => {
    if (location.pathname !== '/admin' || !isAuthenticated) return;
    fetch(`${API_BASE}/api/leads`, API_CREDENTIALS)
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setAdminData({
        leads: Array.isArray(data.leads) ? data.leads : [],
        users: Array.isArray(data.users) ? data.users : [],
        bot_logs: Array.isArray(data.bot_logs) ? data.bot_logs : [],
        stats: data.stats ?? { aiMessagesToday: 0 },
      }))
      .catch(() => handleLogout());
  }, [location.pathname, isAuthenticated, handleLogout]);

  const fetchRichMenus = useCallback(async () => {
    if (location.pathname !== '/admin' || !isAuthenticated) return;
    setIsMenuLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/richmenus`, API_CREDENTIALS);
      if (res.ok) {
        const data = await res.json();
        setRichMenus(Array.isArray(data.richMenus) ? data.richMenus : []);
        setActiveRichMenuId(data.defaultId ?? null);
      }
    } catch { console.error('Failed to load rich menus'); }
    finally { setIsMenuLoading(false); }
  }, [location.pathname, isAuthenticated]);

  const fetchChatHistory = useCallback(async (user: LineUser) => {
    setSelectedUser(user);
    setIsHistoryLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/history/${user.user_id}`, API_CREDENTIALS);
      if (res.ok) setChatHistory(await res.json());
      else throw new Error();
    } catch { setToast({ show: true, message: 'Failed to load history', type: 'error' }); }
    finally { setIsHistoryLoading(false); }
  }, []);

  useEffect(() => { fetchBlogPosts(); }, [fetchBlogPosts]);
  useEffect(() => {
    if (location.pathname === '/admin' && isAuthenticated) {
      fetchAdminData();
      fetchRichMenus();
    }
  }, [location.pathname, isAuthenticated, fetchAdminData, fetchRichMenus]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang((prev) => (prev === 'th' ? 'en' : 'th'));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainView
              lang={lang}
              theme={theme}
              blogPosts={blogPosts}
              isBlogLoading={isBlogLoading}
              isSubmitting={isSubmitting}
              isMobileMenuOpen={isMobileMenuOpen}
              onToggleTheme={toggleTheme}
              onToggleLang={toggleLang}
              onSetIsMobileMenuOpen={setIsMobileMenuOpen}
              onSetIsSubmitting={setIsSubmitting}
              onSetToast={setToast}
            />
          }
        />
        <Route
          path="/blog/:id"
          element={
            <BlogDetailView
              blogPosts={blogPosts}
              isBlogLoading={isBlogLoading}
              lang={lang}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>Loading Admin…</div>}>
            <AdminView
              isAuthenticated={isAuthenticated}
              authChecked={authChecked}
              adminData={adminData}
              blogPosts={blogPosts}
              richMenus={richMenus}
              activeRichMenuId={activeRichMenuId}
              isMenuLoading={isMenuLoading}
              lang={lang}
              theme={theme}
              userFilter={userFilter}
              pushingTo={pushingTo}
              pushMessage={pushMessage}
              labPrompt={labPrompt}
              labResult={labResult}
              isLabLoading={isLabLoading}
              isSubmitting={isSubmitting}
              onToggleTheme={toggleTheme}
              onLogout={handleLogout}
              onSetToast={setToast}
              onSetUserFilter={setUserFilter}
              onSetPushingTo={setPushingTo}
              onSetPushMessage={setPushMessage}
              onSetLabPrompt={setLabPrompt}
              onSetLabResult={setLabResult}
              onSetIsLabLoading={setIsLabLoading}
              onSetIsSubmitting={setIsSubmitting}
              onSetActiveRichMenuId={setActiveRichMenuId}
              onSetIsMenuLoading={setIsMenuLoading}
              onSetEditingPost={setEditingPost}
              onRefreshAdmin={fetchAdminData}
              onRefreshBlog={fetchBlogPosts}
              onFetchChatHistory={fetchChatHistory}
              selectedUser={selectedUser}
              chatHistory={chatHistory}
              isHistoryLoading={isHistoryLoading}
              onCloseHistory={() => setSelectedUser(null)}
              editingPost={editingPost}
            />
            </Suspense>
          }
        />
        <Route path="/liff-form" element={<LiffForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global UI — Scroll Top & Toast */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to Top"
      >
        <ArrowUp size={24} />
      </button>
      <div className={`toast-container ${toast.show ? 'show' : ''} ${toast.type}`}>
        <div className="toast-content"><span>{toast.message}</span></div>
      </div>
    </>
  );
}

export default App;