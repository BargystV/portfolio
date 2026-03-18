# CLAUDE.md — Portfolio Project

## Stack

Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · Framer Motion

## Key conventions

- **Data lives in `/content/`** — never hardcode strings in components. Projects → `content/projects.ts`, Experience → `content/experience.ts`, Skills → `content/skills.ts`
- **All UI text goes through i18n** — add keys to both `en` and `ru` objects in `lib/i18n.ts`, then use `t('key')` via `useLanguage()` hook
- **Client components** — any component using hooks or Framer Motion needs `'use client'` at the top
- **Animations** — use Framer Motion `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations
- **Accent color** — `#00d084` (terminal green); background — `#0d1117`

## Project structure

```
app/            # layout.tsx (metadata, LanguageProvider), page.tsx (sections assembly)
components/     # One component per section — Navbar, Hero, About, Skills, Projects, Experience, Blog, Contact
content/        # Data files (TS, no JSX)
lib/            # i18n.ts (translations), LanguageContext.tsx (useLanguage hook)
public/         # photo.jpg, resume.pdf
```

## Adding a new section

1. Create `components/NewSection.tsx` with `'use client'`
2. Add translation keys to both `en` and `ru` in `lib/i18n.ts`
3. Add data to `content/` if needed
4. Import and render in `app/page.tsx`
5. Add nav link in `components/Navbar.tsx`

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build (run before committing)
npm run lint     # ESLint check
```

## Rules

- Always run `npm run build` before committing — no broken builds
- Update this CLAUDE.md when adding new files, scripts, or changing conventions
