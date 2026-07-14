# Fill checklist

Search the copied tree for `{{` until none remain.

## Identity

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{DOMAIN_NAME}}` | Short name | MYITDEV / Night Bus EP / ShopLine |
| `{{DOMAIN_ONE_LINER}}` | What this project is | Thai IT shop site + LINE CRM |
| `{{OWNER_ROLE}}` | Who the agent helps | owner / producer / teacher |
| `{{PRIMARY_LANGUAGE}}` | Main language for delivery | th / en / bilingual |
| `{{BRAND_FEEL}}` | 1–2 sentence vibe | calm professional IT partner |

## Artifacts & layout ([1] Orient)

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{ARTIFACT_SINGULAR}}` | Main work unit | track / video / SKU / lesson |
| `{{ARTIFACT_PLURAL}}` | Plural | tracks / videos / SKUs |
| `{{ARTIFACT_ROOT}}` | Folder for units | songs/ / src/ / courses/ |
| `{{ENTRY_POINTS}}` | Where work starts | notes.md + lyrics.md / App.tsx |
| `{{SYSTEM_MAP_TABLE}}` | Markdown table area → path → role | (paste rows) |
| `{{HARD_RULES_ORIENT}}` | Extra orient rules | never change BPM without notes |

## Quality ([2] Gate)

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{QUALITY_FILE_PURPOSE}}` | What “good” means | streaming-ready demo, no clip |
| `{{BANNED_PATTERNS}}` | Bullet list of bans | em dash; empty hype; cliché hooks |
| `{{REQUIRED_PATTERNS}}` | Must-haves | LUFS target; TH/EN sync |
| `{{PRE_DELIVERY_CHECKLIST}}` | Checkbox list | mono check; typo; version tag |
| `{{TONE_TABLE}}` | Context → tone rows | customer vs internal |

## Routing ([3])

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{FAST_MODEL}}` | Cheap/fast id | grok-composer-2.5-fast |
| `{{STRONG_MODEL}}` | Default/strong id | grok-4.5 |
| `{{FAST_TASK_EXAMPLES}}` | Mechanical work | rename stems, fix typo |
| `{{STRONG_TASK_EXAMPLES}}` | Hard work | rewrite chorus, schema design |

## Tools ([4] Media / ops)

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{PRIMARY_GEN_TOOLS}}` | In-session tools | image_gen, Canva MCP |
| `{{EXTERNAL_APPS}}` | DAW / NLE / shop admin | Ableton, CapCut, Shopify |
| `{{EXPORT_NAMING}}` | File naming rule | Artist_Song_v03_dry.wav |
| `{{MEDIA_ASPECT_DEFAULTS}}` | Ratios / formats | 1:1 cover, 16:9 visualizer |

## Brain ([5] Wiki)

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{WIKI_PAGE_LIST}}` | Rows in INDEX table | catalog, gear, lessons |
| `{{DOMAIN_TERMS}}` | CONTEXT.md term blocks | Stem, Hook, Lead, … |
| `{{LESSONS_SEED}}` | 1–3 known pitfalls | CSP blocked Maps iframe |
| `{{ROADMAP_SEED}}` | Near-term work | ship single 1; fix OG tags |

## Config

| Placeholder | Meaning | Example |
|-------------|---------|---------|
| `{{MEMORY_ENABLED}}` | true/false | true |
| `{{CANVA_OR_MCP_NOTES}}` | Which MCP is on | Canva on; no OpenArt |

## Done when

- [ ] `rg '{{' .` (or editor search) finds nothing in the filled project
- [ ] `wiki/INDEX.md` links resolve
- [ ] First real task used orient + wiki without re-interviewing the owner
