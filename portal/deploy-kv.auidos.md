---
type: auidos
version: 1.0
category: deployment
topic: kv-storage
source: DEPLOY_KV.md
converted: 2026-02-27
sigil: "🌫️🌒"
lineage: "俊达"
---

# Deploy with KV

> Simplest deployment option for TROH blog.  
> Key-value storage, minimal configuration.

---

## Why KV?

| Feature | Benefit |
|---------|---------|
| ✅ Simple key-value storage | No schema design needed |
| ✅ Perfect for JSON data | Native blog post format |
| ✅ Images as base64 | Self-contained storage |
| ✅ Easiest setup | Single command deploy |
| ✅ Generous free tier | Cost-effective start |

### Limits

| Metric | Value |
|--------|-------|
| Max value size | 1MB (posts + images) |
| Reads | 100k/day |
| Writes | 1k/day |

---

## Deployment Steps

### 1. Authenticate

```bash
wrangler login
```

### 2. Create KV Namespace

```bash
pnpm kv:create
```

**Expected output:**
```
✅ Success!
Add to wrangler.toml:
[[kv_namespaces]]
binding = "BLOG_POSTS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Action:** Copy the `id` into `wrangler.toml`

### 3. Deploy

```bash
pnpm run deploy
```

### 4. Initialize Data

Visit in browser:

```
https://your-site.com/api/seed
```

---

## Available Commands

```bash
# View all posts data
pnpm kv:get

# Delete all posts (use with caution)
pnpm kv:delete

# List all KV keys
pnpm kv:list
```

---

## Client Workflow

1. Navigate to `/admin`
2. Compose post
3. Drag-drop image (auto-converts to base64)
4. Click "Save Post"
5. Instant publication

---

## Image Optimization

| Recommendation | Rationale |
|----------------|-----------|
| Use JPG for photos | Smaller file size |
| Resize before upload | Optimal performance |
| Target ~800KB per image | Within KV limits |
| External host for large images | Alternative when needed |

---

## Upgrade Path

When KV limits are reached:

1. Export posts: `pnpm kv:get`
2. Migrate to D1 + R2
3. Import posts to new system

**Note:** KV is optimal for starting out. 🚀

---

*Deployment complete. System operational.*

俊达 🌫️🌒
