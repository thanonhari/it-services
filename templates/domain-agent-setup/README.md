# Domain agent setup (5 switches) — template

Copy this folder into **any project** (music, video, shop, legal, teaching, code, …) and replace placeholders.  
Agents get the same workflow: orient → quality gate → route effort → tools in-session → wiki first.

## The 5 switches (domain-agnostic)

| # | Switch | What you customize |
|---|--------|--------------------|
| 1 | Orient before work | Map of artifacts + folders |
| 2 | Quality gate | Style bans, checklist before delivery |
| 3 | Effort routing | Cheap vs strong model / tool by task type |
| 4 | In-session tools | Media / ops tools (MCP, Imagine, scripts) |
| 5 | Second Brain | Wiki pages + domain vocabulary |

## Install into a new project

### Option A — whole repo is one domain

```bash
# from the empty or existing project root
cp -r path/to/templates/domain-agent-setup/* .
# Windows PowerShell:
# Copy-Item -Recurse path\to\templates\domain-agent-setup\* .
```

Then edit every `{{PLACEHOLDER}}` (see [FILL-CHECKLIST.md](./FILL-CHECKLIST.md)).

### Option B — monorepo / multi-domain

```text
my-company/
  templates/domain-agent-setup/   # keep the blank template
  music-ep-01/                    # filled copy
  shop-ops/                       # filled copy
```

Copy the template **into each domain folder**, not only once at company root, unless all domains share one brain.

### Option C — Grok / Claude / Cursor

| File | Loaded by |
|------|-----------|
| `AGENTS.md` | Grok, Claude-compatible harnesses |
| `.grok/rules/*.md` | Grok rules dirs |
| `CLAUDE.md` | Optional: copy or symlink from `AGENTS.md` if you use Claude Code only |

After fill-in, start a **new agent session** in that folder so rules load.

## Placeholder syntax

All tokens look like `{{LIKE_THIS}}`. Search the tree for `{{` and replace every match.

Critical tokens are listed in [FILL-CHECKLIST.md](./FILL-CHECKLIST.md).

## Minimal viable fill (15 minutes)

1. `{{DOMAIN_NAME}}`, `{{DOMAIN_ONE_LINER}}`
2. Artifact map in `AGENTS.md` [1]
3. Bans + checklist in `.grok/rules/quality.md`
4. Three wiki pages you will actually open: INDEX, system, lessons
5. `CONTEXT.md` with 5–15 real terms

Skip perfection. Update wiki when you learn something durable.

## Examples of filled domains

| Domain | Artifact | quality.md focus | wiki/system.md |
|--------|----------|------------------|----------------|
| Software | services, PRs | voice, security | architecture |
| Music | tracks, stems, lyrics | loudness, genre, lyric bans | catalog + song form |
| Video | cuts, scripts | pace, brand lower-thirds | shot list / series bible |
| Shop | SKUs, orders | tone of CS replies | inventory + policies |
| Teaching | lesson plans | pedagogy, age level | curriculum map |

## Do not put in the template copy

- Secrets, API keys, customer PII
- Huge binaries (masters, raw video) unless the domain requires git LFS on purpose
- Session chat logs (summarize into `wiki/lessons.md` instead)

## After copy: suggested first agent prompt

```text
Read AGENTS.md, CONTEXT.md, and wiki/INDEX.md.
Confirm placeholders are gone. Summarize how you will run the 5 switches for this domain.
```
