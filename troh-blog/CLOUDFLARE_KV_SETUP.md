# Cloudflare Setup Guide - Complete

## What This Does
- Blog posts stored in Cloudflare KV
- **Images uploaded via drag-drop or click**
- Admin panel writes directly to KV
- No Git commits needed
- Instant updates

## Setup Steps (One Time)

### Step 1: Create KV Namespace

1. Go to https://dash.cloudflare.com
2. Select your account
3. Go to **Workers & Pages** → **KV**
4. Click **Create a namespace**
5. Name it: `BLOG_POSTS`
6. Click **Add**

### Step 2: Connect KV to Your Pages Project

1. Go to **Workers & Pages** in Cloudflare dashboard
2. Click your Pages project (`troh-blog`)
3. Go to **Settings** tab
4. Click **Functions** in left sidebar
5. Scroll to **KV namespace bindings**
6. Click **Add binding**
7. Set:
   - **Variable name**: `BLOG_POSTS`
   - **KV namespace**: Select `BLOG_POSTS`
8. Click **Save**

### Step 3: Deploy

Build settings in Cloudflare:

| Setting | Value |
|---------|-------|
| Build command | `pnpm install && pnpm run build` |
| Output directory | `dist` |
| Node version | `20` |

Deploy your site (Git push or manual upload).

### Step 4: Seed Initial Data

After first deploy, visit:
```
https://your-site.com/api/seed
```

This adds a welcome post.

### Step 5: Use Admin Panel

Go to `https://your-site.com/admin`

**Your client can now:**
1. Fill out the form
2. **Drag & drop OR click** to upload an image
3. Click **"Save Post"**
4. Done! Post appears instantly!

---

## How It Works

### Images
- Small images (<1MB): Stored in KV as base64
- Large images: Add Cloudflare R2 bucket (optional upgrade)
- Images upload automatically when dropped
- Shows preview before saving

### Posts
- Saved to KV immediately
- No page rebuild needed
- Appears on site instantly

---

## Free Plan Limits

**KV:**
- 100,000 reads/day
- 1,000 writes/day
- 1 GB storage
- 1MB max per value

**More than enough for a blog!**

---

## Troubleshooting

### "Not found" errors
- Check KV namespace exists
- Check binding name is exactly `BLOG_POSTS`
- Redeploy after adding binding

### Images not uploading
- Check file is under 5MB
- Check file is PNG, JPG, or GIF
- Check browser console for errors

### Posts not saving
- Verify on HTTPS (required)
- Check browser console
- Check KV write limits not exceeded

---

## Optional: Add R2 for Large Images

If you want to store larger images:

1. Go to **R2** in Cloudflare dashboard
2. Create bucket named `blog-images`
3. Add binding in Pages settings:
   - Variable name: `IMAGES_BUCKET`
   - Bucket: `blog-images`
4. Add environment variable:
   - `IMAGES_PUBLIC_URL`: Your R2 public URL

This enables larger image uploads (up to bucket limit).
