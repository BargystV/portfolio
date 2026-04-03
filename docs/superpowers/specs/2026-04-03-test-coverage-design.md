# Спецификация: покрытие тестами портфолио

## Цель

Добавить юнит- и интеграционные тесты ко всему функционалу портфолио, чтобы изменения в одном месте не ломали другие части. Тесты автоматически запускаются перед пушем через git hook.

## Стек

| Инструмент | Назначение |
|------------|------------|
| Vitest | Test runner |
| @testing-library/react | Рендеринг компонентов |
| @testing-library/jest-dom | Дополнительные матчеры (toBeInTheDocument и т.д.) |
| @testing-library/user-event | Симуляция пользовательских действий |
| @vitejs/plugin-react | JSX-трансформация в тестах |
| jsdom | DOM-среда для тестов |
| Husky | Git hooks |

## Структура файлов

```
__tests__/
  helpers/
    renderWithProviders.tsx    # Обёртка LanguageProvider для всех компонентных тестов
  lib/
    i18n.test.ts               # Полнота переводов, t() функция
    LanguageContext.test.tsx    # Провайдер, toggle, автодетект
  content/
    skills.test.ts             # Структура данных, i18n-ключи
    workblocks.test.ts         # Структура данных, ключи, URL-ы
  components/
    Navbar.test.tsx             # Скролл, бургер, переключение языка
    Hero.test.tsx               # Рендеринг, ссылки на CV
    About.test.tsx              # Параграфы на обоих языках
    Skills.test.tsx             # Рендеринг всех групп и навыков
    WorkAndProjects.test.tsx    # Раскрытие/сворачивание, тосты, статус-доты
    Contact.test.tsx            # Ссылки, иконки, корректность href
    ScreenshotModal.test.tsx    # Навигация стрелками, Escape, точки
    BuildDate.test.tsx          # Форматирование даты по языку
```

## Конфигурация

### vitest.config.ts

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

### vitest.setup.ts

Глобальные моки:

1. **Framer Motion** — `motion.div` → `<div>`, `AnimatePresence` → `Fragment`
2. **IntersectionObserver** — сразу вызывает callback с `isIntersecting: true`
3. **matchMedia** — возвращает мок-объект с `matches: false`
4. **Canvas API** — мок `getContext('2d')` для `ParticleBackground`

### package.json (новые скрипты)

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "prepare": "husky"
}
```

## Изменения продакшн-кода

Единственное изменение: добавить опциональный пропс `defaultLang?: Lang` в `LanguageProvider`. Если передан — используется как начальный язык (для тестов). Если не передан — поведение не меняется (автодетект через `navigator.language`). Продакшн-код не затрагивается, т.к. `app/layout.tsx` не передаёт этот пропс.

## Моки и тестовые утилиты

### renderWithProviders

```tsx
function renderWithProviders(ui: React.ReactElement, options?: { lang?: 'en' | 'ru' }) {
  return render(
    <LanguageProvider defaultLang={options?.lang ?? 'en'}>
      {ui}
    </LanguageProvider>
  )
}
```

Все компоненты используют `useLanguage()`, поэтому обёртка обязательна.

## Детальный план тестов

### Юнит-тесты

#### i18n.test.ts
- Все ключи `en` присутствуют в `ru`
- Все ключи `ru` присутствуют в `en`
- Нет пустых строк в переводах
- `t()` возвращает строку для каждого ключа

#### LanguageContext.test.tsx
- `useLanguage()` возвращает объект с `lang`, `toggle`, `t`
- Дефолтный язык — 'en'
- `toggle()` переключает 'en' → 'ru' и обратно
- `t(key)` возвращает перевод текущего языка
- `defaultLang` пропс устанавливает начальный язык

#### skills.test.ts
- Массив `skillGroups` не пустой
- Каждая группа имеет `nameKey` и непустой `items`
- Все `nameKey` существуют в i18n

#### workblocks.test.ts
- Массив `workBlocks` не пустой
- Каждый блок имеет `id`, `company`, `roleKey`, `period`, `projects`
- Каждый проект имеет `nameKey`, `descKey`, `stack`
- Все ключи (`roleKey`, `nameKey`, `descKey`) существуют в i18n
- URL-ы (если есть) начинаются с `https://`

### Интеграционные тесты

#### Navbar.test.tsx
- Рендерит логотип/имя
- Рендерит навигационные ссылки (About, Work, Skills, Contact)
- Кнопка переключения языка переключает EN/RU
- Бургер-меню открывается по клику (мобильный вид)

#### Hero.test.tsx
- Рендерит имя и роль
- Кнопка CV имеет корректный href на PDF
- Кнопка Telegram имеет корректный href

#### About.test.tsx
- Рендерит параграфы на английском
- При переключении на русский — тексты меняются

#### Skills.test.tsx
- Рендерит все 9 групп навыков
- Каждая группа содержит все свои навыки

#### WorkAndProjects.test.tsx
- Рендерит все 4 рабочих блока (компании)
- Клик по блоку раскрывает список проектов
- Клик по проекту раскрывает описание
- Повторный клик сворачивает
- Статус-доты имеют корректные цвета (зелёный для ссылок, жёлтый для скриншотов, красный для приватных)
- Клик по заголовку проекта без ссылки показывает тост

#### Contact.test.tsx
- Рендерит все 5 контактных ссылок
- Каждая ссылка имеет корректный href (email, telegram, instagram, github, linkedin)
- Ссылки открываются в новом окне (target="_blank")

#### ScreenshotModal.test.tsx
- Рендерит текущий скриншот
- Стрелка вправо переходит к следующему скриншоту
- Стрелка влево — к предыдущему
- Клавиша Escape закрывает модалку
- Точки навигации показывают текущую позицию

#### BuildDate.test.tsx
- Форматирует дату в формате ru-RU (напр. "3 апреля 2026 г.")
- Форматирует дату в формате en-US (напр. "April 3, 2026")

## Что НЕ тестируем

- **ParticleBackground.tsx** — Canvas API + requestAnimationFrame, сложно мокать. Чисто декоративный компонент, не влияет на функциональность.
- **Анимации Framer Motion** — мокаем как обычные элементы. Тестировать визуальные анимации нет смысла в jsdom.
- **Стили и CSS** — не в скоупе юнит/интеграционных тестов.

## Git Hooks

### Husky

- `prepare` скрипт устанавливает Husky при `npm install`
- `.husky/pre-push` запускает тесты и билд

### .husky/pre-push

```bash
#!/usr/bin/env sh
npm run test && npm run build
```

Логика: тесты упали → пуш заблокирован. Билд сломался → пуш заблокирован. Оба прошли → пуш продолжается.
