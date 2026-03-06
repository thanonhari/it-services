import React from 'react';
import { 
  Wrench, 
  Globe, 
  Search, 
  Code, 
  MessageSquareMore, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const services = [
  {
    title: 'ซ่อมคอมพิวเตอร์',
    description: 'บริการซ่อมคอมพิวเตอร์ โน้ตบุ๊ก ทั้ง hardware และ software แก้ไขปัญหาคอมช้า ติดไวรัส หรืออัปเกรดเครื่องให้แรงขึ้น',
    icon: Wrench,
  },
  {
    title: 'ดูแลเว็บไซต์',
    description: 'รับดูแลเว็บไซต์รายเดือน อัปเดตข้อมูล แก้ไขบั๊ก ปรับปรุงประสิทธิภาพ และดูแลความปลอดภัยของระบบ',
    icon: Globe,
  },
  {
    title: 'จดโดเมนเนม',
    description: 'บริการจดชื่อโดเมนเนม (.com, .co.th, .net) และจัดหา Hosting ที่รวดเร็ว เสถียร พร้อมใช้งาน',
    icon: Search,
  },
  {
    title: 'รับจ้างเขียนโปรแกรม',
    description: 'พัฒนาโปรแกรมตามความต้องการ ทั้ง Desktop App, Web App หรือระบบจัดการฐานข้อมูลขนาดเล็กถึงกลาง',
    icon: Code,
  },
  {
    title: 'รับทำ LINE Bot',
    description: 'สร้าง LINE Official Account พร้อมระบบตอบกลับอัตโนมัติ (Chatbot) เชื่อมต่อ API เพื่อความสะดวกของธุรกิจ',
    icon: MessageSquareMore,
  },
];

function App() {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Professional IT Solutions</h1>
          <p>
            บริการด้านไอทีครบวงจร โดยผู้เชี่ยวชาญที่มีประสบการณ์ 
            เราพร้อมดูแลทุกปัญหาเทคโนโลยีเพื่อให้ธุรกิจของคุณเดินหน้าต่อได้อย่างราบรื่น
          </p>
          <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="cta-button">
            ปรึกษาเราได้เลยที่ LINE
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section className="container">
        <h2 className="section-title">บริการของเรา</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-wrapper">
                <service.icon size={28} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div style={{ background: '#f1f5f9', padding: '4rem 2rem', borderRadius: '24px', marginBottom: '5rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>ทำไมต้องเลือกเรา?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <CheckCircle2 color="#2563eb" size={40} style={{ marginBottom: '1rem' }} />
              <h4>เชี่ยวชาญเฉพาะทาง</h4>
              <p style={{ color: '#64748b' }}>ทีมงานมีประสบการณ์ตรงในสายงานไอที</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CheckCircle2 color="#2563eb" size={40} style={{ marginBottom: '1rem' }} />
              <h4>บริการรวดเร็ว</h4>
              <p style={{ color: '#64748b' }}>ตอบกลับไว แก้ไขปัญหาได้ทันท่วงที</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CheckCircle2 color="#2563eb" size={40} style={{ marginBottom: '1rem' }} />
              <h4>ราคาเป็นกันเอง</h4>
              <p style={{ color: '#64748b' }}>ประเมินราคาตามจริง ไม่มีค่าใช้จ่ายแฝง</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} IT Solutions & Repair. All rights reserved.</p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
