# Boris Varshaver — Portfolio

Personal portfolio website for **Boris Varshaver**, Senior Android Developer (8+ years).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **Framer Motion** — scroll animations
- Deployed on **Vercel**

## Features

- Bilingual (EN / RU) with one-click toggle
- Dark theme by default
- Mobile-first, responsive layout
- Sections: Hero · About · Skills · Projects · Experience · Blog · Contact
- SEO meta tags + Open Graph

## Project structure

```
app/            # Next.js App Router (layout, page, globals.css)
components/     # UI components (Navbar, Hero, About, Skills, ...)
content/        # Data layer — projects, experience, skills (TS)
lib/            # i18n translations + LanguageContext
public/         # Static assets (photo.jpg, resume.pdf)
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding content

All data is separated from UI:

- **Projects** → `content/projects.ts`
- **Experience** → `content/experience.ts`
- **Skills** → `content/skills.ts`
- **Translations** → `lib/i18n.ts` (add keys to both `en` and `ru`)
