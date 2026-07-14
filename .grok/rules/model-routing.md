# Model routing cheat sheet

Available on this machine (from `grok models`):

| Model | Role |
|-------|------|
| `grok-4.5` | Default strong model for design, multi-service bugs, schema, security |
| `grok-composer-2.5-fast` | Fast/cheap for renames, small CSS, typos, simple one-file edits |

**User config applied:**

- `[models] default = "grok-4.5"`
- `[ui] fork_secondary_model = "grok-composer-2.5-fast"` (forks/secondary stay cheap)

## Commands

```
/model grok-composer-2.5-fast
/model grok-4.5
```

Or Ctrl+M model picker.

## Policy

- Start cheap when the task is obviously mechanical.
- Upgrade when stuck, when blast radius is large, or when architecture is unclear.
- Explore subagent for "where is X" without loading full reasoning budget on the parent.
- Do not set the session default to the fast model for whole multi-service features.
