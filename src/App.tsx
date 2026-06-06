import React, { useState, useEffect } from 'react';
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
  Bot
} from 'lucide-react';

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

const blogPosts = [
  { 
    id: 'web-design-trends-2026',
    title: 'เจาะลึกเทรนด์การออกแบบเว็บไซต์ปี 2026: ปรับตัวอย่างไรให้ธุรกิจไทยโดดเด่น?', 
    titleEn: 'Web Design Trends 2026 for Thai Business', 
    excerpt: 'ก้าวข้ามขีดจำกัดจากความสวยงามสู่ประสิทธิภาพและการตอบโจทย์เฉพาะบุคคลด้วยพลังของ AI และ Bento Grid 2.0', 
    contentTh: 'ในปี 2026 เว็บไซต์ไม่ได้เป็นเพียงแค่ "หน้าตา" ของบริษัทอีกต่อไป แต่ได้กลายเป็น "เครื่องมือสร้างรายได้" ที่ทรงพลังที่สุด หัวใจสำคัญคือ Bento Grid 2.0 ที่จัดวางบริการหลากหลายได้ในหน้าเดียวอย่างเป็นระเบียบ, Agentic UI ที่ปรับเปลี่ยนคอนเทนต์ตามพฤติกรรมผู้ใช้แบบ Real-time, และ Performance-First ที่เน้นความเร็วระดับวินาทีเพื่อ SEO ที่ดีที่สุด ท้ายที่สุดคือ Digital Harmony ที่ผสมผสานเทคโนโลยีล้ำสมัยเข้ากับความไว้วางใจสไตล์ธุรกิจไทยครับ',
    contentEn: 'In 2026, a website is no longer just a storefront; it has become the most powerful revenue-generating tool. Key trends include Bento Grid 2.0 for organized multi-service display, Agentic UI that adapts content based on real-time user behavior, and Performance-First design focusing on split-second loading for optimal SEO. Finally, Digital Harmony blends cutting-edge technology with the trust and warmth of Thai business culture.',
    date: '27 May 2026', 
    time: '8 min', 
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
    category: 'Design & Tech' 
  },
  { 
    id: 'prevent-malware',
    title: '5 วิธีป้องกันคอมพิวเตอร์จากมัลแวร์และไวรัสในปี 2026', 
    titleEn: '5 Ways to Protect Your Computer from Malware in 2026', 
    excerpt: 'แนวทางการดูแลรักษาคอมพิวเตอร์เบื้องต้นเพื่อให้ปลอดภัยจากภัยคุกคามทางไซเบอร์', 
    contentTh: 'ในยุคปัจจุบันที่ภัยคุกคามทางไซเบอร์มีความฉลาดมากขึ้น การป้องกันคอมพิวเตอร์จึงเป็นเรื่องสำคัญ 1. หมั่นอัปเดตระบบปฏิบัติการเสมอ 2. ไม่คลิกลิงก์แปลกปลอมในอีเมล 3. ใช้รหัสผ่านที่คาดเดายาก 4. ติดตั้งโปรแกรมสแกนไวรัสที่เชื่อถือได้ 5. สำรองข้อมูลสำคัญเป็นประจำ',
    contentEn: 'Cyber threats are becoming more advanced. To protect your PC: 1. Keep your OS updated. 2. Do not click suspicious links in emails. 3. Use strong passwords. 4. Install trusted antivirus software. 5. Backup your data regularly.',
    date: '20 May 2026', 
    time: '5 min', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', 
    category: 'IT Security' 
  }
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

  const t = translations[lang as 'th' | 'en'];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(window.location.hash || '#home');
    window.addEventListener('hashchange', handleHashChange);
    const params = new URLSearchParams(window.location.search);
    const token = params.get('auth');
    if (token) {
      setAuthToken(token);
      localStorage.setItem('admin_token', token);
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      setCurrentPage('#admin');
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    if (currentPage === '#admin' && authToken) {
      fetch('https://notify.myitdev.com/api/leads', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      .then(res => res.json())
      .then(data => setAdminData(data))
      .catch(() => handleLogout());
    }
  };

  useEffect(() => { fetchAdminData(); }, [currentPage, authToken]);

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
    window.location.hash = '#home';
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

  const generateWithLocalAI = async (customPrompt?: string) => {
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
      } else throw new Error('Local AI error. Is the tunnel active?');
    } catch (err: any) {
      setToast({ show: true, message: err.message, type: 'error' });
    } finally {
      setIsLabLoading(false);
    }
  };

  // --- Admin Dashboard View ---
  if (currentPage.startsWith('#admin')) {
    const aiUsage = adminData?.stats?.aiMessagesToday || 0;
    const aiQuota = 150; // Estimated safe daily quota before slowing down or paying
    const aiPercentage = Math.min((aiUsage / aiQuota) * 100, 100);

    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><LayoutDashboard size={32} color="var(--primary)" /><h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Admin Hub</h1></div>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button onClick={toggleTheme} className="theme-toggle"><Sun size={20} /></button>
               {authToken && <button onClick={handleLogout} className="theme-toggle" style={{ color: '#ef4444' }} title="Logout"><LogOut size={20} /></button>}
               <a href="#home" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Exit Admin</a>
            </div>
          </div>

          {!authToken ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <h2 style={{ marginBottom: '2rem' }}>Authentication Required</h2>
              <a href="https://notify.myitdev.com/auth/login" className="cta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: '#06c755' }}>Login with LINE</a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
              
              {/* Top Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="service-card" style={{ padding: '1.5rem' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><Users size={16}/> Total Leads</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{adminData?.leads.length || 0}</div>
                </div>
                
                <div className="service-card" style={{ padding: '1.5rem' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><MessageSquareMore size={16}/> LINE Community</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{adminData?.users.length || 0}</div>
                </div>

                {/* System Health & Quota Card */}
                <div className="service-card" style={{ padding: '1.5rem', borderColor: aiPercentage > 80 ? '#ef4444' : 'var(--card-border)' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} color={aiPercentage > 80 ? '#ef4444' : '#10b981'}/> AI Quota (Today)</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: aiPercentage > 80 ? '#ef4444' : 'var(--primary)' }}>{aiUsage} / {aiQuota}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--input-bg)', borderRadius: '4px', overflow: 'hidden', marginTop: '1rem' }}>
                    <div style={{ width: `${aiPercentage}%`, height: '100%', background: aiPercentage > 80 ? '#ef4444' : 'linear-gradient(90deg, var(--primary), var(--accent))', transition: 'width 0.5s ease-in-out' }}></div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.5rem', textAlign: 'right' }}>
                    {aiPercentage > 80 ? 'Approaching daily free limit' : 'System healthy'}
                  </div>
                </div>
              </div>

              <div className="service-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={18} /> LINE Community Profiles</h3>
                  <input 
                    type="text" 
                    placeholder="Search name or tags..." 
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--foreground)', minWidth: '200px' }}
                  />
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>User</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Tags</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Bot</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Status</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData?.users
                        .filter(u => 
                          u.display_name.toLowerCase().includes(userFilter.toLowerCase()) || 
                          (u.tags || '').toLowerCase().includes(userFilter.toLowerCase())
                        )
                        .map((user: any) => (
                        <tr key={user.user_id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img src={user.picture_url} alt={user.display_name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', background: 'var(--input-bg)' }} />
                              <div style={{ fontWeight: '600' }}>{user.display_name}</div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <input 
                              type="text" 
                              defaultValue={user.tags || ''} 
                              onBlur={(e) => handleUpdateTags(user.user_id, e.target.value)}
                              placeholder="Add tags..." 
                              style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--foreground)', width: '120px' }} 
                            />
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <button 
                              onClick={() => handleToggleAI(user.user_id, user.ai_enabled)}
                              style={{ 
                                background: user.ai_enabled === 1 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', 
                                color: user.ai_enabled === 1 ? '#10b981' : '#ef4444',
                                border: `1px solid ${user.ai_enabled === 1 ? '#10b981' : '#ef4444'}`,
                                borderRadius: '20px',
                                padding: '0.2rem 0.6rem',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              {user.ai_enabled === 1 ? 'AI ON' : 'MANUAL'}
                            </button>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            {pushingTo === user.user_id ? (
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input 
                                  type="text" 
                                  autoFocus
                                  value={pushMessage}
                                  onChange={(e) => setPushMessage(e.target.value)}
                                  placeholder="Type message..."
                                  style={{ background: 'var(--input-bg)', border: '1px solid var(--primary)', borderRadius: '4px', padding: '0.3rem 0.5rem', fontSize: '0.8rem', color: 'var(--foreground)', flex: 1 }}
                                  onKeyDown={(e) => e.key === 'Enter' && handlePushMessage(user.user_id)}
                                />
                                <button onClick={() => handlePushMessage(user.user_id)} disabled={isSubmitting} style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem' }}>Send</button>
                                <button onClick={() => setPushingTo(null)} style={{ background: 'transparent', color: 'var(--muted)', border: 'none', cursor: 'pointer' }}><X size={14} /></button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.status_message || '-'}</div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button onClick={() => fetchChatHistory(user)} className="theme-toggle" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><History size={12}/> History</button>
                                  <button onClick={() => { setPushingTo(user.user_id); setPushMessage(''); }} className="theme-toggle" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>Message</button>
                                </div>
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '1rem' }}><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{new Date(user.last_seen).toLocaleString()}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="service-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} /> Inquiries Management</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Status</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Customer</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Message</th>
                        <th style={{ padding: '1rem', color: 'var(--muted)' }}>Admin Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData?.leads.map((lead: any) => (
                        <tr key={lead.id} style={{ borderBottom: '1px solid var(--card-border)', opacity: lead.status === 'done' ? 0.6 : 1 }}>
                          <td style={{ padding: '1rem' }}>
                            <button onClick={() => handleUpdateStatus(lead.id, lead.status === 'done' ? 'new' : 'done')} style={{ border: 'none', background: lead.status === 'done' ? '#10b981' : 'rgba(59,130,246,0.1)', color: lead.status === 'done' ? '#fff' : 'var(--primary)', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><Check size={16} /></button>
                          </td>
                          <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{lead.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{lead.source} | {new Date(lead.created_at).toLocaleDateString()}</div></td>
                          <td style={{ padding: '1rem' }}><div style={{ fontWeight: '500' }}>{lead.subject || 'No Subject'}</div><div style={{ fontSize: '0.8rem', color: 'var(--muted)', maxWidth: '250px' }}>{lead.message}</div></td>
                          <td style={{ padding: '1rem' }}><input type="text" defaultValue={lead.notes} onBlur={(e) => handleUpdateNotes(lead.id, e.target.value)} placeholder="Add note..." style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '0.3rem 0.5rem', fontSize: '0.8rem', color: 'var(--foreground)', width: '150px' }} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI Code Lab Section */}
              <div className="service-card" style={{ padding: '1.5rem', border: '1px solid var(--primary)', background: 'linear-gradient(135deg, rgba(59,130,246,0.05), transparent)' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Terminal size={18} color="var(--primary)" /> AI Code Lab (Cloudflare AI)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: labResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <textarea 
                      value={labPrompt}
                      onChange={(e) => setLabPrompt(e.target.value)}
                      placeholder="Write a program to... (e.g., Python script for server monitoring)"
                      style={{ height: '150px', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', color: 'var(--foreground)', fontSize: '0.9rem', resize: 'none' }}
                    ></textarea>
                    <button 
                      onClick={() => generateWithLocalAI()} 
                      disabled={isLabLoading || !labPrompt.trim()}
                      className="cta-button"
                      style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      {isLabLoading ? 'Generating...' : <><Zap size={18}/> Run AI Generator</>}
                    </button>
                  </div>
                  {labResult && (
                    <div style={{ background: '#1e1e1e', borderRadius: '12px', padding: '1.5rem', color: '#d4d4d4', overflow: 'auto', maxHeight: '300px' }}>
                      <pre style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{labResult}</pre>
                      <button onClick={() => setLabResult('')} style={{ marginTop: '1rem', background: 'transparent', color: 'var(--muted)', border: 'none', fontSize: '0.75rem', cursor: 'pointer' }}>Clear Result</button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Chat History Modal */}
        {selectedUser && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zindex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="service-card" style={{ maxWidth: '800px', width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', padding: 0 }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <img src={selectedUser.picture_url} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                   <div>
                     <div style={{ fontWeight: '700' }}>{selectedUser.display_name}</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Chat History</div>
                   </div>
                </div>
                <button onClick={() => setSelectedUser(null)} style={{ background: 'transparent', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {isHistoryLoading ? (
                   <div style={{ textAlign: 'center', marginTop: '5rem', color: 'var(--muted)' }}>Loading history...</div>
                ) : chatHistory.length === 0 ? (
                   <div style={{ textAlign: 'center', marginTop: '5rem', color: 'var(--muted)' }}>No chat history found.</div>
                ) : (
                  chatHistory.map((chat: any) => (
                    <div key={chat.id} style={{ alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '1rem', borderRadius: '16px', background: chat.role === 'user' ? 'var(--primary)' : 'var(--input-bg)', color: chat.role === 'user' ? '#fff' : 'inherit', fontSize: '0.9rem' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.7rem', marginBottom: '0.3rem', opacity: 0.8 }}>{chat.role === 'user' ? 'USER' : 'AI BOT'}</div>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{chat.content}</div>
                      <div style={{ fontSize: '0.65rem', marginTop: '0.5rem', opacity: 0.6, textAlign: 'right' }}>{new Date(chat.created_at).toLocaleTimeString()}</div>
                    </div>
                  ))
                )}
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--card-border)', background: 'rgba(59,130,246,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Need a code solution for this case?</div>
                 <button 
                  disabled={isLabLoading || chatHistory.length === 0}
                  onClick={() => generateWithLocalAI(`Summarize this chat and provide a programming solution or script to help this user: ${chatHistory.slice(-5).map(c => `${c.role}: ${c.content}`).join('\n')}`)} 
                  style={{ background: 'var(--foreground)', color: 'var(--background)', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                 >
                   <Bot size={16}/> Solve with AI
                 </button>
              </div>
            </div>
          </div>
        )}

        <div className={`toast-container ${toast.show ? 'show' : ''} ${toast.type}`}><div className="toast-content">{toast.type === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}<span>{toast.message}</span></div></div>
      </div>
    );
  }

  // --- Blog Detail View ---
  if (currentPage.startsWith('#blog/')) {
    const postId = currentPage.replace('#blog/', '');
    const post = blogPosts.find(p => p.id === postId);

    if (post) {
      return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
          <nav className="container" style={{ padding: '1.5rem' }}>
             <a href="#blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
               <ChevronLeft size={20} /> {t.blog.back}
             </a>
          </nav>
          <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px', marginBottom: '3rem' }} />
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <span>{post.date}</span> • <span>{post.time} {lang === 'th' ? 'อ่าน' : 'read'}</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '2rem', lineHeight: '1.2' }}>{lang === 'th' ? post.title : post.titleEn}</h1>
            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--foreground)', whiteSpace: 'pre-line' }}>
               {lang === 'th' ? post.contentTh : post.contentEn}
            </div>
            <div style={{ marginTop: '5rem', padding: '3rem', background: 'var(--card-bg)', borderRadius: '24px', textAlign: 'center' }}>
               <h3>{t.contact.title}</h3>
               <a href="#contact" className="cta-button" style={{ marginTop: '2rem' }}>{t.hero.cta}</a>
            </div>
          </div>
          <footer className="footer" style={{ marginTop: '5rem' }}>
            <div className="container">
              <div className="footer-logo">MYITDEV<span style={{color: '#3b82f6'}}>.COM</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>© {new Date().getFullYear()} MYITDEV IT Solutions. {t.footer.rights}</p>
            </div>
          </footer>
        </div>
      );
    }
  }

  // --- Main Landing View ---
  return (
    <div>
      <div className={`toast-container ${toast.show ? 'show' : ''} ${toast.type}`}>
        <div className="toast-content">{toast.type === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}<span>{toast.message}</span><button onClick={() => setToast(prev => ({ ...prev, show: false }))} className="toast-close"><X size={18} /></button></div>
      </div>

      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem' }}>
        <div className="nav-logo" style={{ padding: 0 }}>MYITDEV<span style={{color:'var(--nav-text)'}}>.COM</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#services" style={{ color: 'var(--nav-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.services}</a>
            <a href="#portfolio" style={{ color: 'var(--nav-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.portfolio}</a>
            <a href="#blog" style={{ color: 'var(--nav-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.blog}</a>
            <a href="#contact" style={{ color: 'var(--nav-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.contact}</a>
          </div>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={toggleLang} className="theme-toggle" style={{ fontSize: '0.75rem', fontWeight: '700', width: '36px' }}>{lang === 'th' ? 'EN' : 'TH'}</button>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <h1 style={{ whiteSpace: 'pre-line' }}>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="cta-button">{t.hero.cta}</a>
            <a href="#services" style={{ padding: '1.1rem 2.5rem', color: 'var(--foreground)', textDecoration: 'none', fontWeight: '600', border: '1px solid var(--card-border)', borderRadius: '50px', transition: '0.3s' }}>{t.hero.secondary}</a>
          </div>
        </div>
      </header>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', margin: '4rem auto', textAlign: 'center' }}>       
          <div><ShieldCheck color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} /><h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.features.secure}</h5></div>
          <div><Cpu color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} /><h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.features.performance}</h5></div>
          <div><Layers color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} /><h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.features.scalable}</h5></div>
      </section>

      <section className="container" id="services">
        <h2 className="section-title">{t.services.title}</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.id} className="service-card">
              <div className="icon-wrapper"><s.icon size={32} /></div>
              <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t.services.service} {s.id}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{lang === 'th' ? s.titleTh : s.title}</h3>
              <p>{lang === 'th' ? s.descTh : s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" id="portfolio" style={{ padding: '4rem 0' }}>
        <h2 className="section-title">{t.portfolio.title}</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', maxWidth: '600px', margin: '-2rem auto 4rem' }}>{t.portfolio.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {portfolio.map((item, i) => (
            <div key={i} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(59, 130, 246, 0.9)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600' }}>{item.category}</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{lang === 'th' ? item.descTh : item.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" id="blog" style={{ padding: '8rem 0' }}>
        <h2 className="section-title">{t.blog.title}</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', maxWidth: '600px', margin: '-2rem auto 4rem' }}>{t.blog.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {blogPosts.map((post, i) => (
            <div key={i} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', marginBottom: '1rem' }} className="blog-date-text"><span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {post.time}</span><span>{post.date}</span></div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{lang === 'th' ? post.title : post.titleEn}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                <a href={`#blog/${post.id}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>{t.blog.readMore} <ArrowRight size={16} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{t.contact.title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><Mail color="var(--primary)" /> <span>info@myitdev.com</span></div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><Phone color="var(--primary)" /> <span>+66 88 760 2708</span></div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><MapPin color="var(--primary)" /> <span>Chachoengsao, Thailand</span></div>
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid var(--card-border)', display: 'inline-block', width: 'fit-content' }}>
                  <img 
                    src="https://qr-official.line.me/sid/M/643mztqx.png" 
                    alt="Add Friend on LINE" 
                    style={{ width: '150px', height: '150px', borderRadius: '8px' }} 
                  />
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Scan to add @643mztqx</div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group"><label>{t.contact.name}</label><input type="text" name="name" className="form-control" required /></div>
                  <div className="form-group"><label>{t.contact.email}</label><input type="email" name="email" className="form-control" required /></div>
                </div>
                <div className="form-group"><label>{t.contact.subject}</label><input type="text" name="subject" className="form-control" required /></div>
                <div className="form-group"><label>{t.contact.message}</label><textarea name="message" className="form-control" required></textarea></div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? t.contact.sending : t.contact.submit}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-logo">MYITDEV<span style={{color: '#3b82f6'}}>.COM</span></div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>© {new Date().getFullYear()} MYITDEV IT Solutions. {t.footer.rights}</p>
          <div style={{ marginTop: '2rem' }}><a href="#admin" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.75rem', opacity: 0.5 }}>Admin Dashboard</a></div>
        </div>
      </footer>

      <button onClick={scrollToTop} className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`} aria-label="Scroll to top"><ArrowUp size={24} /></button>
      <a href="https://lin.ee/Ywrvclv" target="_blank" rel="noopener noreferrer" className="line-float" aria-label="Contact us on LINE"><MessageSquareMore aria-hidden="true" /></a>
    </div>
  );
}

export default App;
