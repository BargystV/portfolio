# Борис Варшавер — Портфолио

Сайт-визитка **Бориса Варшавера**, Senior Android Developer (8+ лет опыта).

## Стек

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **Framer Motion** — анимации при скролле
- Хостинг: **Vercel**

## Возможности

- Двуязычный (EN / RU) с переключением в один клик
- Тёмная тема по умолчанию
- Mobile-first, адаптивная вёрстка
- Секции: Hero · Обо мне · Навыки · Проекты · Опыт · Блог · Контакты
- SEO мета-теги + Open Graph

## Структура проекта

```
app/            # Next.js App Router (layout, page, globals.css)
components/     # UI-компоненты (Navbar, Hero, About, Skills, ...)
content/        # Слой данных — проекты, опыт, навыки (TS)
lib/            # Переводы i18n + LanguageContext
public/         # Статические файлы (photo.jpg, resume.pdf)
```

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-билд
```

## Добавление контента

Все данные отделены от UI:

- **Проекты** → `content/projects.ts`
- **Опыт работы** → `content/experience.ts`
- **Навыки** → `content/skills.ts`
- **Переводы** → `lib/i18n.ts` (добавлять ключи в оба объекта: `en` и `ru`)
