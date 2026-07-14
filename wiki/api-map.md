# API map (myitdev)

Base for the SPA: `https://notify.myitdev.com` (`API_BASE` in `src/constants.ts`).  
Source of truth for routes: `notify_index.ts`.  
LINE bot worker: `line-bot/src/index.ts` (separate host).

Auth cookie: `admin_session` on Domain=`.myitdev.com` (HttpOnly).  
Admin calls use `credentials: 'include'`.

Legend: **Public** | **Admin** (session) | **Secret** (header)

---

## Notify worker (`notify.myitdev.com`)

### Config & auth

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/config` | Public | Returns `{ turnstileSiteKey }` for contact form |
| GET | `/auth/login` | Public | Starts LINE Login OAuth (stores `oauth_states`) |
| GET | `/auth/callback` | Public | OAuth callback; only `ADMIN_USER_ID` allowed; sets session; redirect `/admin` |
| GET | `/auth/me` | Cookie optional | `{ authenticated: boolean }` |
| POST | `/auth/logout` | Cookie | Clears session row + cookie |

### Leads, users, push

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/leads` | Admin | Bundle: leads, line_users, bot_logs (50), `stats.aiMessagesToday` |
| PATCH | `/api/leads/:id` | Admin | Body: `{ status?, notes? }` |
| PATCH | `/api/users/:userId` | Admin | Body: `{ ai_enabled?, tags? }` (AI Master Switch + tags) |
| POST | `/api/push` | Admin | Body: `{ userId, message }` → LINE push API |

### Blog CMS

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/posts` | Public | List posts (ordered by `created_at` desc) |
| GET | `/api/posts/:id` | Public | Single post by id |
| POST | `/api/posts` | Admin | Upsert post fields (id, titles, excerpt, content_th/en, date, time, image, category) |

### Bot traffic

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/bot-log` | Admin | Last 100 `bot_logs` |
| POST | `/api/bot-log` | Secret `X-Bot-Log-Secret` | From Pages middleware; dedupe 1h per bot+path; optional email alert |

### Chat, AI lab, rich menu

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/history/:userId` | Admin | `chat_history` for one LINE user |
| POST | `/api/ai/gen` | Admin | Body: `{ prompt }` → Workers AI `@cf/meta/llama-3.1-8b-instruct` |
| GET | `/api/richmenus` | Admin | LINE rich menu list + default id |
| POST | `/api/richmenus/default/:richMenuId` | Admin | Set default rich menu for all users |

### Contact (public)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/contact` | Public + Turnstile | Lead from marketing form |
| POST | `/` | Public + Turnstile | Same handler as contact (legacy) |

Contact body (typical): `name`, `email`, `subject`, `message`, `turnstileToken`; honeypot field `website` (if filled → fake success).

CORS allow origin: `https://myitdev.com` (see worker).

---

## Pages edge (`myitdev.com` Functions)

| Piece | Path | Purpose |
|-------|------|---------|
| Middleware | `functions/_middleware.ts` | Classify UA; POST bot-log to Notify with secret; skip static assets |

---

## LINE bot worker

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/webhook` | LINE signature (worker) | OA events: reply, profile, history, AI when enabled |
| POST | `/submit-liff` | Public from LIFF (as wired) | LIFF service request → leads path in bot DB |

**Note:** LIFF form in `src/LiffForm.tsx` currently posts to  
`https://myitdev-bot.thanonhari.workers.dev/submit-liff`  
(workers.dev host, not `notify.myitdev.com`). Prefer documenting any custom domain if added later.

---

## SPA → API usage (quick)

| UI | Calls |
|----|--------|
| Main contact form | `GET /api/config`, `POST /api/contact` |
| Blog list/detail | `GET /api/posts` (+ detail by id if used) |
| Admin login link | `/auth/login` |
| Admin session | `GET /auth/me`, `POST /auth/logout` |
| Admin dashboard load | `GET /api/leads` |
| Lead status | `PATCH /api/leads/:id` |
| Tags / AI switch | `PATCH /api/users/:userId` |
| Push DM | `POST /api/push` |
| Chat drawer | `GET /api/history/:userId` |
| Code Lab | `POST /api/ai/gen` |
| Rich menus | `GET /api/richmenus`, `POST /api/richmenus/default/:id` |
| Create/update post | `POST /api/posts` |

---

## When this page is wrong

If a route 404s or body shape changed, re-read `notify_index.ts` / `App.tsx` / `AdminView.tsx` and patch this file. Do not invent paths.
