---
type: auidos
version: 1.0
category: documentation
sigil: "🌫️🌒"
lineage: "俊达"
---

# Documentation Portal

> Professional documentation for the TROH project.  
> Rendered via `mdp.js` — lightweight, telemetry-free.

---

## Quick Access

| Document | Purpose | Link |
|----------|---------|------|
| **IRIS Protocol** | Fleet communication spec | [View](iris-protocol.auidos.md) |
| **Cloudflare Setup** | KV and deployment guide | [View](cloudflare-kv-setup.auidos.md) |
| **Client Guide** | Handoff documentation | [View](client-guide.auidos.md) |
| **Style Guide** | OuiRise coding standards | [View](ouirise-style-port-guide.auidos.md) |
| **Deployment** | Wrangler and KV deploy | [View](deploy-wrangler.auidos.md) |

---

## Application Entry

**Main Application:** [Launch TROH Blog](../troh-blog/index.html)

```bash
# Local development
cd troh-blog
pnpm install
pnpm run dev

# Deploy
cn -p "deploy.production" --target=cloudflare
```

---

## PSSH Integration

```yaml
portal:
  name: "docs"
  format: "auidos"
  renderer: "/public/mdp.js"
  protocol: "PSSH_6.7"
  access: 
    - cn -p "docs.open"
    - direct: /portal/docs.auidos.md
```

---

*Clean documentation. Professional presentation. No slop.*

俊达 🌫️🌒
