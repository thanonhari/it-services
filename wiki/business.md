# Business snapshot (myitdev)

Facts from the **marketing site** and domain language.  
Not a legal entity registry extract. Update when the live Contact section or brand changes.

Source files: `src/views/MainView.tsx`, `src/constants.ts`, `CONTEXT.md`.

---

## Brand

| Field | Value |
|-------|--------|
| Brand | MYITDEV / MYITDEV.COM |
| Shop label (Contact) | MyIT ร้านซ่อมคอมฯ และเวป |
| Positioning | IT partner for Thai SMEs and local clients: repair → web → domain/hosting → custom software → LINE bots |
| Public site | https://myitdev.com |
| Pages project | `myitdev-official` |

---

## Services (site catalog)

From `services` in `src/constants.ts`:

| # | TH | EN (short) |
|---|----|------------|
| 1 | ซ่อมคอมพิวเตอร์ | Computer repair / PC & laptop diagnostic, recovery, upgrade |
| 2 | ดูแลเว็บไซต์ | Website management, security, performance |
| 3 | จดโดเมน & โฮสติ้ง | Domain & hosting (Cloudflare-oriented hosting story) |
| 4 | รับจ้างเขียนโปรแกรม | Custom software / automation |
| 5 | รับทำ LINE Bot | LINE OA chatbots and API integrations |

Portfolio samples on site (illustrative, Unsplash images): E-Commerce Solution, Smart Office Bot, ERP Dashboard.

---

## Contact channels

| Channel | Value | Notes |
|---------|--------|--------|
| Email | `info@myitdev.com` | Public contact + email routing / alerts target |
| Phone | `+66 88 760 2708` | Shown on Contact section |
| Location label | Chachoengsao, Thailand | Map pin text |
| Map coordinates | `13.689034044847766, 101.08896318777248` | Embedded Maps + Google review deep link |
| Google review CTA | Maps search URL with same coords | Button: รีวิวให้เราบน Google |
| LINE add friend | https://lin.ee/Ywrvclv | Floating LINE button |
| LINE QR | Official QR image `.../sid/M/643mztqx.png` | Contact section |
| Transactional from | `notify@myitdev.com` | Bot alert mail (system), not customer support inbox |

---

## Digital product surfaces (customer vs owner)

| Surface | Who | URL / path |
|---------|-----|------------|
| Marketing Site | Customer | `myitdev.com` |
| Contact form | Customer | `#contact` / form → Notify |
| Blog / Knowledge Hub | Customer | `/blog/...` |
| LIFF service form | LINE user | LIFF + bot `/submit-liff` |
| Admin Hub | Owner only | `myitdev.com/admin` |
| Notify API | Systems + Admin | `notify.myitdev.com` |

---

## Languages & theme (site UX)

- Default language preference: `localStorage` key `lang` (`th` / `en`)
- Theme: `localStorage` key `theme` (`dark` / `light`)
- UI copy: `src/constants.ts` → `translations`

---

## What this page does **not** claim

- Fixed price list (not in repo constants)
- Office hours (not in MainView contact block as of this write-up)
- Tax ID / company registration number
- Guaranteed response SLA

Add those here only when they are real and you want agents to repeat them.

---

## Agent use

- Customer-facing copy or OG ideas: align with services + tone in `.grok/rules/voice.md`
- “Where is the shop?” → coords + Chachoengsao + Maps link above
- “How do customers reach us?” → email, phone, LINE link/QR, contact form
- Do not invent a second phone number or LINE URL
