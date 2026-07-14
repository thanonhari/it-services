# Media in-session (OpenArt-equivalent)

Keep cover images and short videos **inside the agent window**. Do not default to "open Canva/Photoshop/OpenArt in a browser" unless the user asks or tools fail.

---

## Preferred order

| Priority | Tool | Use for |
|----------|------|---------|
| 1 | Built-in `image_gen` | New cover, hero, OG image, blog thumbnail |
| 1 | Built-in `image_edit` | Edit existing brand assets, fix composition |
| 1 | Built-in `image_to_video` | Short motion from a still (6s or 10s) |
| 2 | Canva MCP | Template-based social posts if MCP is enabled |
| 3 | OpenArt MCP | Only if configured under `[mcp_servers.openart]` |
| 4 | Manual handoff | User exports elsewhere after agent drafts prompt/assets |

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

## Enable Canva MCP (optional)

User-level `~/.grok/config.toml` currently may list Canva under `disabled_mcp_servers`.  
To enable:

1. Remove `"grok_com_canva"` from `disabled_mcp_servers` (or set the Canva server `enabled = true` if present).
2. Restart the Grok session.
3. Use Canva tools via MCP discovery (`search_tool` → Canva).

Repo does not store Canva OAuth secrets.

---

## Optional: OpenArt MCP

If you later add OpenArt:

```toml
# ~/.grok/config.toml  (example only; adjust to real OpenArt MCP package)
[mcp_servers.openart]
command = "npx"
args = ["-y", "openart-mcp"]  # replace with real package/command
env = { OPENART_API_KEY = "..." }
enabled = true
```

Document the real package name here after it works once.

---

## Agent behavior

- Generate or edit media when asked for cover/thumbnail/video without switching apps.
- After generation, report the **short session-relative path** so the UI can open it.
- Do not commit large binary media unless the user explicitly wants assets in git.
