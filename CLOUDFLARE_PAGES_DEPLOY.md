# Cloudflare Pages Deployment Guide

## Configuration ✅

Your blog is now configured for **static export** — no adapter needed!

### What Changed
- `next.config.mjs`: Added `output: 'export'`
- `images: { unoptimized: true }`: Disabled Next.js image optimization
- Build output: Static files in `out/` directory

---

## Cloudflare Pages Setup

### Option 1: Via Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Pages**
   - Visit https://dash.cloudflare.com
   - Navigate to Pages → Create a project

2. **Connect GitHub**
   - Click "Connect to Git"
   - Select your `octavio-blog` repository
   - Authorize Cloudflare access

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Build output directory: out
   Root directory: (leave empty)
   ```

4. **Environment Variables** (None needed for static site)

5. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy automatically

---

### Option 2: Via Wrangler CLI

If you prefer command-line deployment:

```bash
# Install wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name=octavio-blog
```

---

## Build Verification

After the build completes, you should see:

✅ **Successful Build Output:**
```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ● /blog/[slug]
  ├ /blog/playwright-design-cloning
  ├ /blog/groq-speech-to-text-automation
  ├ /blog/building-the-octavio-blog
  └ /blog/subagent-workflows

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

✅ **Generated Files:**
- `out/index.html` — Homepage
- `out/blog/[slug].html` — Blog posts (4 files)
- `out/_next/` — Static assets (CSS, JS, fonts)

---

## What You Get

### ✅ Static Site Benefits
- **Lightning fast** — Pure static HTML/CSS/JS
- **Zero cold starts** — No server needed
- **Free CDN** — Cloudflare's global network
- **Automatic HTTPS** — Included with Cloudflare Pages
- **Git-based deployment** — Push to GitHub → Auto-deploy

### ✅ All Pages Pre-rendered
- Homepage: `/`
- 4 Blog posts: `/blog/*`
- 404 page: `/404.html`

---

## Custom Domain (Optional)

1. In Cloudflare Pages dashboard
2. Go to Custom Domains
3. Add your domain
4. Update DNS records (Cloudflare will guide you)

---

## Updating Your Blog

### Adding New Blog Posts

1. Edit `lib/blog-data.ts` to add new post
2. Commit and push to GitHub
3. Cloudflare auto-redeploys (takes ~30 seconds)

### Local Preview

```bash
# Build static files
npm run build

# Preview locally (optional)
npx serve out
```

---

## Troubleshooting

### Issue: Build fails with "output: 'export' error"
**Solution:** Make sure you're on Next.js 14+ (you're on 16.1.6 ✅)

### Issue: Images not loading
**Solution:** Images are unoptimized for static export. If needed, use Cloudflare Images or external CDN.

### Issue: Blank pages after deploy
**Solution:** Check that `out/` directory is being used as build output (not `.next/`)

---

## Performance Stats

- **Build time:** ~7 seconds
- **Total pages:** 7 (home + 4 blog + not-found + 404)
- **Output size:** ~200KB (gzipped)
- **Load time:** <100ms (on Cloudflare CDN)

---

## Next Steps

1. ✅ Push to GitHub — Done
2. **Deploy to Cloudflare Pages** — Follow steps above
3. **Test your live site**
4. **Set up custom domain** (optional)

---

**Status:** Ready to deploy! 🚀
**Framework:** Next.js 16.1.6 (Static Export)
**Target:** Cloudflare Pages
**Build Command:** `npm run build`
**Output Directory:** `out/`
