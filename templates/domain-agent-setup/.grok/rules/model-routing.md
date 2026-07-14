# Model routing — {{DOMAIN_NAME}}

| Model | Role |
|-------|------|
| `{{STRONG_MODEL}}` | Default / hard reasoning |
| `{{FAST_MODEL}}` | Mechanical / low-risk tasks |

## Commands (Grok)

```
/model {{FAST_MODEL}}
/model {{STRONG_MODEL}}
```

## Policy

| Use fast when | Use strong when |
|---------------|-----------------|
| {{FAST_TASK_EXAMPLES}} | {{STRONG_TASK_EXAMPLES}} |

- Start cheap when the task is obviously mechanical.
- Upgrade when stuck, blast radius is large, or design is unclear.
- Explore/read-only agents for "where is X" when available.
