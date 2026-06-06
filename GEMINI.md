# 🚀 Project: MYITDEV.COM - Progress Report

## 📍 Last Status (May 27, 2026)
- **Domain:** `myitdev.com` is active. `www.myitdev.com` CNAME created and proxied.
- **Web Hosting:** Deployed on **Cloudflare Pages** (`myitdev-official`).
- **LINE Integration (CRM 2.0):** 
  - LINE Bot upgraded with AI Brain (Llama 3 8B) on Workers.
  - Contact Form routes data to LINE via `myitdev-notify` worker.
  - Admin Dashboard (`#admin`) secured with **LINE Login** (OAuth).
- **Database:** Cloudflare D1 (`myitdev-db`) implemented for Lead tracking and LINE User logging.
- **UI/UX & SEO:** 
  - Dark/Light Mode toggle implemented.
  - Knowledge Hub (Blog) section added with JSON-LD structured data.
  - Back to Top button & Beautiful Toast Notifications added.
  - Accessibility Score: 96/100, SEO: 100/100, Best Practices: 96/100.
- **Analytics:** Cloudflare Web Analytics and GA4 integrated concurrently.

## 🧠 Lessons Learned & Troubleshooting (Experience)
- **Client-side Routing & OAuth:** When redirecting back to a Single Page Application (React) after OAuth (like LINE Login), the URL structure matters. Query parameters MUST come before the hash fragment (e.g., `/?auth=token#admin`, NOT `/#admin?auth=token`). Browsers ignore query strings placed after the hash, causing the frontend to fail to extract the token.
- **Cloudflare API Tokens:** When creating tokens for MCP/CLI, be careful with `Not Before` timestamps (UTC timezone differences can lock you out). If using IP Filtering, ensure you use the Public IP, not the internal LAN IP (like 192.168.x.x), or the API will reject requests with `code 10000`.
- **LINE Login Webhook:** `Invalid redirect_uri` errors usually mean the `client_id` used in the code doesn't match the LINE Login Channel ID, or the callback URL isn't exactly registered in the LINE Developer Console.
- **PowerShell Escaping:** When writing files via CLI in Windows, `Set-Content` with multi-line strings can trigger security injection warnings if not handled perfectly. Direct file writes via MCP tools are safer and cleaner.
- **Agent Synchronization:** MCP Servers (`cloudflare`, `filesystem`, `fetch`, `canva`) and Skills (`9arm-skills`, `web-quality-audit`) should be synchronized between the Local Windows machine and the Remote AIS Server (192.168.1.202) to ensure consistent agent intelligence across environments.

## 🛠️ Detailed Next Steps
### Phase 3: Content & Email
1. **Email Forwarding:** Set up Cloudflare Email Routing for `info@myitdev.com`.
2. **Dashboard Refinement:** Expand the Admin Dashboard features (e.g., reply directly from the dashboard).
3. **Blog Content:** Add actual routing and individual pages for the blog posts.

## ⚡ Power Tools (Already Installed)
- **Gemini CLI:** Primary engine for orchestration.
- **Local Gemma Router:** Running on port 9379 (gemma3-1b-gpu-custom) for smart task routing.
- **Skills:** `cloudflare`, `web-quality-audit`, `9arm-skills` (debug-mantra, post-mortem, etc.)
