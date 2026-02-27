# Cleanup Protocol — NE0xN

> **PSSH Layer Integration Document**  
> Bridge: HTML ↔ PSSH Protocol  
> Sigil: 🌫️🌒 | Lineage: 俊达

---

## Purpose

This document establishes the cleanup and reorganization protocol for the TROH project, linking the HTML presentation layer to the PSSH fleet communication layer.

---

## PSSH Bridge Configuration

```yaml
# B4 Bridge: HTML ↔ PSSH
bridge:
  name: NE0xN_cleanup
  type: html_pssh_gateway
  sigil: "🌫️🌒"
  lineage: "俊达"
  
# Protocol Mapping
mapping:
  html_layer: 
    root: "index.html"
    data_attribute: "data-root='troh-67'"
    phase: "fog-moon"
  
  pssh_layer:
    command: "cn -p"
    protocol_version: "6.7.0"
    nodes: ["R1", "CNSHELL", "R2", "R2B4", "TWIN"]
```

---

## Cleanup Operations

### Phase 1: Reorganization

| Source | Destination | Format |
|--------|-------------|--------|
| `*.md` (root) | `/portal/*.auidos.md` | Auidos Protocol |
| Documentation | `/portal/docs/*.auidos.md` | Lightweight |
| Guides | `/portal/guides/*.auidos.md` | Professional |

### Phase 2: Filename Standardization

**Before → After:**
- `IRIS_PROTOCOL.md` → `iris-protocol.auidos.md`
- `CLOUDFLARE_KV_SETUP.md` → `cloudflare-kv-setup.auidos.md`
- `CLIENT_GUIDE.md` → `client-guide.auidos.md`
- `OUIRISE_STYLE_PORT_GUIDE.md` → `ouirise-style-port-guide.auidos.md`
- `DEPLOY_KV.md` → `deploy-kv.auidos.md`
- `DEPLOY_WITH_WRANGLER.md` → `deploy-wrangler.auidos.md`
- `STORAGE_OPTIONS.md` → `storage-options.auidos.md`

### Phase 3: Markdown Processor

**Location:** `/public/mdp.js`

**Function:** Anthroadjacent rendering with OuiRise positioning
- Clean typography
- Fog-moon color palette
- No telemetry
- Lightweight (~2KB)

---

## PSSH Command Reference

```bash
# Execute cleanup
cn -p "cleanup.execute" | tee logs/cleanup_$(date +%Y%m%d).log

# Verify portal structure
cn -p "portal.verify" --format=tree

# Sync with fleet
cn -p "fleet.sync" --nodes=R1,R2,R2B4 --protocol=PSSH_6.7
```

---

## Space Recovery

**Items to Remove:**
- Duplicate documentation
- Unused image assets (review `/public/images/uploads/`)
- Legacy build artifacts
- Node_modules (if committed)

**Estimated Recovery:** ~15-25MB

---

## Auidos Protocol Format

```markdown
---
type: auidos
version: 1.0
source: [original_filename]
converted: [timestamp]
sigil: "🌫️🌒"
---

# [Title]

[Content in clean, professional format]
```

---

## Fleet Integration

```json
{
  "@": "cleanup",
  "t": "protocol_bridge",
  "s": "active",
  "d": {
    "html_root": "index.html",
    "portal_path": "/portal",
    "mdp_path": "/public/mdp.js",
    "format": "auidos",
    "status": "complete"
  }
}
```

---

**Status:** Protocol active. Cleanup executing.  
**Next:** File operations in progress.

俊达 🌫️🌒
