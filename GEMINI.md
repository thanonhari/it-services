# Project: MYITDEV.COM - Progress Report (legacy snapshot)

> **Canonical agent docs moved to:** [AGENTS.md](./AGENTS.md), [CONTEXT.md](./CONTEXT.md), [wiki/INDEX.md](./wiki/INDEX.md).  
> Prefer updating the wiki when facts change; keep this file only as a dated snapshot.

## Last Status (June 8, 2026)
- **Domain:** `myitdev.com` is active. Email Routing for `info@myitdev.com` is **Live** 📧.
- **Web Hosting:** Deployed on **Cloudflare Pages** (`myitdev-official`).
- **LINE Integration (CRM 3.0):** 
  - **Admin Hub Upgraded:** Direct Messaging, User Tags, Chat History Viewer, and **Bot Traffic Monitor** implemented.
  - **Rich Menu Manager:** Visual UI for switching Rich Menus directly from the dashboard.
  - **AI Master Switch:** Toggle between AI auto-response and Manual mode per user.
  - **QR Code:** Official LINE OA QR code integrated into the website's Contact section.
- **Backend/Notifications:** `myitdev-notify` worker acts as a central API. **Email Sending** is used for critical alerts (e.g. Bot Detection) to save LINE quotas.
- **AI Power:** Integrated with Cloudflare Workers AI (Llama 3.1 8B) for both the bot and Admin "Code Lab".
- **Database:** Cloudflare D1 (`myitdev-db`) stores user profiles, tags, chat history, and **bot traffic logs**.
- **Local SEO:** Google Maps embedded with precise coordinates and schema updated for physical shop indexing.

## 🧠 Lessons Learned & Troubleshooting (Experience)
- **Email Routing & Sending Blueprint:** Cloudflare Workers Email Sending (`env.EMAIL.send`) is a 100% free (200/day) alternative to SendGrid/LINE Push for transactional notifications. Requires DNS verification but is highly reusable across any Serverless project.
- **Edge Middleware Logging Blueprint:** Using `_middleware.ts` in Cloudflare Pages to silently capture data (like `User-Agent`) and write to D1 provides zero-latency analytics/bot-traps without blocking the frontend or relying on client-side JS.
- **Admin Authentication:** Using LINE Login (OAuth) to secure the Admin Hub allows for a seamless "Owner-only" experience.
- **Local vs. Cloud AI:** While local models (Gemma) provide privacy, Cloudflare Workers AI offers better availability and latency for web-based dashboard features.
- **State Management:** Using simple hash-based routing (`#admin`, `#blog`) is easy to implement but limits SEO for deep-linked content like blog posts.
- **Iframe Security:** Google Maps embeds require allowing external domains in the `frame-src` CSP header to avoid "This content is blocked" errors.

## 🛠️ Detailed Next Steps
### Phase 3: SEO, Content, & Marketing
1. **Google Review Incentives:** Build a LINE Bot flow where customers get a discount or privilege in exchange for a Google Business review.
2. **Blog Routing:** Upgrade to a robust routing system (e.g. `react-router-dom`) to allow unique, indexable URLs for each blog post (`/blog/post-slug`).
3. **SEO Meta Tags:** Enhance dynamic Open Graph (OG) tags for sharing pages beautifully on Facebook and LINE.

## ⚡ Power Tools (Already Installed)
- **Gemini CLI:** Primary engine for orchestration.
- **Cloudflare Workers AI:** Powering the bot and Admin Hub.
- **GitHub MCP:** Managing the codebase and issues.
