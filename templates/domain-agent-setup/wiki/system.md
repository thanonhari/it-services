# System map — {{DOMAIN_NAME}}

{{DOMAIN_ONE_LINER}}

## Big picture

Describe the main flow in 5–15 lines or a simple diagram (ASCII is fine).

```
{{ARTIFACT_PLURAL}}  →  process / pipeline  →  delivery channel
```

## Key paths

| Piece | Path | Runtime / tool |
|-------|------|----------------|
{{SYSTEM_MAP_TABLE}}

## Critical flows

1. (Happy path for the main {{ARTIFACT_SINGULAR}})
2. (Auth / approval / publish path if any)
3. (Failure / rollback path if any)

## Boundaries

- What this project **does not** own (link out if needed).
