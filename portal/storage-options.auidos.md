---
type: auidos
version: 1.0
category: architecture
topic: storage-comparison
source: STORAGE_OPTIONS.md
converted: 2026-02-27
sigil: "🌫️🌒"
lineage: "俊达"
---

# Storage Options Comparison

> Architectural decision guide for TROH blog storage.  
> KV vs D1 + R2 analysis.

---

## Option 1: KV (Key-Value) ✅ Recommended

**Best for:** Getting started, simple blogs

### Advantages

- Easiest setup (single command)
- Perfect for JSON data
- No database schema required
- Images as base64 (self-contained)

### Limitations

- 1MB limit per post
- Images must be small (<1MB)
- Less structured than SQL

### Setup

```bash
pnpm kv:create
# Copy ID to wrangler.toml
pnpm run deploy
```

---

## Option 2: D1 + R2

**Best for:** Large blogs, extensive images, growth scenarios

### Advantages

- SQL database (structured)
- Unlimited image storage
- CDN delivery for images
- Full-text search capable

### Limitations

- More complex setup
- Schema migrations required
- Higher learning curve

### Setup

```bash
pnpm db:create
pnpm r2:create
pnpm db:migrate
pnpm run deploy
```

---

## Feature Comparison

| Feature | KV | D1 + R2 |
|---------|-----|---------|
| Setup steps | 1 | 3 |
| Image storage | Base64 | R2 bucket |
| Max image size | 1MB | 5GB |
| Database type | Key-value | SQL |
| Complexity | Low | Medium |
| Free tier | ✅ | ✅ |

---

## Recommendation

### Start with KV

Optimal for initial deployment:
- Simpler architecture
- Faster iteration
- Sufficient for current scale

### Upgrade When

- Posts exceed size limits
- High-volume image requirements
- SQL features needed
- Significant blog growth

---

## Current Status

✅ **KV configured and ready**

The admin panel is compatible with both storage options. Client experience remains consistent.

---

*Architecture documented. Decision framework established.*

俊达 🌫️🌒
