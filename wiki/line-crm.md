# LINE CRM & Admin Hub

## Capabilities (CRM 3.0 baseline)

- Direct messaging from Admin Hub
- User tags
- Chat history viewer
- Bot Traffic monitor (crawler logs, not only LINE)
- Rich Menu manager (switch menus from dashboard)
- **AI Master Switch**: per LINE User, AI auto-reply vs manual
- Official LINE OA QR on public Contact section

## Related code

- Admin UI: `src/views/AdminView.tsx` (and state in `src/App.tsx`)
- Bot worker: `line-bot/src/index.ts`
- Menu scripts: `line-bot/create_menu.js`, `setup_menu.js`, root `fix_richmenu.cjs` (ops helpers)
- API: `notify_index.ts` routes used by Admin (auth, data)

## Mental model

| Concept | Meaning |
|---------|---------|
| LINE User | Profile in D1 keyed by LINE user id |
| Lead | Website/LIFF form row; not necessarily on LINE |
| AI Master Switch | Per-user automation toggle |
| Rich Menu | LINE client UI chrome, not website nav |

## Ops notes

- Rich menu images are sensitive to LINE size/format rules; past fixes live as image assets + scripts in repo history.
- Prefer Admin Hub for day-to-day; scripts for bootstrap or recovery.
