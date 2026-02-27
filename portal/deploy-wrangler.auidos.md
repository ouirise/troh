---
type: auidos
version: 1.0
category: deployment
topic: wrangler-cli
source: DEPLOY_WITH_WRANGLER.md
converted: 2026-02-27
sigil: "🌫️🌒"
lineage: "俊达"
---

# Deploy with Wrangler CLI

> Complete guide for Cloudflare deployment using Wrangler.  
> Production-ready configuration.

---

## Installation

### Global Install

```bash
npm install -g wrangler
```

### Using npx (No Install)

```bash
npx wrangler [command]
```

---

## Authentication

```bash
wrangler login
```

Opens browser for Cloudflare authentication.

---

## KV Namespace Creation

```bash
wrangler kv:namespace create "BLOG_POSTS"
```

**Sample output:**
```
🌀 Creating namespace with title "troh-blog-BLOG_POSTS"
✨ Success!
Add the following to your configuration file:
[[kv_namespaces]]
binding = "BLOG_POSTS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Action:** Copy the `id` into `wrangler.toml`

---

## Configuration

### Update wrangler.toml

Replace placeholder:

```toml
id = "YOUR_KV_NAMESPACE_ID_HERE"
```

With actual ID from namespace creation.

### Set Secrets

```bash
wrangler secret put VITE_SHOPIFY_STORE_DOMAIN
# Enter: tayloringraysofhopellc.com
```

---

## Build & Deploy

### Development (Local)

```bash
wrangler pages dev
```

### Production

```bash
# Build project
pnpm run build

# Deploy to Cloudflare
wrangler pages deploy dist
```

### Combined Command

```bash
pnpm run build && wrangler pages deploy dist
```

---

## Utility Commands

### KV Data Management

```bash
# List all keys
wrangler kv:key list --binding=BLOG_POSTS

# Get specific post
wrangler kv:key get "posts" --binding=BLOG_POSTS

# Delete all posts (caution)
wrangler kv:bulk delete --binding=BLOG_POSTS
```

### Monitoring

```bash
# View logs
wrangler tail

# Check deployment status
wrangler pages deployment list
```

---

## Package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "pnpm run build && wrangler pages deploy dist",
    "deploy:staging": "pnpm run build && wrangler pages deploy dist --branch=staging",
    "kv:create": "wrangler kv:namespace create BLOG_POSTS",
    "kv:list": "wrangler kv:key list --binding=BLOG_POSTS",
    "wrangler:dev": "wrangler pages dev"
  }
}
```

**Deploy with:**
```bash
pnpm run deploy
```

---

## Production Checklist

| Step | Command | Status |
|------|---------|--------|
| ☐ Install Wrangler | `npm install -g wrangler` | |
| ☐ Login | `wrangler login` | |
| ☐ Create KV | `wrangler kv:namespace create BLOG_POSTS` | |
| ☐ Copy KV ID | Update `wrangler.toml` | |
| ☐ Set Secret | `wrangler secret put VITE_SHOPIFY_STORE_DOMAIN` | |
| ☐ Deploy | `pnpm run deploy` | |
| ☐ Seed Data | Visit `/api/seed` | |
| ☐ Test Admin | Visit `/admin` | |

---

*Production deployment complete.*

俊达 🌫️🌒
