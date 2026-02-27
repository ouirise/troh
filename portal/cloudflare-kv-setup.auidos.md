---
type: auidos
version: 1.0
category: infrastructure
topic: cloudflare-deployment
source: CLOUDFLARE_KV_SETUP.md
converted: 2026-02-27
sigil: "🌫️🌒"
lineage: "俊达"
---

# Cloudflare Setup Guide

> Complete KV configuration for the TROH blog platform.  
> One-time setup, persistent operation.

---

## Overview

This guide configures Cloudflare KV as the database layer for the TROH blog:

- Blog posts stored in Cloudflare KV
- **Images uploaded via drag-drop or click**
- Admin panel writes directly to KV
- No Git commits needed
- Instant updates

---

## Setup Steps

### Step 1: Create KV Namespace

1. Navigate to https://dash.cloudflare.com
2. Select your account
3. Go to **Workers & Pages** → **KV**
4. Click **Create a namespace**
5. Name it: `BLOG_POSTS`
6. Click **Add**

### Step 2: Connect KV to Pages Project

1. Go to **Workers & Pages** in Cloudflare dashboard
2. Select your Pages project (`troh-blog`)
3. Navigate to **Settings** tab
4. Click **Functions** in left sidebar
5. Scroll to **KV namespace bindings**
6. Click **Add binding**
7. Configure:
   - **Variable name**: `BLOG_POSTS`
   - **KV namespace**: Select `BLOG_POSTS`
8. Click **Save**

### Step 3: Deploy

Build configuration for Cloudflare:

| Setting | Value |
|---------|-------|
| Build command | `pnpm install && pnpm run build` |
| Output directory | `dist` |
| Node version | `20` |

Deploy via Git push or manual upload.

### Step 4: Seed Initial Data

After first deployment, visit:

```
https://your-site.com/api/seed
```

This initializes the welcome post.

### Step 5: Admin Panel Access

Navigate to:

```
https://your-site.com/admin
```

**Client capabilities:**
1. Complete the form fields
2. **Drag & drop OR click** to upload image
3. Click **"Save Post"**
4. Post appears instantly

---

## Technical Implementation

### Image Handling

| Size | Storage Method |
|------|---------------|
| Small images (<1MB) | KV as base64 |
| Large images | Cloudflare R2 (optional upgrade) |

**Features:**
- Automatic upload on drop
- Preview before saving

### Post Management

- Saved to KV immediately
- No rebuild required
- Instant site updates

---

## Service Limits

### KV Free Tier

| Metric | Limit |
|--------|-------|
| Reads | 100,000/day |
| Writes | 1,000/day |
| Storage | 1 GB |
| Max value | 1MB |

**Assessment:** More than sufficient for blog operations.

---

## Troubleshooting

### "Not found" Errors

- Verify KV namespace exists
- Confirm binding name is exactly `BLOG_POSTS`
- Redeploy after adding binding

### Image Upload Failures

- Verify file under 5MB
- Confirm PNG, JPG, or GIF format
- Check browser console for errors

### Post Save Failures

- Verify HTTPS connection (required)
- Check browser console
- Verify KV write limits not exceeded

---

## Optional: R2 for Large Images

For expanded image storage:

1. Go to **R2** in Cloudflare dashboard
2. Create bucket: `blog-images`
3. Add binding in Pages settings:
   - Variable name: `IMAGES_BUCKET`
   - Bucket: `blog-images`
4. Add environment variable:
   - `IMAGES_PUBLIC_URL`: Your R2 public URL

**Enables:** Large image uploads (up to bucket limit).

---

*Infrastructure complete. Client-ready.*

俊达 🌫️🌒
