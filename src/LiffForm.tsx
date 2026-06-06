import React, { useState, useEffect } from 'react';
import { Send, User, Phone, MessageSquare, Wrench, Globe, Code as CodeIcon } from 'lucide-react';

function LiffForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'repair',
    details: ''
  });

  useEffect(() => {
    // Initialize LIFF
    if ((window as any).liff) {
      (window as any).liff.init({ liffId: "2009380094-gwpeKOqV" }).then(async () => {
        if (!(window as any).liff.isLoggedIn()) {
          (window as any).liff.login();
        } else {
          const profile = await (window as any).liff.getProfile();
          setUserId(profile.userId);
          setFormData(prev => ({ ...prev, name: profile.displayName }));
        }
      }).catch((err: any) => console.error("LIFF Init Error", err));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://myitdev-bot.thanonhari.workers.dev/submit-liff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (response.ok) {
        setStatus('success');
        // Close LIFF after 3 seconds
        setTimeout(() => {
          if ((window as any).liff) {
            (window as any).liff.closeWindow();
          }
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: '1.5rem', background: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: 'Kanit, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }}>แจ้งความประสงค์บริการ</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>กรุณากรอกข้อมูลเพื่อให้เจ้าหน้าที่ติดต่อกลับครับ</p>
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '20px', border: '1px solid #22c55e' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ marginBottom: '1rem' }}>ส่งข้อมูลสำเร็จ!</h3>
          <p style={{ color: '#94a3b8' }}>ขอบคุณครับ เจ้าหน้าที่กำลังตรวจสอบข้อมูลและจะติดต่อกลับโดยเร็วที่สุดครับ</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <User size={16} /> ชื่อผู้ติดต่อ
            </label>
            <input 
              type="text" 
              className="form-control" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem', width: '100%', color: '#fff' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Phone size={16} /> เบอร์โทรศัพท์
            </label>
            <input 
              type="tel" 
              className="form-control" 
              required 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem', width: '100%', color: '#fff' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Wrench size={16} /> เลือกบริการ
            </label>
            <select 
              value={formData.service}
              onChange={e => setFormData({...formData, service: e.target.value})}
              style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem', width: '100%', color: '#fff' }}
            >
              <option value="repair">ซ่อมคอมพิวเตอร์ / โน๊ตบุ๊ค</option>
              <option value="web">ทำเว็บไซต์ / SEO</option>
              <option value="software">เขียนโปรแกรมเฉพาะทาง</option>
              <option value="line">ทำ LINE Bot อัจฉริยะ</option>
              <option value="other">ปรึกษาปัญหาไอทีอื่นๆ</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <MessageSquare size={16} /> รายละเอียดความต้องการ
            </label>
            <textarea 
              rows={4}
              value={formData.details}
              onChange={e => setFormData({...formData, details: e.target.value})}
              style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem', width: '100%', color: '#fff', resize: 'none' }}
              placeholder="เช่น อาการเสีย หรือชื่อเว็บไซต์ที่ต้องการ..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ 
              background: '#3b82f6', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '1rem', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '1rem'
            }}
          >
            {status === 'loading' ? 'กำลังส่งข้อมูล...' : <><Send size={18} /> ส่งข้อมูลแจ้งเจ้าหน้าที่</>}
          </button>
        </form>
      )}
    </div>
  );
}

export default LiffForm;
