import React, { useState } from 'react';
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
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const translations = {
  th: {
    nav: { services: 'บริการ', portfolio: 'ผลงาน', contact: 'ติดต่อ' },
    hero: { 
      title: <>โซลูชันไอทีสมัยใหม่ <br/> สำหรับยุคดิจิทัล</>,
      sub: 'เราคือพาร์ทเนอร์ด้านเทคโนโลยีที่พร้อมดูแลคุณ ตั้งแต่การซ่อมบำรุงขั้นพื้นฐาน ไปจนถึงการพัฒนาซอฟต์แวร์ระดับสูง เพื่อขับเคลื่อนธุรกิจของคุณสู่ความสำเร็จ',
      getStarted: 'เริ่มคุยกับเรา',
      viewServices: 'ดูบริการทั้งหมด'
    },
    features: {
      secure: 'ปลอดภัย & เชื่อถือได้',
      performance: 'ประสิทธิภาพสูง',
      scalable: 'รองรับการขยายตัว'
    },
    sections: {
      services: 'บริการที่เชี่ยวชาญ',
      portfolio: 'เรื่องราวความสำเร็จ',
      portfolioSub: 'ตัวอย่างผลงานและความสำเร็จที่เราได้ร่วมสร้างสรรค์ให้กับลูกค้าของเรา',
      contact: 'ติดต่อเรา',
      contactSub: 'มีคำถามหรือต้องการคำปรึกษา? ส่งข้อความหาเราได้ทันที ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง',
      contactTitle: 'มาสร้างสิ่งที่ยิ่งใหญ่ <br/> ไปด้วยกันครับ'
    },
    form: {
      name: 'ชื่อ-นามสกุล',
      email: 'อีเมล',
      subject: 'หัวข้อ',
      message: 'ข้อความ',
      send: 'ส่งข้อความ',
      sending: 'กำลังส่ง...',
      successTitle: 'ส่งข้อความสำเร็จ!',
      successSub: 'ขอบคุณที่ติดต่อเราครับ เราจะรีบติดต่อกลับหาคุณโดยเร็วที่สุด',
      sendAnother: 'ส่งข้อความอื่น',
      error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่าน LINE ครับ'
    },
    footer: '© 2026 MYITDEV IT Solutions. สงวนลิขสิทธิ์.'
  },
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', contact: 'Contact' },
    hero: { 
      title: <>Modern IT Solutions <br/> for the Digital Age</>,
      sub: 'Your technology partner ready to take care of you. From basic maintenance to high-level software development, driving your business to success.',
      getStarted: 'Get Started Now',
      viewServices: 'View Services'
    },
    features: {
      secure: 'Secure & Reliable',
      performance: 'High Performance',
      scalable: 'Scalable Tech'
    },
    sections: {
      services: 'Our Specialized Services',
      portfolio: 'Success Stories',
      portfolioSub: 'Examples of work and success we have co-created for our clients.',
      contact: 'Contact Us',
      contactSub: 'Have questions or need advice? Send us a message now. Our team will get back to you within 24 hours.',
      contactTitle: "Let's build something <br/> great together."
    },
    form: {
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successSub: 'Thank you for contacting us. We will get back to you as soon as possible.',
      sendAnother: 'Send Another Message',
      error: 'An error occurred. Please try again or contact us via LINE.'
    },
    footer: '© 2026 MYITDEV IT Solutions. All rights reserved.'
  }
};

const services = [
  {
    title: { en: 'Computer Repair', th: 'ซ่อมคอมพิวเตอร์' },
    description: {
      en: 'Expert hardware diagnostic and software recovery for PC & Laptops. Hardware upgrades for peak performance.',
      th: 'บริการตรวจเช็คและซ่อมแซมฮาร์ดแวร์ กู้คืนซอฟต์แวร์สำหรับพีซีและโน้ตบุ๊ก พร้อมอัปเกรดเครื่องให้แรงขึ้น'
    },
    icon: Wrench,
  },
  {
    title: { en: 'Website Management', th: 'ดูแลเว็บไซต์' },
    description: {
      en: 'Ongoing maintenance, security audits, and performance optimization for your business website.',
      th: 'บริการดูแลรักษาเว็บไซต์ ตรวจสอบความปลอดภัย และปรับแต่งความเร็วให้เว็บไซต์ธุรกิจของคุณทำงานได้ลื่นไหล'
    },
    icon: Globe,
  },
  {
    title: { en: 'Domain & Hosting', th: 'จดโดเมน & โฮสติ้ง' },
    description: {
      en: 'Secure domain registration and high-speed enterprise hosting solutions via Cloudflare ecosystem.',
      th: 'บริการจดโดเมนเนมและพื้นที่วางเว็บไซต์ประสิทธิภาพสูงผ่านระบบ Cloudflare ที่ทั่วโลกยอมรับ'
    },
    icon: Search,
  },
  {
    title: { en: 'Custom Software', th: 'รับจ้างเขียนโปรแกรม' },
    description: {
      en: 'Bespoke software development, automation scripts, and database management tailored to your needs.',
      th: 'พัฒนาซอฟต์แวร์ตามความต้องการ สคริปต์อัตโนมัติ และระบบจัดการฐานข้อมูลที่ออกแบบมาเพื่อคุณโดยเฉพาะ'
    },
    icon: Code,
  },
  {
    title: { en: 'LINE Chatbots', th: 'รับทำ LINE Bot' },
    description: {
      en: 'Professional LINE OA integration with intelligent automated response systems and API connectivity.',
      th: 'เชื่อมต่อ LINE Official Account ของคุณกับระบบตอบโต้รวดเร็วและชาญฉลาด พร้อมเชื่อมต่อ API ภายนอก'
    },
    icon: MessageSquareMore,
  },
];

const portfolio = [
  {
    title: { en: 'E-Commerce Solution', th: 'ระบบร้านค้าออนไลน์' },
    category: { en: 'Web Development', th: 'พัฒนาเว็บไซต์' },
    description: {
      en: 'A full-stack online store with real-time inventory and payment integration.',
      th: 'ร้านค้าออนไลน์ครบวงจร พร้อมระบบสต็อกสินค้าเรียลไทม์และระบบชำระเงินอัตโนมัติ'
    },
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: { en: 'Smart Office Bot', th: 'บอทออฟฟิศอัจฉริยะ' },
    category: { en: 'LINE Chatbots', th: 'LINE บอท' },
    description: {
      en: 'Automated response system for office management and employee support via LINE.',
      th: 'ระบบตอบกลับอัตโนมัติสำหรับการจัดการออฟฟิศและสนับสนุนพนักงานผ่าน LINE'
    },
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: { en: 'ERP Dashboard', th: 'แดชบอร์ดระบบ ERP' },
    category: { en: 'Custom Software', th: 'ซอฟต์แวร์เฉพาะทาง' },
    description: {
      en: 'Comprehensive enterprise resource planning system for manufacturing.',
      th: 'ระบบวางแผนทรัพยากรองค์กรที่ครอบคลุมสำหรับธุรกิจการผลิต'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: { en: 'Network Security Audit', th: 'ตรวจสอบความปลอดภัยเครือข่าย' },
    category: { en: 'IT Solutions', th: 'โซลูชันไอที' },
    description: {
      en: 'Complete infrastructure security assessment and hardening for a financial firm.',
      th: 'การประเมินความปลอดภัยโครงสร้างพื้นฐานและการปรับปรุงระบบให้แข็งแกร่งสำหรับสถาบันการเงิน'
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
  },
];

function App() {
  const [lang, setLang] = useState<'th' | 'en'>(() => {
    return (localStorage.getItem('lang') as 'th' | 'en') || 'th';
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const t = translations[lang];

  const toggleLang = () => {
    const newLang = lang === 'th' ? 'en' : 'th';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
try {
  console.log('Sending data to:', 'https://myitdev-bot.thanonhari.workers.dev/submit-form');
  const response = await fetch('https://myitdev-bot.thanonhari.workers.dev/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    setStatus('success');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus('idle'), 5000);
  } else {
    const errText = await response.text();
    console.error('Form submission failed:', response.status, errText);
    setStatus('error');
  }
} catch (error) {
  console.error('Fetch error:', error);
  setStatus('error');
}

  };

  return (
    <div>
      {/* Navbar Area */}
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem' }}>
        <div className="nav-logo" style={{ padding: 0 }}>MYITDEV<span style={{color:'#fff'}}>.COM</span></div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
            <a href="#services" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.services}</a>
            <a href="#portfolio" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.portfolio}</a>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{t.nav.contact}</a>
          </div>
          <button 
            onClick={toggleLang}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: '#fff', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}
          >
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>{t.hero.title}</h1>
          <p>{t.hero.sub}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="cta-button">
              {t.hero.getStarted}
            </a>
            <a href="#services" style={{ padding: '1.1rem 2.5rem', color: '#fff', textDecoration: 'none', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}>
              {t.hero.viewServices}
            </a>
          </div>
        </div>
      </header>

      {/* Features/Stats Section (Quick) */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', margin: '4rem auto', textAlign: 'center' }}>
          <div>
            <ShieldCheck color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.features.secure}</h5>
          </div>
          <div>
            <Cpu color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.features.performance}</h5>
          </div>
          <div>
            <Layers color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{t.features.scalable}</h5>
          </div>
      </section>

      {/* Services Section */}
      <section className="container" id="services">
        <h2 className="section-title">{t.sections.services}</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-wrapper">
                <service.icon size={32} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Service {index + 1}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{service.title[lang]}</h3>
              <p>{service.description[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="container" style={{ padding: '8rem 0' }} id="portfolio">
        <h2 className="section-title">{t.sections.portfolio}</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '-2rem auto 4rem', fontSize: '1.1rem' }}>
          {t.sections.portfolioSub}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {portfolio.map((item, index) => (
            <div key={index} className="service-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img src={item.image} alt={item.title[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(59, 130, 246, 0.9)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>
                  {item.category[lang]}
                </div>
              </div>
              <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{item.title[lang]}</h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>{item.description[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {t.sections.contact}
              </div>
              <h2 dangerouslySetInnerHTML={{ __html: t.sections.contactTitle }}></h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '3rem' }}>
                {t.sections.contactSub}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div className="icon-wrapper" style={{ marginBottom: 0, width: '50px', height: '50px' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#475569' }}>Email</div>
                    <div style={{ fontWeight: '500' }}>info@myitdev.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div className="icon-wrapper" style={{ marginBottom: 0, width: '50px', height: '50px' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#475569' }}>Phone</div>
                    <div style={{ fontWeight: '500' }}>+66 88 760 2708</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div className="icon-wrapper" style={{ marginBottom: 0, width: '50px', height: '50px' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#475569' }}>Location</div>
                    <div style={{ fontWeight: '500' }}>Chachoengsao, Thailand</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '20px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                  <CheckCircle2 size={64} color="#22c55e" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ marginBottom: '1rem' }}>{t.form.successTitle}</h3>
                  <p style={{ color: '#94a3b8' }}>{t.form.successSub}</p>
                  <button onClick={() => setStatus('idle')} className="submit-btn" style={{ marginTop: '2rem', width: 'auto', padding: '0.75rem 2rem' }}>{t.form.sendAnother}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label>{t.form.name}</label>
                      <input type="text" name="name" className="form-control" placeholder={lang === 'th' ? "ชื่อ-นามสกุล" : "Your Name"} required disabled={status === 'loading'} />
                    </div>
                    <div className="form-group">
                      <label>{t.form.email}</label>
                      <input type="email" name="email" className="form-control" placeholder="your@email.com" required disabled={status === 'loading'} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.form.subject}</label>
                    <input type="text" name="subject" className="form-control" placeholder={lang === 'th' ? "หัวข้อที่ต้องการติดต่อ" : "Contact Subject"} required disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label>{t.form.message}</label>
                    <textarea name="message" className="form-control" placeholder={lang === 'th' ? "รายละเอียดความต้องการของคุณ..." : "Your message details..."} required disabled={status === 'loading'}></textarea>
                  </div>
                  
                  {status === 'error' && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                      <AlertCircle size={18} />
                      <span>{t.form.error}</span>
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={status === 'loading'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    {status === 'loading' ? (
                      <>
                        <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        {t.form.sending}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t.form.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">MYITDEV<span style={{color: '#3b82f6'}}>.COM</span></div>
          <p style={{ color: '#475569' }}>{t.footer}</p>
        </div>
      </footer>

      {/* Floating LINE Button */}
      <a href="https://lin.ee/Ywrvclv" target="_blank" rel="noopener noreferrer" className="line-float">
        <MessageSquareMore />
      </a>
    </div>
  );
}

export default App;
