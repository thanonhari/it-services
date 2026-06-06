import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Wrench, 
  Globe, 
  Search,
  Code,
  MessageSquareMore,
  ShieldCheck,
  Cpu,
  Layers,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
  Clock,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  XCircle,
  X,
  Users,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  Check,
  Activity,
  History,
  Terminal,
  Send,
  Zap,
  Bot,
  Plus
} from 'lucide-react';
import LiffForm from './LiffForm';

// --- Translations ---
const translations = {
  th: {
    nav: { services: 'บริการ', portfolio: 'ผลงาน', blog: 'บทความ', contact: 'ติดต่อเรา' },
    hero: { title: 'โซลูชัน IT สมัยใหม่\nสำหรับยุคดิจิทัล', subtitle: 'เราคือพาร์ทเนอร์ด้านเทคโนโลยีที่พร้อมดูแลคุณ ตั้งแต่การซ่อมบำรุงขั้นพื้นฐาน ไปจนถึงการพัฒนาซอฟต์แวร์ระดับสูง เพื่อขับเคลื่อนธุรกิจของคุณสู่ความสำเร็จ', cta: 'เริ่มเลยตอนนี้', secondary: 'ดูบริการของเรา' },
    features: { secure: 'ปลอดภัย & เชื่อถือได้', performance: 'ประสิทธิภาพสูง', scalable: 'เทคโนโลยีทันสมัย' },
    services: { title: 'บริการที่เชี่ยวชาญ', service: 'บริการที่' },
    portfolio: { title: 'ความสำเร็จของเรา', subtitle: 'ตัวอย่างผลงานที่เราได้ร่วมสร้างสรรค์ให้กับลูกค้า' },
    blog: { title: 'ศูนย์รวมความรู้', subtitle: 'บทความสาระน่ารู้เกี่ยวกับ IT เพื่อช่วยให้ธุรกิจของคุณเติบโต', readMore: 'อ่านต่อ', back: 'กลับไปหน้าหลัก' },
    contact: { title: 'สร้างสรรค์สิ่งดีๆ ไปด้วยกัน', name: 'ชื่อ-นามสกุล', email: 'อีเมล', subject: 'หัวข้อ', message: 'ข้อความ', submit: 'ส่งข้อความ', sending: 'กำลังส่ง...', success: 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุดครับ', error: 'เกิดข้อผิดพลาด กรุณาลองใหม่ครับ' },
    footer: { rights: 'สงวนลิขสิทธิ์' }
  },
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', blog: 'Blog', contact: 'Contact' },
    hero: { title: 'Modern IT Solutions\nfor the Digital Age', subtitle: 'Your technology partner ready to support you from basic maintenance to advanced software development, driving your business toward success.', cta: 'Get Started Now', secondary: 'View Services' },
    features: { secure: 'Secure & Reliable', performance: 'High Performance', scalable: 'Scalable Tech' },
    services: { title: 'Our Specialized Services', service: 'Service' },
    portfolio: { title: 'Success Stories', subtitle: 'Examples of work we have co-created for our clients.' },
    blog: { title: 'Knowledge Hub', subtitle: 'Interesting IT articles to help your business grow.', readMore: 'Read More', back: 'Back to Main' },
    contact: { title: "Let's build something\ngreat together.", name: 'Full Name', email: 'Email Address', subject: 'Subject', message: 'Message', submit: 'Send Message', sending: 'Sending...', success: 'Message sent! We will get back to you soon.', error: 'Something went wrong, please try again.' },
    footer: { rights: 'All rights reserved.' }
  }
};

const services = [
  { id: 1, title: 'Computer Repair', titleTh: 'ซ่อมคอมพิวเตอร์', descEn: 'Expert hardware diagnostic and software recovery for PC & Laptops.', descTh: 'บริการซ่อมคอมพิวเตอร์และโน้ตบุ๊ก ตรวจเช็คอาการ กู้ข้อมูล และอัปเกรดเครื่องให้เร็วแรง', icon: Wrench },
  { id: 2, title: 'Website Management', titleTh: 'ดูแลเว็บไซต์', descEn: 'Ongoing maintenance, security audits, and performance optimization.', descTh: 'ดูแลรักษาเว็บไซต์ ตรวจสอบความปลอดภัย และเพิ่มประสิทธิภาพให้เว็บของคุณทำงานได้ลื่นไหลเสมอ', icon: Globe },
  { id: 3, title: 'Domain & Hosting', titleTh: 'จดโดเมน & โฮสติ้ง', descEn: 'Secure domain registration and high-speed enterprise hosting.', descTh: 'บริการจดชื่อโดเมนและพื้นที่โฮสติ้งความเร็วสูง พร้อมระบบความปลอดภัยจาก Cloudflare', icon: Search },
  { id: 4, title: 'Custom Software', titleTh: 'รับจ้างเขียนโปรแกรม', descEn: 'Bespoke software development and automation scripts.', descTh: 'รับเขียนโปรแกรมตามความต้องการ ระบบอัตโนมัติ และจัดการฐานข้อมูลที่ออกแบบมาเพื่อคุณโดยเฉพาะ', icon: Code },
  { id: 5, title: 'LINE Chatbots', titleTh: 'รับทำ LINE Bot', descEn: 'Professional LINE OA integration and automated response systems.', descTh: 'พัฒนา LINE Chatbot สำหรับธุรกิจ ระบบตอบกลับอัตโนมัติ และเชื่อมต่อ API เพื่อความสะดวก', icon: MessageSquareMore },
];

const portfolio = [
  { title: 'E-Commerce Solution', category: 'Web Development', descEn: 'Full-stack online store with real-time inventory.', descTh: 'ระบบร้านค้าออนไลน์ครบวงจร พร้อมระบบจัดการสต็อกสินค้าแบบ Real-time', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800' },
  { title: 'Smart Office Bot', category: 'LINE Chatbots', descEn: 'Automated response system for office management.', descTh: 'ระบบตอบกลับอัตโนมัติสำหรับจัดการงานในออฟฟิศผ่านแอป LINE', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800' },
  { title: 'ERP Dashboard', category: 'Custom Software', descEn: 'Enterprise resource planning system.', descTh: 'ระบบวางแผนทรัพยากรองค์กรขนาดใหญ่ สำหรับอุตสาหกรรมการผลิต', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' }
];

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'th');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#home');
  const [authToken, setAuthToken] = useState(localStorage.getItem('admin_token') || '');
  const [adminData, setAdminData] = useState<{ leads: any[], users: any[], stats?: { aiMessagesToday: number } } | null>(null);
  const [pushingTo, setPushingTo] = useState<string | null>(null);
  const [pushMessage, setPushMessage] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [labPrompt, setLabPrompt] = useState('');
  const [labResult, setLabResult] = useState('');
  const [isLabLoading, setIsLabLoading] = useState(false);
  const [richMenus, setRichMenus] = useState<any[]>([]);
  const [activeRichMenuId, setActiveRichMenuId] = useState<string | null>(null);
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  
  // New CMS States
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const t = translations[lang as 'th' | 'en'];
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Load Dynamic Blog Posts
  const fetchBlogPosts = async () => {
    try {
      const res = await fetch('https://notify.myitdev.com/api/posts');
      const data = await res.json();
      setBlogPosts(data);
    } catch (err) {
      console.error('Failed to load blog posts');
    } finally {
      setIsBlogLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Handle Legacy Hash URLs & Auth Redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('auth');
    if (token) {
      setAuthToken(token);
      localStorage.setItem('admin_token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/admin');
    }

    if (location.hash.startsWith('#blog/')) {
       const id = location.hash.replace('#blog/', '');
       navigate(`/blog/${id}`);
    } else if (location.hash === '#admin') {
       navigate('/admin');
    }
  }, [location.hash, navigate]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast(prev => ({ ...prev, show: false })), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const fetchAdminData = () => {
    if (location.pathname === '/admin' && authToken) {
      fetch('https://notify.myitdev.com/api/leads', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      .then(res => res.json())
      .then(data => setAdminData(data))
      .catch(() => handleLogout());
    }
  };

  const fetchRichMenus = async () => {
    if (location.pathname !== '/admin' || !authToken) return;
    setIsMenuLoading(true);
    try {
      const response = await fetch('https://notify.myitdev.com/api/richmenus', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRichMenus(data.richMenus);
        setActiveRichMenuId(data.defaultId);
      }
    } catch (err) {
      console.error('Failed to load rich menus');
    } finally {
      setIsMenuLoading(false);
    }
  };

  useEffect(() => { 
    if (location.pathname === '/admin') {
      fetchAdminData(); 
      fetchRichMenus();
    }
  }, [location.pathname, authToken]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'th' ? 'en' : 'th');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string
    };
    const lineMessage = `📩 มีข้อความใหม่จากเว็บไซต์!\n👤 ชื่อ: ${data.name}\n📧 อีเมล: ${data.email}\n📝 หัวข้อ: ${data.subject}\n💬 ข้อความ: ${data.message}`;

    try {
      const response = await fetch('https://notify.myitdev.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bot_type: 'line',
          to: 'U479cd1d85a53d6576df48d7c8c6a4930',
          message: lineMessage,
          name: data.name,
          email: data.email,
          subject: data.subject,
          raw_message: data.message
        })
      });
      if (response.ok) {
        setToast({ show: true, message: t.contact.success, type: 'success' });
        (e.target as HTMLFormElement).reset();
      } else throw new Error();
    } catch (err) {
      setToast({ show: true, message: t.contact.error, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await fetch(`https://notify.myitdev.com/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchAdminData();
    } catch (err) { alert('Update failed'); }
  };

  const handleUpdateNotes = async (id: number, notes: string) => {
    try {
      await fetch(`https://notify.myitdev.com/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      fetchAdminData();
      setToast({ show: true, message: 'Notes saved!', type: 'success' });
    } catch (err) { alert('Save failed'); }
  };

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  const handlePushMessage = async (userId: string) => {
    if (!pushMessage.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://notify.myitdev.com/api/push', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ userId, message: pushMessage })
      });
      if (response.ok) {
        setToast({ show: true, message: 'Message sent successfully!', type: 'success' });
        setPushMessage('');
        setPushingTo(null);
      } else {
        const err = await response.json();
        throw new Error(err.error || 'Failed to send');
      }
    } catch (err: any) {
      setToast({ show: true, message: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAI = async (userId: string, currentStatus: number) => {
    try {
      const response = await fetch(`https://notify.myitdev.com/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ ai_enabled: currentStatus === 1 ? 0 : 1 })
      });
      if (response.ok) {
        fetchAdminData();
        setToast({ show: true, message: 'AI Status updated!', type: 'success' });
      } else throw new Error();
    } catch (err) {
      setToast({ show: true, message: 'Failed to update AI status', type: 'error' });
    }
  };

  const handleUpdateTags = async (userId: string, tags: string) => {
    try {
      const response = await fetch(`https://notify.myitdev.com/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ tags })
      });
      if (response.ok) {
        fetchAdminData();
        setToast({ show: true, message: 'Tags updated!', type: 'success' });
      } else throw new Error();
    } catch (err) {
      setToast({ show: true, message: 'Failed to update tags', type: 'error' });
    }
  };

  const fetchChatHistory = async (user: any) => {
    setSelectedUser(user);
    setIsHistoryLoading(true);
    try {
      const response = await fetch(`https://notify.myitdev.com/api/history/${user.user_id}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChatHistory(data);
      } else throw new Error();
    } catch (err) {
      setToast({ show: true, message: 'Failed to load history', type: 'error' });
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const generateWithAI = async (customPrompt?: string) => {
    const prompt = customPrompt || labPrompt;
    if (!prompt.trim()) return;
    
    setIsLabLoading(true);
    try {
      const response = await fetch('https://notify.myitdev.com/api/ai/gen', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ prompt })
      });
      if (response.ok) {
        const data = await response.json();
        const result = data.choices[0].message.content;
        setLabResult(result);
        if (!customPrompt) setLabPrompt('');
      } else throw new Error('AI Hub unreachable. Try again later.');
    } catch (err: any) {
      setToast({ show: true, message: err.message, type: 'error' });
    } finally {
      setIsLabLoading(false);
    }
  };

  const handleSetDefaultRichMenu = async (menuId: string) => {
    setIsMenuLoading(true);
    try {
      const response = await fetch(`https://notify.myitdev.com/api/richmenus/default/${menuId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        setActiveRichMenuId(menuId);
        setToast({ show: true, message: 'Rich Menu updated!', type: 'success' });
      }
    } catch (err) {
      setToast({ show: true, message: 'Update failed', type: 'error' });
    } finally {
      setIsMenuLoading(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      title_en: formData.get('title_en') as string,
      excerpt: formData.get('excerpt') as string,
      content_th: formData.get('content_th') as string,
      content_en: formData.get('content_en') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      image: formData.get('image') as string,
      category: formData.get('category') as string,
    };

    try {
      const res = await fetch('https://notify.myitdev.com/api/posts', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postData)
      });
      if (res.ok) {
        setToast({ show: true, message: 'Post saved successfully!', type: 'success' });
        setEditingPost(null);
        fetchBlogPosts();
      }
    } catch (err) {
      setToast({ show: true, message: 'Failed to save post', type: 'error' });
    }
  };

  // --- View Components ---

  const AdminView = () => {
    const aiUsage = adminData?.stats?.aiMessagesToday || 0;
    const aiQuota = 150;
    const aiPercentage = Math.min((aiUsage / aiQuota) * 100, 100);

    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', padding: '2rem 0' }}>
        <Helmet><title>Admin Hub | MYITDEV</title></Helmet>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><LayoutDashboard size={32} color="var(--primary)" /><h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Admin Hub</h1></div>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button onClick={toggleTheme} className="theme-toggle"><Sun size={20} /></button>
               {authToken && <button onClick={handleLogout} className="theme-toggle" style={{ color: '#ef4444' }} title="Logout"><LogOut size={20} /></button>}
               <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Exit Admin</Link>
            </div>
          </div>

          {!authToken ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <h2 style={{ marginBottom: '2rem' }}>Authentication Required</h2>
              <a href="https://notify.myitdev.com/auth/login" className="cta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: '#06c755' }}>Login with LINE</a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="service-card" style={{ padding: '1.5rem' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><Users size={16}/> Total Leads</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{adminData?.leads.length || 0}</div>
                </div>
                <div className="service-card" style={{ padding: '1.5rem' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><MessageSquareMore size={16}/> LINE Community</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{adminData?.users.length || 0}</div>
                </div>
                <div className="service-card" style={{ padding: '1.5rem', borderColor: aiPercentage > 80 ? '#ef4444' : 'var(--card-border)' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} color={aiPercentage > 80 ? '#ef4444' : '#10b981'}/> AI Quota</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{aiUsage} / {aiQuota}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--input-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${aiPercentage}%`, height: '100%', background: aiPercentage > 80 ? '#ef4444' : 'var(--primary)' }}></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Blog CMS Section */}
              <div className="service-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                   <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Code size={18} /> Content Management (Blog)</h3>
                   <button onClick={() => setEditingPost({ id: '', title: '', title_en: '', excerpt: '', content_th: '', content_en: '', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), time: '5 min', image: '', category: 'General' })} className="theme-toggle" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={16}/> New Post</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}><th style={{ padding: '1rem', color: 'var(--muted)' }}>Post Title</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Slug/ID</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Action</th></tr></thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{post.title}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{post.category} | {post.date}</div></td>
                          <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>{post.id}</td>
                          <td style={{ padding: '1rem' }}><button onClick={() => setEditingPost(post)} className="theme-toggle" style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem' }}>Edit</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="service-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={18} /> LINE Community</h3>
                  <input type="text" placeholder="Search..." value={userFilter} onChange={(e) => setUserFilter(e.target.value)} style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--foreground)' }} />
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}><th style={{ padding: '1rem', color: 'var(--muted)' }}>User</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Tags</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Bot</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Action</th></tr></thead>
                    <tbody>
                      {adminData?.users.filter(u => u.display_name.toLowerCase().includes(userFilter.toLowerCase()) || (u.tags || '').toLowerCase().includes(userFilter.toLowerCase())).map((user: any) => (
                        <tr key={user.user_id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><img src={user.picture_url} style={{ width: '32px', height: '32px', borderRadius: '50%' }} /><div>{user.display_name}</div></div></td>
                          <td style={{ padding: '1rem' }}><input type="text" defaultValue={user.tags || ''} onBlur={(e) => handleUpdateTags(user.user_id, e.target.value)} style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--foreground)', width: '100px' }} /></td>
                          <td style={{ padding: '1rem' }}><button onClick={() => handleToggleAI(user.user_id, user.ai_enabled)} style={{ background: user.ai_enabled === 1 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: user.ai_enabled === 1 ? '#10b981' : '#ef4444', border: '1px solid currentColor', borderRadius: '20px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', cursor: 'pointer' }}>{user.ai_enabled === 1 ? 'AI ON' : 'MANUAL'}</button></td>
                          <td style={{ padding: '1rem' }}>
                             <div style={{ display: 'flex', gap: '0.5rem' }}>
                               <button onClick={() => fetchChatHistory(user)} className="theme-toggle" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}><History size={12}/> History</button>
                               <button onClick={() => { setPushingTo(user.user_id); setPushMessage(''); }} className="theme-toggle" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>Message</button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="service-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LayoutDashboard size={18} /> Rich Menu Manager</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}><th style={{ padding: '1rem', color: 'var(--muted)' }}>Menu Name</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Status</th></tr></thead>
                    <tbody>
                      {richMenus.map((menu: any) => (
                        <tr key={menu.richMenuId} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{menu.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{menu.chatBarText}</div></td>
                          <td style={{ padding: '1rem' }}>
                            {activeRichMenuId === menu.richMenuId ? <span style={{ color: '#10b981', fontWeight: '700' }}>ACTIVE</span> : <button onClick={() => handleSetDefaultRichMenu(menu.richMenuId)} className="theme-toggle" style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem' }}>Use This</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="service-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} /> Inquiries</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}><th style={{ padding: '1rem', color: 'var(--muted)' }}>Status</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Customer</th><th style={{ padding: '1rem', color: 'var(--muted)' }}>Message</th></tr></thead>
                    <tbody>
                      {adminData?.leads.map((lead: any) => (
                        <tr key={lead.id} style={{ borderBottom: '1px solid var(--card-border)', opacity: lead.status === 'done' ? 0.6 : 1 }}>
                          <td style={{ padding: '1rem' }}><button onClick={() => handleUpdateStatus(lead.id, lead.status === 'done' ? 'new' : 'done')} style={{ border: 'none', background: lead.status === 'done' ? '#10b981' : 'rgba(59,130,246,0.1)', color: lead.status === 'done' ? '#fff' : 'var(--primary)', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}><Check size={16} /></button></td>
                          <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{lead.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{lead.source}</div></td>
                          <td style={{ padding: '1rem' }}><div style={{ fontSize: '0.8rem' }}>{lead.message}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="service-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(59,130,246,0.05), transparent)' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Terminal size={18} color="var(--primary)" /> AI Code Lab</h3>
                <div style={{ display: 'grid', gridTemplateColumns: labResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <textarea value={labPrompt} onChange={(e) => setLabPrompt(e.target.value)} placeholder="Write a program to..." style={{ height: '120px', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', color: 'var(--foreground)' }}></textarea>
                    <button onClick={() => generateWithAI()} disabled={isLabLoading} className="cta-button" style={{ borderRadius: '12px' }}>{isLabLoading ? 'Generating...' : 'Run AI'}</button>
                  </div>
                  {labResult && <div style={{ background: '#1e1e1e', borderRadius: '12px', padding: '1rem', color: '#d4d4d4', overflow: 'auto', maxHeight: '300px' }}><pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>{labResult}</pre></div>}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* CMS Edit Modal */}
        {editingPost && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
             <div className="service-card" style={{ maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                   <h3>{editingPost.id ? 'Edit Blog Post' : 'Create New Post'}</h3>
                   <button onClick={() => setEditingPost(null)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}><X size={24}/></button>
                </div>
                <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Slug / ID</label><input name="id" defaultValue={editingPost.id} className="form-control" required placeholder="e.g. cloudflare-tips" /></div>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Category</label><input name="category" defaultValue={editingPost.category} className="form-control" required /></div>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Title (TH)</label><input name="title" defaultValue={editingPost.title} className="form-control" required /></div>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Title (EN)</label><input name="title_en" defaultValue={editingPost.title_en} className="form-control" required /></div>
                   </div>
                   <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Excerpt</label><textarea name="excerpt" defaultValue={editingPost.excerpt} className="form-control" required style={{ height: '60px' }} /></div>
                   <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Content (TH)</label><textarea name="content_th" defaultValue={editingPost.content_th} className="form-control" required style={{ height: '150px' }} /></div>
                   <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Content (EN)</label><textarea name="content_en" defaultValue={editingPost.content_en} className="form-control" required style={{ height: '150px' }} /></div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Image URL</label><input name="image" defaultValue={editingPost.image} className="form-control" required /></div>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Date</label><input name="date" defaultValue={editingPost.date} className="form-control" required /></div>
                      <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Read Time</label><input name="time" defaultValue={editingPost.time} className="form-control" required /></div>
                   </div>
                   <button type="submit" className="cta-button" style={{ marginTop: '1rem' }}>Save Post</button>
                </form>
             </div>
          </div>
        )}
      </div>
    );
  };

  const BlogDetailView = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);
    
    if (isBlogLoading) return <div style={{ textAlign: 'center', padding: '10rem' }}>Loading post...</div>;
    if (!post) return <Navigate to="/" />;

    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
        <Helmet>
          <title>{lang === 'th' ? post.title : post.title_en} | MYITDEV Blog</title>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:image" content={post.image} />
        </Helmet>
        <nav className="container" style={{ padding: '1.5rem' }}>
           <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
             <ChevronLeft size={20} /> {t.blog.back}
           </Link>
        </nav>
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px', marginBottom: '3rem' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '2rem', lineHeight: '1.2' }}>{lang === 'th' ? post.title : post.title_en}</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{lang === 'th' ? post.content_th : post.content_en}</div>
        </div>
      </div>
    );
  };

  const MainView = () => (
    <div>
      <Helmet>
        <title>MYITDEV | Modern IT Solutions & Software Development</title>
        <meta name="description" content="Professional IT solutions from computer repair to custom software and LINE chatbots." />
      </Helmet>
      
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
        <div className="nav-logo">MYITDEV<span style={{color:'var(--nav-text)'}}>.COM</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="nav-links">
            <a href="#services">{t.nav.services}</a>
            <a href="#portfolio">{t.nav.portfolio}</a>
            <a href="#blog">{t.nav.blog}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={toggleLang} className="theme-toggle" style={{ fontWeight: '700' }}>{lang === 'th' ? 'EN' : 'TH'}</button>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <h1 style={{ whiteSpace: 'pre-line' }}>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#contact" className="cta-button">{t.hero.cta}</a>
            <a href="#services" className="cta-button" style={{ background: 'transparent', border: '1px solid var(--card-border)' }}>{t.hero.secondary}</a>
          </div>
        </div>
      </header>

      <section className="container" id="services" style={{ padding: '8rem 0' }}>
        <h2 className="section-title">{t.services.title}</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.id} className="service-card">
              <div className="icon-wrapper"><s.icon size={32} /></div>
              <h3>{lang === 'th' ? s.titleTh : s.title}</h3>
              <p>{lang === 'th' ? s.descTh : s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" id="blog" style={{ padding: '8rem 0' }}>
        <h2 className="section-title">{t.blog.title}</h2>
        {isBlogLoading ? (
           <div style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading knowledge...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {blogPosts.map((post) => (
              <div key={post.id} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h3>{lang === 'th' ? post.title : post.title_en}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>{t.blog.readMore} <ArrowRight size={16} /></Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t.contact.title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}><Mail color="var(--primary)" /> <span>info@myitdev.com</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><Phone color="var(--primary)" /> <span>+66 88 760 2708</span></div>
                <img src="https://qr-official.line.me/sid/M/643mztqx.png" alt="LINE QR" style={{ width: '150px', borderRadius: '12px', marginTop: '2rem' }} />
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" name="name" placeholder={t.contact.name} className="form-control" required />
                  <input type="email" name="email" placeholder={t.contact.email} className="form-control" required />
                </div>
                <input type="text" name="subject" placeholder={t.contact.subject} className="form-control" required />
                <textarea name="message" placeholder={t.contact.message} className="form-control" required style={{ height: '150px' }}></textarea>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? t.contact.sending : t.contact.submit}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-logo">MYITDEV<span style={{color: '#3b82f6'}}>.COM</span></div>
          <p>© {new Date().getFullYear()} MYITDEV. {t.footer.rights}</p>
          <Link to="/admin" style={{ opacity: 0.3, fontSize: '0.7rem', color: 'inherit' }}>Admin</Link>
        </div>
      </footer>
    </div>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/blog/:id" element={<BlogDetailView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/liff-form" element={<LiffForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="service-card" style={{ maxWidth: '800px', width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={selectedUser.picture_url} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div><div style={{ fontWeight: '700' }}>{selectedUser.display_name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>History</div></div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {isHistoryLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
              ) : chatHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>No history found.</div>
              ) : chatHistory.map((chat: any) => (
                <div key={chat.id} style={{ alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '1rem', borderRadius: '16px', background: chat.role === 'user' ? 'var(--primary)' : 'var(--input-bg)', color: chat.role === 'user' ? '#fff' : 'inherit' }}>
                   <div style={{ fontWeight: '700', fontSize: '0.7rem', marginBottom: '0.3rem', opacity: 0.8 }}>{chat.role === 'user' ? 'USER' : 'AI BOT'}</div>
                  <div style={{ fontSize: '0.85rem' }}>{chat.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <button onClick={scrollToTop} className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}><ArrowUp size={24} /></button>
      <div className={`toast-container ${toast.show ? 'show' : ''} ${toast.type}`}><div className="toast-content"><span>{toast.message}</span></div></div>
    </>
  );
}

export default App;