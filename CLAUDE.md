# CLAUDE.md — Портфолио

## Стек

Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · Framer Motion

## Основные соглашения

- **Данные — в `/content/`**: никогда не хардкодить строки в компонентах. Проекты → `content/projects.ts`, Опыт → `content/experience.ts`, Навыки → `content/skills.ts`
- **Весь UI-текст — через i18n**: добавлять ключи в оба объекта `en` и `ru` в `lib/i18n.ts`, затем использовать `t('key')` через хук `useLanguage()`
- **Клиентские компоненты**: любой компонент с хуками или Framer Motion требует `'use client'` в начале файла
- **Анимации**: использовать Framer Motion `whileInView` с `viewport={{ once: true }}` для анимаций при скролле
- **Акцентный цвет**: `#00d084` (терминальный зелёный); фон — `#0d1117`

## Структура проекта

```
app/            # layout.tsx (метатеги, LanguageProvider), page.tsx (сборка секций)
components/     # По одному компоненту на секцию — Navbar, Hero, About, Skills, Projects, Experience, Blog, Contact
content/        # Файлы с данными (TS, без JSX)
lib/            # i18n.ts (переводы), LanguageContext.tsx (хук useLanguage)
public/         # photo.jpg, resume.pdf
```

## Добавление новой секции

1. Создать `components/NewSection.tsx` с `'use client'`
2. Добавить ключи перевода в `en` и `ru` в `lib/i18n.ts`
3. Добавить данные в `content/`, если нужно
4. Импортировать и отрендерить в `app/page.tsx`
5. Добавить ссылку в навигацию в `components/Navbar.tsx`

## Команды

```bash
npm run dev      # дев-сервер на localhost:3000
npm run build    # продакшн-билд (запускать перед коммитом)
npm run lint     # проверка ESLint
```

## Правила

- Всегда запускать `npm run build` перед коммитом — сломанных билдов быть не должно
- Обновлять этот CLAUDE.md при добавлении новых файлов, скриптов или изменении соглашений
