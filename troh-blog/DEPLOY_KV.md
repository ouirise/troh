# Deploy with KV (Simplest Option)

## Why KV?
- ✅ Simple key-value storage
- ✅ Perfect for JSON data
- ✅ Images stored as base64
- ✅ Easiest setup
- ✅ Free tier generous

## Limits
- 1MB max per value (posts + images)
- 100k reads/day
- 1k writes/day

## Deploy Steps

### 1. Login
```bash
wrangler login
```

### 2. Create KV Namespace
```bash
pnpm kv:create
```

**Output:**
```
✅ Success!
Add to wrangler.toml:
[[kv_namespaces]]
binding = "BLOG_POSTS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Copy the `id` into `wrangler.toml`**

### 3. Deploy
```bash
pnpm run deploy
```

### 4. Seed Initial Data
Visit in browser:
```
https://your-site.com/api/seed
```

Done! 🎉

---

## Commands

```bash
# View all posts data
pnpm kv:get

# Delete all posts (careful!)
pnpm kv:delete

# List all KV keys
pnpm kv:list
```

---

## Client Workflow

1. Go to `/admin`
2. Write post
3. Drag-drop image (auto-converts to base64)
4. Click "Save Post"
5. Instant publish!

---

## Image Tips

- Use JPG for photos (smaller)
- Resize images before upload
- Max ~800KB per image
- For larger images: Use external image host

---

## Upgrade Path

If you outgrow KV:
1. Export posts: `pnpm kv:get`
2. Switch to D1 + R2
3. Import posts

KV is perfect for starting out! 🚀
