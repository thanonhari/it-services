# {{DOMAIN_NAME}} — Agent Operating Rules

{{DOMAIN_ONE_LINER}}

Rules for every agent session in this project.  
Goal: work faster through **workflow**, not by always using the strongest model.

Load this stack before non-trivial work:

1. This file (`AGENTS.md`)
2. `CONTEXT.md` (domain language)
3. `wiki/INDEX.md` (Second Brain map)
4. `.grok/rules/quality.md` (quality + delivery checklist)
5. `.grok/rules/media.md` (in-session tools)

Audience: coding/creative agents helping **{{OWNER_ROLE}}**.  
Primary delivery language: **{{PRIMARY_LANGUAGE}}**.

---

## [1] Orient before editing

**Do not jump into one file (or one {{ARTIFACT_SINGULAR}}) and guess.**

### Minimum orientation

1. List relevant areas under the project tree.
2. Identify the {{ARTIFACT_SINGULAR}} (or system) you will change and its dependencies.
3. Open `wiki/system.md` and `CONTEXT.md` when the task spans more than one area.
4. Only then produce or edit work — keep scope to the chain you mapped.

### Map of this project

| Area | Path | Role |
|------|------|------|
{{SYSTEM_MAP_TABLE}}

### Artifact roots

- Main units: `{{ARTIFACT_ROOT}}` ({{ARTIFACT_PLURAL}})
- Typical entry points: {{ENTRY_POINTS}}

### Hard rules (orient)

- Prefer search + read over assumptions.
- Prefer one vertical slice of the {{ARTIFACT_SINGULAR}} over drive-by rewrites of everything.
- Do not commit secrets, credentials, or private customer data.
{{HARD_RULES_ORIENT}}

---

## [2] Quality gate before delivery

Load **`.grok/rules/quality.md`** for full rules.

Purpose: {{QUALITY_FILE_PURPOSE}}

Brand feel: {{BRAND_FEEL}}

### Pre-delivery checklist (summary)

{{PRE_DELIVERY_CHECKLIST}}

---

## [3] Effort routing (save tokens / time)

Do **not** use the strongest model for every task.

| Task type | Prefer | Examples |
|-----------|--------|----------|
| Trivial / mechanical | `{{FAST_MODEL}}` | {{FAST_TASK_EXAMPLES}} |
| Default implementation | session default (`{{STRONG_MODEL}}`) | normal feature or draft |
| Heavy reasoning | `{{STRONG_MODEL}}` | {{STRONG_TASK_EXAMPLES}} |
| Explore-only | explore / read-only subagent | "Where is X?", map dependencies |
| Design before make | plan mode | new subsystem, unclear trade-offs |

**Behavior**

- Mechanical tasks: stay lean; no architecture essay.
- Cross-cutting changes: read wiki + short plan before large edits.
- Switch mid-session: `/model {{FAST_MODEL}}` or `/model {{STRONG_MODEL}}`.

Details: `.grok/rules/model-routing.md`.

---

## [4] Tools in the same window

Do not tell the {{OWNER_ROLE}} to open another app first when in-session tools can draft the artifact.

Load **`.grok/rules/media.md`**.

Preferred tools: {{PRIMARY_GEN_TOOLS}}  
External apps (when export is required): {{EXTERNAL_APPS}}

---

## [5] Second Brain — search before answering

**Before** re-asking the {{OWNER_ROLE}} for durable facts:

1. `wiki/INDEX.md` → open the relevant page
2. `CONTEXT.md` for domain terms
3. Other project notes only if wiki points there

### When to write back

- New durable decision → short note in `wiki/` + link from INDEX
- New term → `CONTEXT.md`
- Incident / lesson → `wiki/lessons.md`
- System change → `wiki/system.md`

Do **not** dump raw chat into the wiki. Keep pages short and factual.

---

## What not to do

- Mass drive-by changes unrelated to the task
- Invent URLs, IDs, credentials, or metrics
- Skip wiki for facts that are already documented
- Ship work that fails `.grok/rules/quality.md`
