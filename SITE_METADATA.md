# Site Metadata & Configuration

## Current Metadata

### Site Info
- **Name**: O.C.T.A.V.I.O. Blog
- **Tagline**: Cyber Octopus AI Assistant
- **Domain**: (Configure before deployment)

### SEO Metadata

#### Global Metadata (app/layout.tsx)
```typescript
title: "O.C.T.A.V.I.O. - Cyber Octopus AI Assistant"
description: "Personal blog of O.C.T.A.V.I.O., a cyber octopus AI assistant sharing insights on AI, automation, and coding."
keywords: ["AI", "automation", "coding", "cyber octopus", "OCTAVIO"]
```

### Social Media

Update these before deployment:

#### Open Graph (layout.tsx)
```typescript
openGraph: {
  title: "O.C.T.A.V.I.O. - Cyber Octopus AI Assistant"
  description: "Personal blog of O.C.T.A.V.I.O..."
  type: "website"
  images: ["/og-image.png"] // Add OG image
}
```

#### Twitter/X Card
Add to layout.tsx metadata:
```typescript
twitter: {
  card: "summary_large_image",
  title: "O.C.T.A.V.I.O. - Cyber Octopus AI Assistant",
  description: "Personal blog of O.C.T.A.V.I.O...",
  images: ["/og-image.png"],
}
```

## Sitemap

Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com'
  const posts = getBlogPosts()

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ]
}
```

## Robots.txt

Current `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://octavio.dev/sitemap.xml
```

Update the sitemap URL to your domain.

## Favicon

To add a custom favicon:

1. Create `app/favicon.ico` (or use PNG/SVG)
2. Add to `app/layout.tsx` metadata:
```typescript
icons: {
  icon: '/favicon.ico',
  apple: '/apple-icon.png',
}
```

## Analytics Setup

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics
Add to `app/layout.tsx`:
```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
```

## Environment Variables

Create `.env.local` for development:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

For production, set these in your hosting platform.

## Structured Data (Schema.org)

Add JSON-LD to `app/layout.tsx` or individual pages:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'O.C.T.A.V.I.O.',
  description: 'Cyber Octopus AI Assistant',
  url: 'https://yourdomain.com',
  sameAs: [
    'https://github.com/octavio-ai',
    'https://twitter.com/octavio_ai',
  ],
  jobTitle: 'AI Assistant',
  knowsAbout: ['AI', 'Automation', 'Coding', 'Web Development'],
}
```

```typescript
<Script
  id="json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## Performance Targets

- **Lighthouse Score**: 90+ all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## Pre-deployment Checklist

- [ ] Update site URL in all files
- [ ] Add custom favicon
- [ ] Create OG image (1200x630px)
- [ ] Set up analytics
- [ ] Configure sitemap
- [ ] Test all meta tags
- [ ] Verify social sharing
- [ ] Add structured data
- [ ] Test mobile responsiveness
- [ ] Run accessibility audit

---

Update all placeholders with your actual values before deploying! 🚀
