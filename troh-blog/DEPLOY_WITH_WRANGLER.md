# Deploy with Wrangler CLI

## Install Wrangler

```bash
npm install -g wrangler
```

Or use npx (no install):
```bash
npx wrangler ...
```

## Login to Cloudflare

```bash
wrangler login
```

This opens a browser to authenticate.

## Create KV Namespace

```bash
wrangler kv:namespace create "BLOG_POSTS"
```

**Output example:**
```
🌀 Creating namespace with title "troh-blog-BLOG_POSTS"
✨ Success!
Add the following to your configuration file:
[[kv_namespaces]]
binding = "BLOG_POSTS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Copy the `id` and paste it into `wrangler.toml`**

## Update wrangler.toml

Edit the file and replace:
```toml
id = "YOUR_KV_NAMESPACE_ID_HERE"
```

With the actual ID from the command above.

## Set Secrets

```bash
wrangler secret put VITE_SHOPIFY_STORE_DOMAIN
# Enter: tayloringraysofhopellc.com
```

## Build and Deploy

### Development (local testing):
```bash
wrangler pages dev
```

### Production Deploy:
```bash
# Build the project
pnpm run build

# Deploy to Cloudflare
wrangler pages deploy dist
```

Or in one command:
```bash
pnpm run build && wrangler pages deploy dist
```

## Useful Commands

### View KV data
```bash
# List all keys
wrangler kv:key list --binding=BLOG_POSTS

# Get specific post data
wrangler kv:key get "posts" --binding=BLOG_POSTS

# Delete all posts (careful!)
wrangler kv:bulk delete --binding=BLOG_POSTS
```

### View logs
```bash
wrangler tail
```

### Check deployment status
```bash
wrangler pages deployment list
```

## Add to package.json Scripts

Add these to your `package.json`:

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

Then deploy with:
```bash
pnpm run deploy
```

## Production Deployment Checklist

- [ ] Install Wrangler: `npm install -g wrangler`
- [ ] Login: `wrangler login`
- [ ] Create KV: `wrangler kv:namespace create BLOG_POSTS`
- [ ] Copy KV ID to `wrangler.toml`
- [ ] Set secret: `wrangler secret put VITE_SHOPIFY_STORE_DOMAIN`
- [ ] Deploy: `pnpm run deploy`
- [ ] Visit site and seed: `https://your-site.com/api/seed`
- [ ] Test admin panel: `https://your-site.com/admin`

Done! 🎉
