# Stack & operations

## Frontend

- React 18, TypeScript, Vite 5
- `react-router-dom`, `react-helmet-async`, `lucide-react`
- Theme + language in `localStorage` (`theme`, `lang`)
- Copy: `src/constants.ts` (`translations`, `services`, `portfolio`, `API_BASE`)

### Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Workers

| Worker | Config | Notes |
|--------|--------|-------|
| `myitdev-notify` | `notify_wrangler.toml` | main: `notify_index.ts` |
| `myitdev-bot` | `line-bot/wrangler.toml` | main: `line-bot/src/index.ts`, AI binding |

D1: `myitdev-db` (id recorded in wrangler files; do not invent new IDs).

## Secrets / bindings (names only)

**Notify (examples from code/comments)**

- `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`
- LINE OAuth-related secrets as configured in dashboard
- Email send binding
- `BOT_LOG_SECRET` (Pages + notify)
- D1 `DB`

**LINE bot**

- `LINE_CHANNEL_ACCESS_TOKEN`
- `LINE_CHANNEL_SECRET`
- D1 `DB`
- Workers AI binding `AI`

Never commit secret values. Prefer Wrangler secrets / dashboard.

## Domains

| Host | Role |
|------|------|
| `myitdev.com` | Marketing + Admin UI |
| `notify.myitdev.com` | API + OAuth callback |
| `info@myitdev.com` | Inbox / alerts target |
| `notify@myitdev.com` | Transactional from-address |

## Product AI vs coding AI

- **Workers AI** (e.g. Llama family): LINE replies + Admin Code Lab
- **Grok / Claude in terminal**: development only; not wired as the customer-facing bot model by default
