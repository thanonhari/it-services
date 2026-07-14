import { Wrench, Globe, Search, Code, MessageSquareMore, LayoutDashboard, Bot, MonitorSmartphone } from 'lucide-react';
import type { Language } from './types';

// ─── Translations ────────────────────────────────────────────────────────────

export const translations = {
  th: {
    nav: { services: 'บริการ', portfolio: 'ผลงาน', blog: 'บทความ', contact: 'ติดต่อเรา' },
    hero: {
      title: 'ซ่อมคอม · ทำเว็บ · LINE Bot\nฉะเชิงเทรา และทั่วไทย',
      subtitle: 'ร้าน IT ที่คุยภาษางานได้จริง รับซ่อมคอมพิวเตอร์ ดูแลเว็บไซต์ จดโดเมน เขียนโปรแกรม และระบบ LINE OA สำหรับร้านค้าและออฟฟิศ',
      cta: 'ทัก LINE เลย',
      secondary: 'ส่งข้อความหาเรา',
      tertiary: 'ดูบริการ',
      trust: 'ตอบไว · งานชัด · ราคาคุยได้',
    },
    features: { secure: 'ปลอดภัย & เชื่อถือได้', performance: 'ประสิทธิภาพสูง', scalable: 'เทคโนโลยีทันสมัย' },
    services: { title: 'บริการที่เชี่ยวชาญ', service: 'บริการที่' },
    portfolio: { title: 'ผลงานของเรา', subtitle: 'ระบบและเว็บที่เราออกแบบและดูแลจริง' },
    blog: {
      title: 'ศูนย์รวมความรู้',
      subtitle: 'บทความสาระน่ารู้เกี่ยวกับ IT เพื่อช่วยให้ธุรกิจของคุณเติบโต',
      readMore: 'อ่านต่อ',
      back: 'กลับไปหน้าหลัก',
      loading: 'กำลังโหลดบทความ...',
      empty: 'ยังไม่มีบทความในขณะนี้',
    },
    contact: {
      title: 'คุยงานกับเราได้เลย',
      name: 'ชื่อ-นามสกุล',
      email: 'อีเมล',
      subject: 'หัวข้อ',
      message: 'ข้อความ',
      submit: 'ส่งข้อความ',
      sending: 'กำลังส่ง...',
      success: 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุดครับ',
      error: 'เกิดข้อผิดพลาด กรุณาลองใหม่ครับ',
      captcha: 'กรุณายืนยันว่าไม่ใช่บอทก่อนส่งข้อความครับ',
    },
    footer: { rights: 'สงวนลิขสิทธิ์' },
  },
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', blog: 'Blog', contact: 'Contact' },
    hero: {
      title: 'PC repair · Web · LINE bots\nChachoengsao & Thailand',
      subtitle: 'Practical IT for shops and offices: computer repair, websites, domains, custom software, and LINE OA automation.',
      cta: 'Chat on LINE',
      secondary: 'Send a message',
      tertiary: 'View services',
      trust: 'Fast reply · Clear scope · Fair quote',
    },
    features: { secure: 'Secure & Reliable', performance: 'High Performance', scalable: 'Scalable Tech' },
    services: { title: 'Our Specialized Services', service: 'Service' },
    portfolio: { title: 'Selected work', subtitle: 'Systems and sites we design and operate' },
    blog: {
      title: 'Knowledge Hub',
      subtitle: 'IT articles to help your business grow.',
      readMore: 'Read More',
      back: 'Back to Main',
      loading: 'Loading articles...',
      empty: 'No articles yet',
    },
    contact: {
      title: "Let's talk about your project",
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent! We will get back to you soon.',
      error: 'Something went wrong, please try again.',
      captcha: 'Please complete the security check before sending.',
    },
    footer: { rights: 'All rights reserved.' },
  },
} as const;

export type Translations = typeof translations;

export function getT(lang: Language) {
  return translations[lang];
}

// ─── Services ─────────────────────────────────────────────────────────────────

export const services = [
  { id: 1, title: 'Computer Repair', titleTh: 'ซ่อมคอมพิวเตอร์', descEn: 'Expert hardware diagnostic and software recovery for PC & Laptops.', descTh: 'บริการซ่อมคอมพิวเตอร์และโน้ตบุ๊ก ตรวจเช็คอาการ กู้ข้อมูล และอัปเกรดเครื่องให้เร็วแรง', icon: Wrench },
  { id: 2, title: 'Website Management', titleTh: 'ดูแลเว็บไซต์', descEn: 'Ongoing maintenance, security audits, and performance optimization.', descTh: 'ดูแลรักษาเว็บไซต์ ตรวจสอบความปลอดภัย และเพิ่มประสิทธิภาพให้เว็บของคุณทำงานได้ลื่นไหลเสมอ', icon: Globe },
  { id: 3, title: 'Domain & Hosting', titleTh: 'จดโดเมน & โฮสติ้ง', descEn: 'Secure domain registration and high-speed enterprise hosting.', descTh: 'บริการจดชื่อโดเมนและพื้นที่โฮสติ้งความเร็วสูง พร้อมระบบความปลอดภัยจาก Cloudflare', icon: Search },
  { id: 4, title: 'Custom Software', titleTh: 'รับจ้างเขียนโปรแกรม', descEn: 'Bespoke software development and automation scripts.', descTh: 'รับเขียนโปรแกรมตามความต้องการ ระบบอัตโนมัติ และจัดการฐานข้อมูลที่ออกแบบมาเพื่อคุณโดยเฉพาะ', icon: Code },
  { id: 5, title: 'LINE Chatbots', titleTh: 'รับทำ LINE Bot', descEn: 'Professional LINE OA integration and automated response systems.', descTh: 'พัฒนา LINE Chatbot สำหรับธุรกิจ ระบบตอบกลับอัตโนมัติ และเชื่อมต่อ API เพื่อความสะดวก', icon: MessageSquareMore },
] as const;

// ─── Portfolio (real MYITDEV systems; CSS cards, no stock photos) ─────────────

export const portfolio = [
  {
    title: 'MYITDEV Admin Hub',
    titleTh: 'Admin Hub + CRM',
    category: 'Custom Software',
    categoryTh: 'ซอฟต์แวร์',
    descEn: 'Owner dashboard: LINE community, tags, chat history, rich menus, and AI master switch on Cloudflare.',
    descTh: 'แดชบอร์ดเจ้าของร้าน: ชุมชน LINE, แท็ก, ประวัติแชท, Rich Menu และสวิตช์ AI บน Cloudflare',
    icon: LayoutDashboard,
    accent: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
  },
  {
    title: 'LINE OA + Workers AI',
    titleTh: 'LINE OA + AI ตอบอัตโนมัติ',
    category: 'LINE Chatbots',
    categoryTh: 'LINE Bot',
    descEn: 'Production LINE bot with D1 history, per-user AI toggle, and alert email without burning push quota.',
    descTh: 'LINE Bot จริงในงาน: เก็บประวัติบน D1, เปิด-ปิด AI รายคน, แจ้งเตือนอีเมลแทนการเผาโควตา push',
    icon: Bot,
    accent: 'linear-gradient(135deg, #06c755 0%, #0f172a 100%)',
  },
  {
    title: 'myitdev.com',
    titleTh: 'เว็บ myitdev.com',
    category: 'Web Development',
    categoryTh: 'เว็บไซต์',
    descEn: 'Marketing site + contact pipeline on Cloudflare Pages, Turnstile, and Notify API.',
    descTh: 'เว็บขายบริการ + ฟอร์มติดต่อบน Cloudflare Pages, Turnstile และ Notify API',
    icon: MonitorSmartphone,
    accent: 'linear-gradient(135deg, #0891b2 0%, #0f172a 100%)',
  },
] as const;

// ─── API & contact channels ───────────────────────────────────────────────────

export const API_BASE = 'https://notify.myitdev.com';

/** Include session cookie on cross-subdomain API calls (notify.myitdev.com). */
export const API_CREDENTIALS = { credentials: 'include' as RequestCredentials };

export const LINE_ADD_URL = 'https://lin.ee/Ywrvclv';
export const PHONE_DISPLAY = '+66 88 760 2708';
export const PHONE_HREF = 'tel:+66887602708';
export const EMAIL_PUBLIC = 'info@myitdev.com';
export const MAPS_REVIEW_URL =
  'https://www.google.com/maps/search/?api=1&query=13.689034044847766,101.08896318777248';
export const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=13.689034044847766,101.08896318777248&t=&z=15&ie=UTF8&iwloc=&output=embed';
export const LINE_QR_URL = 'https://qr-official.line.me/sid/M/643mztqx.png';
