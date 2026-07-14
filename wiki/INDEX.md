# MYITDEV Second Brain (wiki)

**Scope: this product only** — `myitdev.com` (marketing site, Admin Hub, Notify API, LINE bot, D1).  
Not a company-wide multi-project brain. Not the blank domain template.

**Rule:** Search here and root `CONTEXT.md` before asking the owner to re-explain durable facts about **this** stack.

| Page | What it holds |
|------|----------------|
| [architecture.md](./architecture.md) | Systems map, deploy targets, data flow |
| [api-map.md](./api-map.md) | Notify + bot routes the SPA/middleware actually call |
| [stack.md](./stack.md) | Tech choices, commands, env/secrets **names** (not values) |
| [line-crm.md](./line-crm.md) | LINE OA, Admin Hub CRM, rich menu, AI switch |
| [business.md](./business.md) | Brand, services, phone, email, map, LINE links |
| [lessons.md](./lessons.md) | Hard-won blueprints and pitfalls |
| [roadmap.md](./roadmap.md) | Next work (Phase 3+) |
| [session-protocol.md](./session-protocol.md) | How agents start/end sessions on this repo |
| [scope.md](./scope.md) | What belongs in this wiki vs elsewhere |

## How to use (agents)

1. Open this INDEX.
2. Open 1–2 relevant pages (usually architecture + line-crm or stack).
3. Answer or implement from that context.
4. If you learn a durable **myitdev** fact, update the page; keep it short.
5. Do **not** put other businesses, personal notes, or unrelated product docs here.

## How to use (owner)

- Drop decisions as a bullet on the right page.
- Prefer this wiki over re-typing stack context every chat.
- Legacy narrative snapshot: root `GEMINI.md` (migrate facts **here** when they change).
- Other domains (music, other clients): use a **separate repo or folder** + [domain template](../templates/domain-agent-setup/README.md). Do not mix into these pages.
