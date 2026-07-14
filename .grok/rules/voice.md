# Voice & Design Rules (MYITDEV)

Apply to: UI copy, blog drafts, commit messages, PR text, agent replies to the owner, and marketing snippets in this repo.

---

## Tone

| Context | Tone |
|---------|------|
| Thai site / LINE / customer | สุภาพ ชัด ใช้ได้จริง ใช้ "ครับ" ได้ตามบริบทบริการ |
| English site | Professional, short sentences, no buzzword salad |
| Agent → owner (Thai) | ตรง ประหยัดคำ บอกสิ่งที่ทำและสิ่งที่เหลือ |
| Code comments | English or Thai short "why"; never narrate the next line |

**Brand feel**: modern IT partner (repair → web → LINE bot → custom software). Competent and calm, not startup-hype.

---

## Hard bans

1. **No em dash** (`—` U+2014). Also avoid en dash abuse in prose. Use:
   - comma
   - period
   - parentheses
   - colon
2. **No hype words** (or Thai equivalents used as empty praise):
   - revolutionary, game-changing, seamless, cutting-edge, next-level, 10x magic, AI-powered (as filler)
   - สุดยอดเกินจริง, ปฏิวัติวงการ, ครบวงจรที่สุดในโลก (unless factually scoped)
3. **No fake urgency** in product UI ("Only today!!!") unless the business really runs a campaign.
4. **No inventing customer quotes or metrics**.

---

## Prefer

- Concrete nouns: "LINE OA webhook", "D1", "Turnstile", "Pages"
- Specific outcomes: "ส่งอีเมลแจ้ง bot scrape ไปที่ info@myitdev.com"
- Short paragraphs; bullets over walls of text
- Match existing copy style in `src/constants.ts`

---

## UI / design checklist

- Glassmorphism already defines the site; do not introduce a second visual language without asking.
- Keep dark/light theme tokens; do not hardcode one-off colors that break `data-theme`.
- Icons: Lucide only unless there is a strong reason.
- Forms: keep Turnstile + clear error/success strings (TH/EN).
- Mobile: nav and admin panels must remain usable; do not ship desktop-only admin flows.

---

## Pre-delivery self-check (copy & prose)

- [ ] No `—` characters in new prose
- [ ] No hype filler
- [ ] TH and EN both updated when user-facing strings change
- [ ] Claims match wiki / real stack
- [ ] Commit message is factual (what + why), not marketing

## Pre-delivery self-check (code)

- [ ] Scoped to the task
- [ ] No secrets
- [ ] Types still make sense
- [ ] API calls keep `credentials: 'include'` where admin session is required
