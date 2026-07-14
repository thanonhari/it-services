# Wiki scope (myitdev only)

## In scope (write here)

| Topic | Example page |
|-------|----------------|
| Cloudflare Pages / Workers / D1 for this site | architecture, stack |
| `myitdev.com` / `notify.myitdev.com` behavior | architecture, api-map |
| HTTP routes Notify / bot / SPA callers | api-map |
| Brand, services, phone, map, LINE add-friend | business |
| LINE OA CRM, rich menu, AI master switch | line-crm |
| Admin Hub auth, leads, bot traffic, email alerts | architecture, lessons |
| Blog/SEO/routing decisions for this site | roadmap, lessons |
| Agent workflow **for this repo** | session-protocol, AGENTS.md |

## Out of scope (do not dump here)

| Topic | Put it instead |
|-------|----------------|
| Other client projects | Their own repo wiki |
| Music / video / side projects | Copy `templates/domain-agent-setup/` into that project |
| Personal second brain (life, finance) | Notion or a private vault, not this git wiki |
| Long chat transcripts | Summarize 3–10 bullets into lessons.md |
| Secrets, tokens, cookie values | Never; names only in stack.md |
| Generic “how to use Grok” essays | Grok user guide; keep session-protocol short |

## Relationship to other docs in this repo

| Doc | Role |
|-----|------|
| `wiki/*` | Living product brain (preferred) |
| `CONTEXT.md` | Domain vocabulary for myitdev |
| `AGENTS.md` | Always-on agent rules for this repo |
| `.grok/rules/*` | Voice, media, model routing for this repo |
| `GEMINI.md` | Dated status snapshot (legacy) |
| `templates/domain-agent-setup/` | Blank kit for **other** domains; not part of the product wiki |

## One-line policy

If it would not help someone ship or debug **myitdev.com** next month, it does not belong in `wiki/`.
