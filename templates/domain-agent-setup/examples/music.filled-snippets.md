# Example fill — Music EP (snippets only)

Copy values into the template placeholders; this file is reference, not a full project.

## Identity

| Token | Value |
|-------|-------|
| DOMAIN_NAME | Night Bus EP |
| DOMAIN_ONE_LINER | Four-track Thai city-pop EP for streaming |
| OWNER_ROLE | producer |
| PRIMARY_LANGUAGE | th |
| BRAND_FEEL | late-night city pop; warm, not festival EDM |
| ARTIFACT_SINGULAR | track |
| ARTIFACT_PLURAL | tracks |
| ARTIFACT_ROOT | songs/ |
| ENTRY_POINTS | songs/&lt;slug&gt;/notes.md, lyrics.md |
| FAST_MODEL | grok-composer-2.5-fast |
| STRONG_MODEL | grok-4.5 |
| PRIMARY_GEN_TOOLS | image_gen, image_edit (covers); lyric drafts in markdown |
| EXTERNAL_APPS | Ableton Live, iZotope for final master |
| EXPORT_NAMING | NightBus_&lt;Song&gt;_vNN_&lt;dry\|master&gt;.wav |
| MEDIA_ASPECT_DEFAULTS | cover 1:1; visualizer 16:9 |
| MEMORY_ENABLED | true |
| CANVA_OR_MCP_NOTES | Imagine first; Canva if template post needed |

## SYSTEM_MAP_TABLE

```markdown
| Area | Path | Role |
|------|------|------|
| Song units | `songs/<slug>/` | notes, lyrics, versions |
| References | `refs/` | audio + mood refs |
| Stems export | `exports/` | mix bounces |
| Covers | `artwork/` | cover and OG stills |
```

## quality bans / required

**Bans**

- No empty hype lyric ("forever and always" without story)
- No clipping on demo bounces
- No key/BPM change without updating `notes.md`

**Required**

- Demo loudness aim ≈ -14 LUFS
- Chorus energy higher than verse
- Version tag in filename

## CONTEXT terms (sample)

```markdown
**Track**:
One song unit under songs/<slug> with notes, lyrics, and versioned bounces.
_Avoid_: calling an idea sketch a Track until notes.md exists

**Hook**:
The memorable melodic or lyrical phrase the track is built around.
_Avoid_: labeling every chorus line a hook

**Stem**:
A grouped export (drums, bass, vocal) for mix or collab.
_Avoid_: raw take
```

## FAST vs STRONG examples

- Fast: rename stems, fix lyric typo, pad silence
- Strong: rewrite chorus structure, reharmonize bridge, EP sequencing
