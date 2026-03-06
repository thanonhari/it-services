import React from 'react';
import { 
  Wrench, 
  Globe, 
  Search, 
  Code, 
  MessageSquareMore, 
  ShieldCheck,
  Cpu,
  Layers
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

function App() {
  return (
    <div>
      {/* Navbar Area */}
      <nav className="container">
        <div className="nav-logo">MYITDEV<span style={{color:'#fff'}}>.COM</span></div>
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
            <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="cta-button">
              Get Started Now
            </a>
            <a href="#services" style={{ padding: '1.1rem 2.5rem', color: '#fff', textDecoration: 'none', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px' }}>
              View Services
            </a>
          </div>
        </div>
      </header>

      {/* Features/Stats Section (Quick) */}
      <section className="container" id="services" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', margin: '4rem auto', textAlign: 'center' }}>
          <div>
            <ShieldCheck color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem' }}>Secure & Reliable</h5>
          </div>
          <div>
            <Cpu color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem' }}>High Performance</h5>
          </div>
          <div>
            <Layers color="#3b82f6" size={32} style={{ marginBottom: '0.5rem' }} />
            <h5 style={{ fontSize: '1.1rem' }}>Scalable Tech</h5>
          </div>
      </section>

      {/* Services Section */}
      <section className="container">
        <h2 className="section-title">Our Specialized Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-wrapper">
                <service.icon size={32} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Service {index + 1}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
              <h4 style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: '400', marginBottom: '1.25rem' }}>{service.titleTh}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '6rem 0', textAlign: 'center', marginTop: '4rem' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to optimize your IT?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            ไม่ว่าจะเป็นโปรเจกต์ขนาดเล็กหรือใหญ่ ทีมงาน MYITDEV พร้อมให้คำปรึกษาและลงมือทำอย่างมืออาชีพ
          </p>
          <a href="https://line.me" className="cta-button">
            Chat with our Experts
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">MYITDEV<span style={{color: '#3b82f6'}}>.COM</span></div>
          <p style={{ color: '#475569' }}>© {new Date().getFullYear()} MYITDEV IT Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
