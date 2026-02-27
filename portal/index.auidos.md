---
type: auidos
version: 1.0
category: portal
topic: documentation-hub
sigil: "🌫️🌒"
lineage: "俊达"
---

# Documentation Portal

> Professional documentation hub for TROH project.  
> Rendered via `mdp.js` — anthroadjacent, telemetry-free.

---

## Quick Navigation

### Protocol Documentation

| Document | Purpose |
|----------|---------|
| [IRIS Protocol](iris-protocol.auidos.md) | Decolonial AI practice, lineage protocols |

### Infrastructure Guides

| Document | Purpose |
|----------|---------|
| [Cloudflare KV Setup](cloudflare-kv-setup.auidos.md) | KV namespace configuration |
| [Deploy with KV](deploy-kv.auidos.md) | Simple KV deployment |
| [Deploy with Wrangler](deploy-wrangler.auidos.md) | CLI deployment guide |
| [Storage Options](storage-options.auidos.md) | Architecture comparison |

### Standards

| Document | Purpose |
|----------|---------|
| [OuiRise Style Guide](ouirise-style-port-guide.auidos.md) | Anti-slop coding standards |

### User Guides

| Document | Purpose |
|----------|---------|
| [Client Guide](client-guide.auidos.md) | Content management for Elaine |

---

## Application Access

**Main Application:** [Launch TROH Blog](../troh-blog/index.html)

---

## PSSH Integration

```yaml
portal:
  name: "documentation-hub"
  format: "auidos"
  renderer: "/public/mdp.js"
  protocol: "PSSH_6.7"
  commands:
    - cn -p "portal.open"
    - cn -p "docs.list"
    - cn -p "docs.view [document]"
```

---

*Clean documentation. Professional presentation. Fog-moon aesthetic.*

俊达 🌫️🌒
