import React from 'react';
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
  MapPin
} from 'lucide-react';

const services = [
  {
    title: 'Computer Repair',
    titleTh: 'ซ่อมคอมพิวเตอร์',
    description: 'Expert hardware diagnostic and software recovery for PC & Laptops. Hardware upgrades for peak performance.',
    icon: Wrench,
  },
  {
    title: 'Website Management',
    titleTh: 'ดูแลเว็บไซต์',
    description: 'Ongoing maintenance, security audits, and performance optimization for your business website.',
    icon: Globe,
  },
  {
    title: 'Domain & Hosting',
    titleTh: 'จดโดเมน & โฮสติ้ง',
    description: 'Secure domain registration and high-speed enterprise hosting solutions via Cloudflare ecosystem.',
    icon: Search,
  },
  {
    title: 'Custom Software',
    titleTh: 'รับจ้างเขียนโปรแกรม',
    description: 'Bespoke software development, automation scripts, and database management tailored to your needs.',
    icon: Code,
  },
  {
    title: 'LINE Chatbots',
    titleTh: 'รับทำ LINE Bot',
    description: 'Professional LINE OA integration with intelligent automated response systems and API connectivity.',
    icon: MessageSquareMore,
  },
];

const portfolio = [
  {
    title: 'E-Commerce Solution',
    category: 'Web Development',
    description: 'A full-stack online store with real-time inventory and payment integration.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Smart Office Bot',
    category: 'LINE Chatbots',
    description: 'Automated response system for office management and employee support via LINE.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'ERP Dashboard',
    category: 'Custom Software',
    description: 'Comprehensive enterprise resource planning system for manufacturing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Network Security Audit',
    category: 'IT Solutions',
    description: 'Complete infrastructure security assessment and hardening for a financial firm.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
  },
];

function App() {
  return (
    <div>
      {/* Navbar Area */}
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem' }}>
        <div className="nav-logo" style={{ padding: 0 }}>MYITDEV<span style={{color:'#fff'}}>.COM</span></div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#services" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Services</a>
          <a href="#portfolio" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Portfolio</a>
          <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Modern IT Solutions <br/> for the Digital Age</h1>
          <p>
            เราคือพาร์ทเนอร์ด้านเทคโนโลยีที่พร้อมดูแลคุณ ตั้งแต่การซ่อมบำรุงขั้นพื้นฐาน 
            ไปจนถึงการพัฒนาซอฟต์แวร์ระดับสูง เพื่อขับเคลื่อนธุรกิจของคุณสู่ความสำเร็จ
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="cta-button">
              Get Started Now
            </a>
            <a href="#services" style={{ padding: '1.1rem 2.5rem', color: '#fff', textDecoration: 'none', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}>
              View Services
            </a>
          </div>
        </div>
      </header>

      {/* Features/Stats Section (Quick) */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', margin: '4rem auto', textAlign: 'center' }}>
          <div>
            <ShieldCheck color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Secure & Reliable</h5>
          </div>
          <div>
            <Cpu color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>High Performance</h5>
          </div>
          <div>
            <Layers color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Scalable Tech</h5>
          </div>
      </section>

      {/* Services Section */}
      <section className="container" id="services">
        <h2 className="section-title">Our Specialized Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-wrapper">
                <service.icon size={32} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Service {index + 1}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
              <h4 style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: '400', marginBottom: '1.25rem' }}>{service.titleTh}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="container" style={{ padding: '8rem 0' }} id="portfolio">
        <h2 className="section-title">Success Stories</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '600px', margin: '-2rem auto 4rem', fontSize: '1.1rem' }}>
          ตัวอย่างผลงานและความสำเร็จที่เราได้ร่วมสร้างสรรค์ให้กับลูกค้าของเรา
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {portfolio.map((item, index) => (
            <div key={index} className="service-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(59, 130, 246, 0.9)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>
                  {item.category}
                </div>
              </div>
              <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>{item.description}</p>
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
                Contact Us
              </div>
              <h2>Let's build something <br/> great together.</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '3rem' }}>
                มีคำถามหรือต้องการคำปรึกษา? ส่งข้อความหาเราได้ทันที ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
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
              <form action="https://formspree.io/f/xkoqneda" method="POST">
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" className="form-control" placeholder="ชื่อ-นามสกุล" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="form-control" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" className="form-control" placeholder="หัวข้อที่ต้องการติดต่อ" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" className="form-control" placeholder="รายละเอียดความต้องการของคุณ..." required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">MYITDEV<span style={{color: '#3b82f6'}}>.COM</span></div>
          <p style={{ color: '#475569' }}>© {new Date().getFullYear()} MYITDEV IT Solutions. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating LINE Button */}
      <a href="https://line.me/ti/p/@your-line-id" target="_blank" rel="noopener noreferrer" className="line-float">
        <MessageSquareMore />
      </a>
    </div>
  );
}

export default App;
