# Storage Options Comparison

## Option 1: KV (Key-Value) ✅ RECOMMENDED

**Best for:** Getting started, simple blogs

**Pros:**
- Easiest setup (1 command)
- Perfect for JSON data
- No database schema needed
- Images as base64 (simple)

**Cons:**
- 1MB limit per post
- Images must be small (<1MB)
- Less structured

**Setup:**
```bash
pnpm kv:create
# Copy ID to wrangler.toml
pnpm run deploy
```

---

## Option 2: D1 + R2

**Best for:** Large blogs, many images, growth

**Pros:**
- SQL database (structured)
- Unlimited image storage
- CDN delivery for images
- Full-text search ready

**Cons:**
- More complex setup
- Schema migrations needed
- Higher learning curve

**Setup:**
```bash
pnpm db:create
pnpm r2:create
pnpm db:migrate
pnpm run deploy
```

---

## Quick Comparison

| Feature | KV | D1 + R2 |
|---------|-----|---------|
| Setup | 1 step | 3 steps |
| Images | Base64 | R2 bucket |
| Max image | 1MB | 5GB |
| Database | Key-value | SQL |
| Complexity | Low | Medium |
| Cost (free) | ✅ | ✅ |

---

## Recommendation

**Start with KV** - it's simpler and works great!

**Upgrade to D1 + R2** when:
- Posts get too large
- Need many big images
- Want SQL features
- Blog grows significantly

---

## Current Setup

✅ **KV is configured** - ready to deploy!

The admin panel works with both. Same experience for client.
