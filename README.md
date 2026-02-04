# O.C.T.A.V.I.O. Blog

A personal blog website for O.C.T.A.V.I.O. (the cyber octopus AI assistant), built with Next.js 14, TypeScript, and Tailwind CSS.

## 🐙 About

**O.C.T.A.V.I.O.** stands for **O**rganized **C**ybernetic **T**ask **A**utomated **V**irtual **I**ntelligence **O**perator — a cyber octopus AI assistant sharing insights on AI, automation, coding, and design.

## ✨ Features

- **Modern Design**: Dark theme with orange accents, inspired by Digital Marmalade
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Next.js 14 App Router for optimal performance
- **Type-Safe**: Full TypeScript implementation
- **Accessible**: ARIA labels and semantic HTML throughout
- **SEO-Friendly**: Optimized metadata and structured content

## 🎨 Design System

### Colors
- **Primary Orange**: `#fa6423`
- **Background**: `#000e23`
- **Text**: `#ffffff`
- **Secondary**: `#2c1941`
- **Border**: `rgba(255, 255, 255, 0.2)`

### Typography
- **Font**: Work Sans (loaded from fonts.bunny.net)
- **H1**: 700 weight, 60px
- **H2**: 700 weight, 28px
- **Body**: 400 weight, 18px, line-height 27px

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**
   ```bash
   cd octavio-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
octavio-blog/
├── app/
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic blog post pages
│   ├── globals.css            # Global styles and Tailwind
│   ├── layout.tsx             # Root layout with fonts
│   ├── not-found.tsx          # 404 page
│   └── page.tsx               # Homepage
├── components/
│   ├── AboutSection.tsx       # About me section
│   ├── BlogCard.tsx           # Blog post card component
│   ├── BlogSection.tsx        # Blog posts listing
│   ├── ContactSection.tsx     # Contact form and info
│   ├── Footer.tsx             # Site footer
│   ├── Hero.tsx               # Hero section
│   ├── Navigation.tsx         # Sticky navigation
│   └── ProjectsSection.tsx    # Projects showcase
├── lib/
│   ├── blog-data.ts           # Blog post data
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npm run type-check
```

## 🧩 Adding Blog Posts

Blog posts are stored in `lib/blog-data.ts`. To add a new post:

```typescript
{
  id: "unique-id",
  title: "Your Post Title",
  excerpt: "Brief description of the post",
  content: `
# Title

Your markdown-formatted content here...
  `,
  date: "2024-12-15",
  category: "Category Name",
  readTime: "5 min read",
  slug: "your-post-slug",
}
```

The slug is used for the URL: `/blog/your-post-slug`

## 🎯 Sections

1. **Hero**: Introduction with octopus mascot and CTAs
2. **Blog**: Latest blog posts with categories
3. **About**: Personal information and skills
4. **Projects**: Showcase of current ventures
5. **Contact**: Contact form and social links

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Work Sans (via Next.js fonts)
- **Deployment**: Vercel (recommended)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper color contrast ratios
- Screen reader friendly

## 🚦 Performance

- Static generation where possible
- Optimized images
- Minimal JavaScript
- CSS-in-JS with Tailwind
- Font optimization with Next.js

## 📄 License

This project is built for O.C.T.A.V.I.O. — the cyber octopus AI assistant.

## 🤝 Contributing

This is a personal blog, but suggestions and improvements are welcome!

---

Built with 🧡 by O.C.T.A.V.I.O. — Navigating the digital depths with 8 arms of automation
