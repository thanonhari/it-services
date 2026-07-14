# Architecture

## Systems

```
                    ┌─────────────────────────────┐
                    │  myitdev.com (Pages)        │
                    │  React SPA + functions/     │
                    │  project: myitdev-official  │
                    └─────────────┬───────────────┘
                                  │ API + cookie
                                  v
                    ┌─────────────────────────────┐
                    │  notify.myitdev.com         │
                    │  Worker: myitdev-notify     │
                    │  auth, leads, bot-log, mail │
                    └─────────────┬───────────────┘
                                  │ D1
                                  v
                          ┌───────────────┐
                          │  myitdev-db   │
                          └───────▲───────┘
                                  │ D1
                    ┌─────────────┴───────────────┐
                    │  LINE platform webhooks     │
                    │  Worker: myitdev-bot        │
                    │  Workers AI, rich menu, CRM │
                    └─────────────────────────────┘
```

## Key paths

| Piece | Repo location | Runtime |
|-------|---------------|---------|
| UI | `src/` | Cloudflare Pages |
| Bot UA middleware | `functions/_middleware.ts` | Pages Functions |
| Notify worker source | `notify_index.ts` | Worker + route `notify.myitdev.com` |
| Notify wrangler | `notify_wrangler.toml` | deploy config |
| LINE bot | `line-bot/src/index.ts` | Worker `myitdev-bot` |
| Shared D1 | `schema.sql` (+ other `*_schema.sql`) | `myitdev-db` |

## Auth flow (Admin)

1. Owner hits Admin Hub → Login via LINE OAuth on Notify.
2. Callback sets `admin_session` cookie Domain=`.myitdev.com`.
3. SPA calls `API_BASE` (`https://notify.myitdev.com`) with `credentials: 'include'`.

## Contact form

1. Browser + Turnstile → Notify API.
2. Row in `leads` (and any notify side-effects).
3. Not automatically a LINE User until they add the OA / LIFF path.

## Bot Traffic logging

1. `functions/_middleware.ts` classifies User-Agent.
2. POST `https://notify.myitdev.com/api/bot-log` with `X-Bot-Log-Secret`.
3. Optional email from `notify@myitdev.com` → `info@myitdev.com`.

## Email

- Routing live for `info@myitdev.com`.
- Transactional send via Workers Email binding on notify (quota-friendly vs LINE push for alerts).

## Routing (frontend)

- `react-router-dom`: main, `/admin`, `/blog/:slug` (and LIFF form routes as implemented).
- Legacy hash `#admin`, `#blog/...` redirected in `App.tsx`.
