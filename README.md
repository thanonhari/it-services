# MYITDEV.COM - Professional IT Solutions

เว็บไซต์ Portfolio และบริการด้านไอที (Computer Repair, Web Dev, LINE Bot, Software Development) ภายใต้แบรนด์ **MYITDEV.COM**

## Features

- Modern glassmorphism UI, responsive layout
- React + Vite performance stack
- Admin Hub + LINE CRM backend (Cloudflare)

## Tech stack

- **Frontend**: React 18, TypeScript, Vite, Lucide
- **Edge**: Cloudflare Pages, Workers, D1
- **Messaging**: LINE OA bot worker

## Local development

```bash
npm install
npm run dev
```

## Agent setup (5 switches)

Coding agents in this repo follow durable rules so work stays fast without re-explaining context every chat.

| # | Switch | Where |
|---|--------|--------|
| 1 | Read the project before editing | [AGENTS.md](./AGENTS.md) |
| 2 | Voice / design gate | [.grok/rules/voice.md](./.grok/rules/voice.md) |
| 3 | Model routing (fast vs strong) | [AGENTS.md](./AGENTS.md) + [.grok/rules/model-routing.md](./.grok/rules/model-routing.md) |
| 4 | Images / video in-session | [.grok/rules/media.md](./.grok/rules/media.md) |
| 5 | Second Brain wiki | [wiki/INDEX.md](./wiki/INDEX.md) + [CONTEXT.md](./CONTEXT.md) |

Start any serious session at **AGENTS.md** and **wiki/INDEX.md**.

---
© 2026 MYITDEV.COM. All rights reserved.
