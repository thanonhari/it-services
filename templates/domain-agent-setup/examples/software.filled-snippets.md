# Example fill — Software product (snippets only)

Mirrors how myitdev.com filled the same 5 switches.

## Identity

| Token | Value |
|-------|-------|
| DOMAIN_NAME | MYITDEV |
| DOMAIN_ONE_LINER | Thai IT services site + Admin Hub + LINE CRM on Cloudflare |
| OWNER_ROLE | owner |
| PRIMARY_LANGUAGE | bilingual th/en for UI; th for owner chat |
| BRAND_FEEL | calm professional IT partner |
| ARTIFACT_SINGULAR | feature slice |
| ARTIFACT_PLURAL | features |
| ARTIFACT_ROOT | src/ |
| ENTRY_POINTS | src/App.tsx, notify_index.ts, line-bot/src/index.ts |
| FAST_MODEL | grok-composer-2.5-fast |
| STRONG_MODEL | grok-4.5 |
| PRIMARY_GEN_TOOLS | image_gen, image_edit, Canva MCP |
| EXTERNAL_APPS | Cloudflare dashboard, LINE Developers |
| EXPORT_NAMING | n/a for code; assets under public/ or session paths |
| MEMORY_ENABLED | true |

## SYSTEM_MAP_TABLE

```markdown
| Area | Path | Role |
|------|------|------|
| Marketing + Admin UI | `src/` | React SPA |
| Pages middleware | `functions/` | crawler bot log |
| Notify API | `notify_index.ts` | auth, leads, email |
| LINE bot | `line-bot/` | OA webhook + AI |
| D1 schemas | `*_schema.sql` | myitdev-db |
```

## quality bans

- No em dash in prose
- No empty hype ("revolutionary", "game-changing")
- No inventing metrics or customer quotes
- TH/EN strings stay in sync in constants

See live project: repo root `AGENTS.md`, `.grok/rules/voice.md` (quality file renamed `quality.md` in this template).
