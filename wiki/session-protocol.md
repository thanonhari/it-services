# Session protocol (5 switches)

Owner intent: keep these five habits on for every serious session.

## 1. Orient first

- Read `AGENTS.md` map + only the code paths needed.
- For multi-file work: explore structure before the first edit.

## 2. Voice gate

- Apply `.grok/rules/voice.md` before showing final copy or PR text.
- Ban em dash and hype.

## 3. Model routing

- Mechanical → `grok-composer-2.5-fast`
- Default / hard → `grok-4.5` (or current strongest)
- Do not burn the strong model on renames.

## 4. Media in-window

- Covers/videos via Imagine first; Canva MCP when templates help.
- OpenArt: no MCP yet; Imagine is the substitute.
- See `.grok/rules/media.md`.

## 5. Wiki first

- Search `wiki/` + `CONTEXT.md` before re-asking durable context.
- Write back durable decisions in under 10 bullets.
- Grok `[memory] enabled = true` (user + repo) is extra recall; **wiki stays source of truth**.

## End of session (optional but useful)

- If something important was learned: patch wiki.
- If handoff to another agent: use handoff skill; point at wiki pages not chat logs.

## What we deliberately do not do

- Do not bulk-commit unrelated app diffs, screenshots, or `.agents/` dumps with docs.
- Do not invent OpenArt MCP packages.
- Do not push to origin unless the owner asks.
