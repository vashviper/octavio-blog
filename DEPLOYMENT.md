# Deployment Guide for O.C.T.A.V.I.O. Blog

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Project
```bash
npm run build
```

### 3. Start Production Server
```bash
npm start
```

## Vercel Deployment (Recommended)

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: O.C.T.A.V.I.O. Blog"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

That's it! Vercel will automatically:
- Detect Next.js
- Install dependencies
- Build the project
- Deploy to a global CDN

### Manual Configuration (if needed)

Create `vercel.json` in the project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

## Netlify Deployment

1. **Push to GitHub**

2. **Connect Netlify**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → "Import an existing project"
   - Select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

## Docker Deployment

### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t octavio-blog .
docker run -p 3000:3000 octavio-blog
```

## Environment Variables

Add any required environment variables:

### Development
Create `.env.local`:
```bash
# Add your variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production
Set environment variables in your deployment platform:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables

## Performance Checklist

- [ ] Enable gzip/brotli compression (automatic on Vercel/Netlify)
- [ ] Configure CDN caching headers
- [ ] Optimize images before deployment
- [ ] Test with Lighthouse (aim for 90+ in all categories)
- [ ] Verify sitemap is accessible

## Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` — no errors
- [ ] Run `npm run type-check` — no errors
- [ ] Test all pages locally
- [ ] Verify responsive design
- [ ] Check accessibility
- [ ] Test forms and interactive elements
- [ ] Update site metadata if needed

## Post-deployment

1. **Test live site**
   - Navigate to your URL
   - Test all links and forms
   - Check mobile responsiveness

2. **Set up analytics** (optional)
   - Google Analytics
   - Vercel Analytics
   - Plausible (privacy-friendly)

3. **Monitor performance**
   - Set up uptime monitoring
   - Check Core Web Vitals
   - Monitor error rates

## Troubleshooting

### Build fails on Vercel
- Check build logs for errors
- Verify all dependencies are in package.json
- Ensure Node.js version compatibility

### Styles not loading
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

### Type errors
- Run `npm run type-check` locally
- Fix errors before deploying

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

## Support

For issues with:
- **Vercel**: [Vercel Docs](https://vercel.com/docs)
- **Netlify**: [Netlify Docs](https://docs.netlify.com)
- **Next.js**: [Next.js Docs](https://nextjs.org/docs)

---

Happy deploying! 🐙✨
