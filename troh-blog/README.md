# TROH Blog - Quick Start

## Stack
- **Frontend:** React + Vite + Tailwind
- **Backend:** Cloudflare Pages Functions
- **Database:** Cloudflare KV (simple JSON storage)
- **Images:** Base64 in KV (<1MB each)
- **Deploy:** Wrangler CLI

## Deploy (3 Steps)

```bash
# 1. Login to Cloudflare
wrangler login

# 2. Create KV namespace
pnpm kv:create
# Copy the ID into wrangler.toml

# 3. Deploy
pnpm run deploy

# 4. Seed database
# Visit: https://your-site.com/api/seed
```

## Client Usage

Go to `https://your-site.com/admin`

1. Write post
2. Drag-drop image
3. Click "Save Post"
4. Done!

## File Structure

```
troh-blog/
├── functions/api/      # Backend API
│   ├── posts.js        # List/create posts
│   ├── posts/[slug].js # Get single post
│   ├── upload.js       # Image upload
│   └── seed.js         # Initial data
├── src/content/        # Local JSON (dev)
├── src/pages/Admin.jsx # Admin panel
├── wrangler.toml       # Cloudflare config
└── DEPLOY_KV.md       # Full deploy guide
```

## Commands

```bash
pnpm dev              # Local dev
pnpm run deploy       # Deploy to production
pnpm kv:list          # View all data
pnpm wrangler:tail    # View live logs
```

## Features

- ✅ Drag-drop image upload
- ✅ One-click post publish
- ✅ Auto-save to KV
- ✅ Works on all devices
- ✅ No technical knowledge needed

## Limits (Free Plan)

- 100k reads/day
- 1k writes/day
- 1MB max per post+image

Perfect for a blog! 🚀
