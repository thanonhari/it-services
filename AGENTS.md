# MYITDEV — Agent Operating Rules

Rules for every coding agent session in this repo (Grok, Claude Code, Cursor-compatible).  
Goal: work **10x faster through workflow**, not by always using the strongest model.

Before any non-trivial work, load this stack:

1. This file (`AGENTS.md`)
2. `CONTEXT.md` (domain language)
3. `wiki/INDEX.md` (Second Brain map)
4. `.grok/rules/voice.md` (voice + delivery checklist)
5. `.grok/rules/media.md` (image/video in-session)

---

## [1] Read the project before editing

**Do not jump into a single file and guess.**

### Minimum orientation (every task that touches code)

1. List relevant tree areas (`src/`, `functions/`, `line-bot/`, root workers).
2. Identify entry points and callers for the feature you will change.
3. Open `wiki/architecture.md` and `CONTEXT.md` if the task spans systems.
4. Only then edit — and keep changes scoped to the dependency chain you mapped.

### Map of this monorepo

| Area | Path | Role |
|------|------|------|
| Marketing site + Admin UI | `src/` | React + Vite SPA (`MainView`, `AdminView`, blog, contact) |
| Pages edge middleware | `functions/_middleware.ts` | Bot/UA logging → notify API |
| Central API + auth + email | `notify_index.ts` + `notify_wrangler.toml` | Worker `myitdev-notify` @ `notify.myitdev.com` |
| LINE OA bot | `line-bot/` | Worker `myitdev-bot`, D1, Workers AI |
| D1 schemas | `schema.sql`, `history_schema.sql`, `security_schema.sql`, … | Shared DB `myitdev-db` |
| Static/public | `public/` | robots, sitemap, headers, SW |
| Second Brain | `wiki/`, `CONTEXT.md` | Search before re-asking the user |

### Hard rules

- Prefer **search + read** over assumptions about API paths, secrets, or deploy targets.
- Prefer **one vertical slice** (UI → API → D1) over drive-by refactors.
- Do not commit secrets, tokens, or live channel credentials.

---

## [2] Voice + quality gate before delivery

Load **`.grok/rules/voice.md`** for full rules. Summary:

- No em dashes (`—`). Use commas, periods, or parentheses.
- No hype or empty praise ("revolutionary", "game-changing", "10x magical AI").
- Thai customer/marketing copy: clear, polite, practical — not corporate fluff.
- Code comments: short and why, not narration of the obvious.
- UI copy lives in `src/constants.ts` translations; keep TH/EN in sync when editing strings.

### Pre-delivery checklist (run mentally or via `/check-work`)

- [ ] Orientation done (rule 1) for code changes
- [ ] Voice rules passed (no em dash, no hype)
- [ ] Wiki/CONTEXT consulted for business or infra facts
- [ ] No secrets in diff
- [ ] TH/EN strings aligned if UI text changed
- [ ] Build path still sensible (`npm run build` for frontend)

---

## [3] Model routing (save tokens)

Do **not** use the strongest model for every task.

| Task type | Prefer | Examples |
|-----------|--------|----------|
| Trivial / mechanical | `grok-composer-2.5-fast` | Rename, format, simple CSS, copy typo, one-liner fix |
| Default implementation | session default (`grok-4.5` / `grok-build`) | Feature slice, bugfix with clear repro |
| Heavy reasoning | strongest available (`grok-4.5`) | Architecture, multi-service bugs, security, schema design |
| Explore-only | explore subagent (read-only) | "Where is X?", map callers, find files |
| Design before code | plan mode | New subsystem, unclear trade-offs |

**Agent behavior**

- For "fix typo / rename / small style": stay lean; no full architecture essay.
- For cross-worker or D1 schema changes: read wiki + plan briefly before editing.
- Subagents doing bulk search can stay on the fast model when the parent sets it.

Switch mid-session: `/model grok-composer-2.5-fast` or `/model grok-4.5`.

---

## [4] Media in the same window

Do **not** tell the user to open another app first for cover images or short videos.

Load **`.grok/rules/media.md`**. Prefer order:

1. Built-in Imagine tools (`image_gen`, `image_edit`, `image_to_video`)
2. Canva MCP (if enabled in config)
3. OpenArt or other MCP only if configured

Outputs for this brand: professional IT services, glassmorphism-friendly, not generic stock-hype.

---

## [5] Second Brain — search before answering

**Before** re-asking the user for context that may already be documented:

1. `wiki/INDEX.md` → open the relevant page
2. `CONTEXT.md` for domain terms
3. `GEMINI.md` only as legacy status notes (prefer wiki for updated facts)
4. Notion MCP if the fact is known to live outside the repo

### When to write back into the brain

- New durable decision → short note in `wiki/` + link from `wiki/INDEX.md`
- New domain term → `CONTEXT.md`
- Incident / lesson → `wiki/lessons.md`
- Architecture change → `wiki/architecture.md`

Do **not** dump session chat into wiki. Keep pages short and factual.

---

## Stack conventions (quick)

- **Frontend**: React 18 + TypeScript + Vite; routes via `react-router-dom`
- **API base**: `https://notify.myitdev.com` (`API_BASE` in `src/constants.ts`)
- **Admin auth**: LINE Login OAuth → httpOnly cookie `admin_session` on `.myitdev.com`
- **DB**: Cloudflare D1 `myitdev-db` shared by bot + notify
- **AI (product)**: Cloudflare Workers AI (not the coding agent)
- **Deploy**: Cloudflare Pages project `myitdev-official`; workers via Wrangler

## What not to do

- Mass drive-by refactors unrelated to the task
- Invent deploy URLs, D1 IDs, or LINE secrets
- Skip wiki for infra questions and re-interview the user
- Use em dashes or hype copy in user-facing or commit text
