# MYITDEV Context

Domain language for the myitdev.com IT services business and its Cloudflare-hosted product stack (marketing site, Admin Hub, LINE CRM, notify API).

## Language

### Business

**MYITDEV**:
The brand and business providing computer repair, website care, domain/hosting, custom software, and LINE bots for Thai SMEs and local clients.
_Avoid_: generic "agency", "startup" when referring to the shop brand

**Customer**:
A person or business who buys IT services or contacts via web form / LINE OA.
_Avoid_: lead (use **Lead** only for unconverted form rows), client (prefer Customer in domain text)

**Lead**:
A contact-form or LIFF submission stored before full sales conversion (`leads` table).
_Avoid_: calling authenticated LINE followers "leads" by default

**Service**:
One of the offered lines of work (repair, website, domain/hosting, custom software, LINE bot) as shown on the site.
_Avoid_: product SKU language unless a real catalog is added

### Product surfaces

**Marketing Site**:
The public React SPA on Cloudflare Pages (`myitdev-official`), domain `myitdev.com`.
_Avoid_: "the app" when you mean only the public pages

**Admin Hub**:
Owner-only dashboard at `/admin` for LINE community, rich menus, blog, AI lab, traffic.
_Avoid_: CMS (unless speaking only about blog posts)

**LINE OA / Bot**:
Official LINE account automation via Worker `myitdev-bot`; CRM features live here and in Admin Hub.
_Avoid_: Messenger, WhatsApp as synonyms

**Rich Menu**:
LINE OA bottom menu image + tappable areas managed from Admin Hub / scripts.
_Avoid_: navbar, app drawer

**Notify API**:
Worker `myitdev-notify` on `notify.myitdev.com`: contact API, admin auth, bot-log, email alerts, shared backend for the site.
_Avoid_: "backend" alone when the bot worker is meant instead

**Code Lab / AI Lab**:
Admin feature that calls Cloudflare Workers AI for ad-hoc prompts (not the coding agent in this repo).
_Avoid_: Claude, Grok when describing production AI bindings

### Identity & security

**Admin Session**:
HttpOnly cookie `admin_session` on `.myitdev.com` after LINE Login OAuth via Notify API.
_Avoid_: JWT in localStorage as the intended model

**Turnstile**:
Cloudflare bot challenge on the public contact form.
_Avoid_: reCAPTCHA unless migrating

**Bot Log**:
Edge middleware detection of AI/search crawlers, posted to Notify `/api/bot-log`, optionally emailed.
_Avoid_: analytics (use **Bot Traffic** for this stream)

### Data

**myitdev-db**:
Shared Cloudflare D1 database for leads, LINE users, chat history, tags, bot traffic, blog as applicable.
_Avoid_: inventing a second primary database name

**LINE User**:
A follower/profile row keyed by LINE `user_id`, with tags, AI master switch, chat history.
_Avoid_: Customer when only the LINE identity is known

**AI Master Switch**:
Per-user flag: AI auto-reply vs manual owner reply in the bot/CRM.
_Avoid_: global kill switch (unless a global one is explicitly added)

### Content

**Blog Post**:
Article shown on the marketing site and managed from Admin; needs indexable routes (`/blog/:slug`).
_Avoid_: "page" when a post entity is meant

## Flagged ambiguities

- **Bot** may mean LINE chatbot or crawler bot in Bot Log. Prefer **LINE Bot** vs **crawler / Bot Log**.
- **AI** may mean Workers AI in production or the coding agent in the terminal. Prefer **Workers AI** vs **coding agent**.

## Example dialogue

Dev: The Customer submitted a Lead from the contact form; should the LINE Bot message them?
Owner: Only if they also became a LINE User. Leads hit Notify API and D1; the LINE Bot only sees LINE Users. Use Admin Hub to push manually if needed.

Dev: Bot Log shows GPTBot hitting `/`. Is that the LINE Bot failing?
Owner: No. That is crawler Bot Traffic from Pages middleware into Notify, not the LINE OA Worker.
