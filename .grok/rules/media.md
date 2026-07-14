# Media in-session (OpenArt-equivalent)

Keep cover images and short videos **inside the agent window**. Do not default to "open Canva/Photoshop/OpenArt in a browser" unless the user asks or tools fail.

**Status (2026-07-14):** Canva MCP enabled at user config. OpenArt has no reliable public MCP package; use Imagine tools as the OpenArt substitute.

---

## Preferred order

| Priority | Tool | Use for | Status |
|----------|------|---------|--------|
| 1 | Built-in `image_gen` | New cover, hero, OG image, blog thumbnail | Ready |
| 1 | Built-in `image_edit` | Edit existing brand assets, fix composition | Ready |
| 1 | Built-in `image_to_video` | Short motion from a still (6s or 10s) | Ready |
| 2 | Canva MCP | Template-based social / brand kits | Enabled (restart session if tools missing) |
| 3 | OpenArt MCP | Not installed | Skip until a real server exists |
| 4 | Manual handoff | User exports elsewhere after agent drafts prompt/assets | Fallback |

---

## Brand visual brief (defaults)

When the user does not specify style:

- Subject: professional Thai IT services / developer workspace / clean tech
- Mood: trustworthy, modern, calm blues and deep neutrals
- Avoid: cheesy robot hands, random neon cyberpunk, unreadable text-in-image
- Aspect ratios:
  - Blog/OG: 16:9 or 1.91:1
  - Square social: 1:1
  - Story/Reels: 9:16
- Prefer saving under repo paths the user names, or session image output paths they can open

---

## Canva MCP

User config (`~/.grok/config.toml`):

- `grok_com_canva` is **not** in `disabled_mcp_servers` (enabled).
- After first enable: **restart Grok session** so tools register.
- Use via MCP discovery (`search_tool` query `canva`).
- Repo does not store Canva OAuth secrets.

If Canva tools fail: fall back to Imagine (`image_gen` / `image_edit`).

---

## OpenArt

There is no maintained `openart-mcp` package documented for this workspace.

Equivalent workflow:

1. `image_gen` for stills
2. `image_edit` for iterations
3. `image_to_video` for short clips
4. Canva MCP when a Canva template is required

If OpenArt later ships a real MCP, add:

```toml
# ~/.grok/config.toml  (only after verifying package + auth)
[mcp_servers.openart]
command = "..."
args = ["..."]
env = { OPENART_API_KEY = "..." }
enabled = true
```

Then update this file with the real command.

---

## Agent behavior

- Generate or edit media when asked for cover/thumbnail/video without switching apps.
- After generation, report the **short session-relative path** so the UI can open it.
- Do not commit large binary media unless the user explicitly wants assets in git.
