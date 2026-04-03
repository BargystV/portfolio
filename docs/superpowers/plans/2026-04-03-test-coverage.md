# Test Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive unit and integration tests to the portfolio, with Husky pre-push hook to prevent broken pushes.

**Architecture:** Vitest + React Testing Library + jsdom for testing. All tests in `__tests__/` with mirrored directory structure. Framer Motion and browser APIs mocked globally. Husky pre-push hook runs tests + build.

**Tech Stack:** Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @vitejs/plugin-react, jsdom, Husky

---

### Task 1: Install dependencies and configure Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Install dev dependencies**

Run:
```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom husky
```

- [ ] **Step 2: Add test scripts to package.json**

Add to `"scripts"` section in `package.json`:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"prepare": "husky"
```

- [ ] **Step 3: Create vitest.config.ts**

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

- [ ] **Step 4: Create vitest.setup.ts**

```ts
import '@testing-library/jest-dom/vitest'

// Мок Framer Motion — заменяем motion-компоненты на обычные HTML-элементы
vi.mock('framer-motion', () => {
  const React = require('react')

  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
          const filteredProps: Record<string, unknown> = {}
          for (const [key, value] of Object.entries(props)) {
            if (
              !key.startsWith('initial') &&
              !key.startsWith('animate') &&
              !key.startsWith('exit') &&
              !key.startsWith('transition') &&
              !key.startsWith('whileInView') &&
              !key.startsWith('whileHover') &&
              !key.startsWith('whileTap') &&
              !key.startsWith('whileFocus') &&
              !key.startsWith('whileDrag') &&
              !key.startsWith('viewport') &&
              !key.startsWith('variants') &&
              key !== 'custom' &&
              key !== 'layout' &&
              key !== 'layoutId'
            ) {
              filteredProps[key] = value
            }
          }
          return React.createElement(prop, { ...filteredProps, ref })
        })
      },
    }
  )

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useInView: () => true,
  }
})

// Мок next/image — рендерим обычный <img>
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props
    return require('react').createElement('img', rest)
  },
}))

// Мок IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(callback: IntersectionObserverCallback) {
    callback(
      [{ isIntersecting: true, intersectionRatio: 1 }] as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver
    )
  }
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// Мок matchMedia
vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
)

// Мок window.scrollY
Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
```

- [ ] **Step 5: Run vitest to verify config works**

Run: `npx vitest run`
Expected: "No test files found" (no error about config)

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json package-lock.json
git commit -m "feat: add Vitest testing infrastructure with global mocks"
```

---

### Task 2: Add LanguageProvider defaultLang prop and test helper

**Files:**
- Modify: `lib/LanguageContext.tsx:45`
- Create: `__tests__/helpers/renderWithProviders.tsx`

- [ ] **Step 1: Add defaultLang prop to LanguageProvider**

In `lib/LanguageContext.tsx`, change the LanguageProvider signature and initial state:

Replace:
```tsx
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // На сервере navigator недоступен, поэтому начальный язык 'en'
  const [lang, setLang] = useState<Lang>('en');

  // После гидрации определяем язык браузера на клиенте
  useEffect(() => {
    setLang(detectLang());
  }, []);
```

With:
```tsx
export function LanguageProvider({ children, defaultLang }: { children: React.ReactNode; defaultLang?: Lang }) {
  // На сервере navigator недоступен, поэтому начальный язык 'en'
  const [lang, setLang] = useState<Lang>(defaultLang ?? 'en');

  // После гидрации определяем язык браузера на клиенте (если defaultLang не задан)
  useEffect(() => {
    if (!defaultLang) setLang(detectLang());
  }, [defaultLang]);
```

- [ ] **Step 2: Create test helper**

Create `__tests__/helpers/renderWithProviders.tsx`:
```tsx
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Lang } from '@/lib/i18n'

/**
 * Обёртка для рендеринга компонентов в тестах с LanguageProvider.
 * Параметр lang позволяет тестировать оба языка.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions & { lang?: Lang }
) {
  const { lang = 'en', ...renderOptions } = options ?? {}
  return render(
    <LanguageProvider defaultLang={lang}>{ui}</LanguageProvider>,
    renderOptions
  )
}
```

- [ ] **Step 3: Verify build still works**

Run: `npm run build`
Expected: Build succeeds (defaultLang is optional, existing code unaffected)

- [ ] **Step 4: Commit**

```bash
git add lib/LanguageContext.tsx __tests__/helpers/renderWithProviders.tsx
git commit -m "feat: add defaultLang prop to LanguageProvider and test helper"
```

---

### Task 3: Unit tests for i18n.ts

**Files:**
- Create: `__tests__/lib/i18n.test.ts`

- [ ] **Step 1: Write the tests**

Create `__tests__/lib/i18n.test.ts`:
```ts
import { translations, TranslationKey } from '@/lib/i18n'

describe('i18n translations', () => {
  const enKeys = Object.keys(translations.en) as TranslationKey[]
  const ruKeys = Object.keys(translations.ru) as TranslationKey[]

  it('en и ru имеют одинаковый набор ключей', () => {
    expect(enKeys.sort()).toEqual(ruKeys.sort())
  })

  it('все значения en — непустые строки', () => {
    for (const key of enKeys) {
      expect(translations.en[key]).toBeTruthy()
      expect(typeof translations.en[key]).toBe('string')
    }
  })

  it('все значения ru — непустые строки', () => {
    for (const key of ruKeys) {
      expect(translations.ru[key]).toBeTruthy()
      expect(typeof translations.ru[key]).toBe('string')
    }
  })

  it('ключи с {count} присутствуют в обоих языках', () => {
    const countKeys = enKeys.filter((k) => translations.en[k].includes('{count}'))
    for (const key of countKeys) {
      expect(translations.ru[key]).toContain('{count}')
    }
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/lib/i18n.test.ts`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/lib/i18n.test.ts
git commit -m "test: add unit tests for i18n translations"
```

---

### Task 4: Unit tests for LanguageContext

**Files:**
- Create: `__tests__/lib/LanguageContext.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/lib/LanguageContext.test.tsx`:
```tsx
import { renderHook, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext'
import { Lang } from '@/lib/i18n'

function wrapper({ lang = 'en' as Lang } = {}) {
  return ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider defaultLang={lang}>{children}</LanguageProvider>
  )
}

describe('useLanguage', () => {
  it('возвращает объект с lang, toggle и t', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: wrapper() })
    expect(result.current).toHaveProperty('lang')
    expect(result.current).toHaveProperty('toggle')
    expect(result.current).toHaveProperty('t')
  })

  it('дефолтный язык — en', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: wrapper() })
    expect(result.current.lang).toBe('en')
  })

  it('defaultLang=ru устанавливает русский язык', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: wrapper({ lang: 'ru' }) })
    expect(result.current.lang).toBe('ru')
  })

  it('toggle переключает en → ru и обратно', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: wrapper() })
    expect(result.current.lang).toBe('en')

    act(() => result.current.toggle())
    expect(result.current.lang).toBe('ru')

    act(() => result.current.toggle())
    expect(result.current.lang).toBe('en')
  })

  it('t() возвращает перевод для текущего языка', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: wrapper() })
    expect(result.current.t('nav_about')).toBe('About')

    act(() => result.current.toggle())
    expect(result.current.t('nav_about')).toBe('Обо мне')
  })

  it('выбрасывает ошибку при использовании вне LanguageProvider', () => {
    // Подавляем вывод ошибок в консоль
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used inside LanguageProvider'
    )
    spy.mockRestore()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/lib/LanguageContext.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/lib/LanguageContext.test.tsx
git commit -m "test: add unit tests for LanguageContext"
```

---

### Task 5: Unit tests for content/skills.ts

**Files:**
- Create: `__tests__/content/skills.test.ts`

- [ ] **Step 1: Write the tests**

Create `__tests__/content/skills.test.ts`:
```ts
import { skillGroups } from '@/content/skills'
import { translations } from '@/lib/i18n'

/** Маппинг ключей групп навыков на i18n-ключи (из Skills.tsx) */
const groupTitleKey: Record<string, string> = {
  languages: 'skills_languages',
  android: 'skills_android',
  networking: 'skills_networking',
  security: 'skills_security',
  backend: 'skills_backend',
  frontend: 'skills_frontend',
  architecture: 'skills_architecture',
  infra: 'skills_infra',
  ai: 'skills_ai',
}

describe('skillGroups', () => {
  it('массив не пустой', () => {
    expect(skillGroups.length).toBeGreaterThan(0)
  })

  it('каждая группа имеет key и непустой items', () => {
    for (const group of skillGroups) {
      expect(group.key).toBeTruthy()
      expect(group.items.length).toBeGreaterThan(0)
    }
  })

  it('все key имеют соответствующий i18n-ключ в en и ru', () => {
    for (const group of skillGroups) {
      const titleKey = groupTitleKey[group.key]
      expect(titleKey).toBeDefined()
      expect(translations.en[titleKey as keyof typeof translations.en]).toBeTruthy()
      expect(translations.ru[titleKey as keyof typeof translations.ru]).toBeTruthy()
    }
  })

  it('нет дубликатов навыков внутри одной группы', () => {
    for (const group of skillGroups) {
      const unique = new Set(group.items)
      expect(unique.size).toBe(group.items.length)
    }
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/content/skills.test.ts`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/content/skills.test.ts
git commit -m "test: add unit tests for skills data"
```

---

### Task 6: Unit tests for content/workblocks.ts

**Files:**
- Create: `__tests__/content/workblocks.test.ts`

- [ ] **Step 1: Write the tests**

Create `__tests__/content/workblocks.test.ts`:
```ts
import { workBlocks } from '@/content/workblocks'
import { translations } from '@/lib/i18n'

const enKeys = Object.keys(translations.en)

describe('workBlocks', () => {
  it('массив не пустой', () => {
    expect(workBlocks.length).toBeGreaterThan(0)
  })

  it('каждый блок имеет id и projects', () => {
    for (const block of workBlocks) {
      expect(block.id).toBeTruthy()
      expect(block.projects.length).toBeGreaterThan(0)
    }
  })

  it('все roleKey и typeKey существуют в i18n', () => {
    for (const block of workBlocks) {
      if (block.roleKey) expect(enKeys).toContain(block.roleKey)
      if (block.typeKey) expect(enKeys).toContain(block.typeKey)
    }
  })

  it('каждый проект имеет nameKey, descKey и stack', () => {
    for (const block of workBlocks) {
      for (const project of block.projects) {
        expect(project.nameKey).toBeTruthy()
        expect(project.descKey).toBeTruthy()
        expect(project.stack.length).toBeGreaterThan(0)
      }
    }
  })

  it('все nameKey и descKey существуют в i18n', () => {
    for (const block of workBlocks) {
      for (const project of block.projects) {
        expect(enKeys).toContain(project.nameKey)
        expect(enKeys).toContain(project.descKey)
      }
    }
  })

  it('URL-ы начинаются с https://', () => {
    for (const block of workBlocks) {
      if (block.url) expect(block.url).toMatch(/^https?:\/\//)
      for (const project of block.projects) {
        if (project.githubUrl) expect(project.githubUrl).toMatch(/^https:\/\//)
        if (project.rustoreUrl) expect(project.rustoreUrl).toMatch(/^https:\/\//)
        if (typeof project.googlePlayUrl === 'string') {
          expect(project.googlePlayUrl).toMatch(/^https:\/\//)
        }
      }
    }
  })

  it('все id блоков уникальны', () => {
    const ids = workBlocks.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/content/workblocks.test.ts`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/content/workblocks.test.ts
git commit -m "test: add unit tests for workblocks data"
```

---

### Task 7: Integration tests for BuildDate

**Files:**
- Create: `__tests__/components/BuildDate.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/BuildDate.test.tsx`:
```tsx
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import BuildDate from '@/components/BuildDate'

describe('BuildDate', () => {
  const isoDate = '2026-03-15T12:00:00Z'

  it('форматирует дату на английском', () => {
    renderWithProviders(<BuildDate isoDate={isoDate} />, { lang: 'en' })
    expect(screen.getByText(/Updated/)).toBeInTheDocument()
    expect(screen.getByText(/March 2026/)).toBeInTheDocument()
  })

  it('форматирует дату на русском', () => {
    renderWithProviders(<BuildDate isoDate={isoDate} />, { lang: 'ru' })
    expect(screen.getByText(/Обновлено/)).toBeInTheDocument()
    expect(screen.getByText(/март 2026/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/BuildDate.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/BuildDate.test.tsx
git commit -m "test: add integration tests for BuildDate"
```

---

### Task 8: Integration tests for Navbar

**Files:**
- Create: `__tests__/components/Navbar.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/Navbar.test.tsx`:
```tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('рендерит логотип BV', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByText('BV')).toBeInTheDocument()
  })

  it('рендерит навигационные ссылки на английском', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Work & Projects').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('кнопка языка показывает EN и переключает на RU', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const langButton = screen.getByLabelText('Toggle language')
    expect(langButton).toHaveTextContent('EN')

    await user.click(langButton)
    expect(langButton).toHaveTextContent('RU')
  })

  it('при переключении языка ссылки обновляются', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const langButton = screen.getByLabelText('Toggle language')
    await user.click(langButton)

    expect(screen.getAllByText('Обо мне').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Работа и проекты').length).toBeGreaterThan(0)
  })

  it('бургер-меню открывается по клику', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const burger = screen.getByLabelText('Toggle menu')
    // До клика — мобильное меню не видно (ссылки только в desktop nav)
    const aboutLinks = screen.getAllByText('About')
    expect(aboutLinks.length).toBe(1) // только desktop

    await user.click(burger)
    // После клика — мобильное меню появилось, ссылки дублируются
    expect(screen.getAllByText('About').length).toBe(2)
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/Navbar.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/Navbar.test.tsx
git commit -m "test: add integration tests for Navbar"
```

---

### Task 9: Integration tests for Hero

**Files:**
- Create: `__tests__/components/Hero.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/Hero.test.tsx`:
```tsx
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('рендерит имя и роль на английском', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText('Boris Varshaver')).toBeInTheDocument()
    expect(screen.getByText('Senior Android Developer')).toBeInTheDocument()
  })

  it('рендерит имя на русском', () => {
    renderWithProviders(<Hero />, { lang: 'ru' })
    expect(screen.getByText('Борис Варшавер')).toBeInTheDocument()
  })

  it('кнопка скачивания резюме ведёт на PDF', () => {
    renderWithProviders(<Hero />)
    const downloadLink = screen.getByText('Download Resume')
    expect(downloadLink.closest('a')).toHaveAttribute('href', '/Boris_Varshaver_Resume.pdf')
  })

  it('кнопка Contact Me ведёт на секцию контактов', () => {
    renderWithProviders(<Hero />)
    const contactLink = screen.getByText('Contact Me')
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact')
  })

  it('рендерит все 4 строки тэглайна', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText(/Android — 9\+ years/)).toBeInTheDocument()
    expect(screen.getByText(/Backend — REST APIs/)).toBeInTheDocument()
    expect(screen.getByText(/Desktop — plant evolution/)).toBeInTheDocument()
    expect(screen.getByText(/AI — agents/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/Hero.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/Hero.test.tsx
git commit -m "test: add integration tests for Hero"
```

---

### Task 10: Integration tests for About

**Files:**
- Create: `__tests__/components/About.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/About.test.tsx`:
```tsx
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import About from '@/components/About'

describe('About', () => {
  it('рендерит заголовок на английском', () => {
    renderWithProviders(<About />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('рендерит все 5 параграфов на английском', () => {
    renderWithProviders(<About />)
    expect(screen.getByText(/Senior Android Developer with over 9 years/)).toBeInTheDocument()
    expect(screen.getByText(/intersection of mobile development and AI/)).toBeInTheDocument()
    expect(screen.getByText(/automating and organizing/)).toBeInTheDocument()
    expect(screen.getByText(/life simulation: cells, rules/)).toBeInTheDocument()
    expect(screen.getByText(/guitar, jaw harp/)).toBeInTheDocument()
  })

  it('рендерит параграфы на русском', () => {
    renderWithProviders(<About />, { lang: 'ru' })
    expect(screen.getByText('Обо мне')).toBeInTheDocument()
    expect(screen.getByText(/Senior Android Developer с более чем 9 годами/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/About.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/About.test.tsx
git commit -m "test: add integration tests for About"
```

---

### Task 11: Integration tests for Skills

**Files:**
- Create: `__tests__/components/Skills.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/Skills.test.tsx`:
```tsx
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Skills from '@/components/Skills'
import { skillGroups } from '@/content/skills'

describe('Skills', () => {
  it('рендерит заголовок секции', () => {
    renderWithProviders(<Skills />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('рендерит все 9 групп навыков', () => {
    renderWithProviders(<Skills />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
    expect(screen.getByText('Networking & Serialization')).toBeInTheDocument()
    expect(screen.getByText('Security & Cryptography')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Frontend & Web')).toBeInTheDocument()
    expect(screen.getByText('Architecture & Patterns')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure & DevOps')).toBeInTheDocument()
    expect(screen.getByText('AI & Automation')).toBeInTheDocument()
  })

  it('рендерит все навыки из каждой группы', () => {
    renderWithProviders(<Skills />)
    for (const group of skillGroups) {
      for (const item of group.items) {
        expect(screen.getByText(item)).toBeInTheDocument()
      }
    }
  })

  it('рендерит заголовки групп на русском', () => {
    renderWithProviders(<Skills />, { lang: 'ru' })
    expect(screen.getByText('Навыки')).toBeInTheDocument()
    expect(screen.getByText('Языки')).toBeInTheDocument()
    expect(screen.getByText('Мобильная разработка')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/Skills.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/Skills.test.tsx
git commit -m "test: add integration tests for Skills"
```

---

### Task 12: Integration tests for Contact

**Files:**
- Create: `__tests__/components/Contact.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/Contact.test.tsx`:
```tsx
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('рендерит все 5 контактных ссылок', () => {
    renderWithProviders(<Contact />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Telegram')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('Email ведёт на mailto', () => {
    renderWithProviders(<Contact />)
    const emailLink = screen.getByText('Email').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:bargystvelp@gmail.com')
  })

  it('Telegram ведёт на t.me', () => {
    renderWithProviders(<Contact />)
    const tgLink = screen.getByText('Telegram').closest('a')
    expect(tgLink).toHaveAttribute('href', 'https://t.me/bargystvelp')
  })

  it('GitHub ведёт на github.com', () => {
    renderWithProviders(<Contact />)
    const ghLink = screen.getByText('GitHub').closest('a')
    expect(ghLink).toHaveAttribute('href', 'https://github.com/BargystV')
  })

  it('внешние ссылки открываются в новой вкладке', () => {
    renderWithProviders(<Contact />)
    const tgLink = screen.getByText('Telegram').closest('a')
    expect(tgLink).toHaveAttribute('target', '_blank')
    expect(tgLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('mailto не открывается в новой вкладке', () => {
    renderWithProviders(<Contact />)
    const emailLink = screen.getByText('Email').closest('a')
    expect(emailLink).not.toHaveAttribute('target')
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/Contact.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/Contact.test.tsx
git commit -m "test: add integration tests for Contact"
```

---

### Task 13: Integration tests for ScreenshotModal

**Files:**
- Create: `__tests__/components/ScreenshotModal.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/ScreenshotModal.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScreenshotModal from '@/components/ScreenshotModal'

const screenshots = ['/screenshots/test/1.png', '/screenshots/test/2.png', '/screenshots/test/3.png']
const defaultProps = {
  screenshots,
  projectName: 'Test Project',
  onClose: vi.fn(),
}

describe('ScreenshotModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('рендерит название проекта', () => {
    render(<ScreenshotModal {...defaultProps} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('показывает счётчик 1 / 3', () => {
    render(<ScreenshotModal {...defaultProps} />)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('кнопка → переходит к следующему скриншоту', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.click(screen.getByLabelText('Следующий'))
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('кнопка ← переходит к предыдущему скриншоту (цикл)', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.click(screen.getByLabelText('Предыдущий'))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('Escape закрывает модалку', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.keyboard('{Escape}')
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('стрелки клавиатуры переключают скриншоты', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('рендерит точки-индикаторы по количеству скриншотов', () => {
    render(<ScreenshotModal {...defaultProps} />)
    const dots = screen.getAllByLabelText(/Скриншот \d+/)
    expect(dots.length).toBe(3)
  })

  it('клик по точке переходит к нужному скриншоту', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.click(screen.getByLabelText('Скриншот 3'))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/ScreenshotModal.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/ScreenshotModal.test.tsx
git commit -m "test: add integration tests for ScreenshotModal"
```

---

### Task 14: Integration tests for WorkAndProjects

**Files:**
- Create: `__tests__/components/WorkAndProjects.test.tsx`

- [ ] **Step 1: Write the tests**

Create `__tests__/components/WorkAndProjects.test.tsx`:
```tsx
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../helpers/renderWithProviders'
import WorkAndProjects from '@/components/WorkAndProjects'

describe('WorkAndProjects', () => {
  it('рендерит заголовок секции', () => {
    renderWithProviders(<WorkAndProjects />)
    expect(screen.getByText('Work & Projects')).toBeInTheDocument()
  })

  it('рендерит все 4 блока компаний', () => {
    renderWithProviders(<WorkAndProjects />)
    expect(screen.getByText('Nadeks')).toBeInTheDocument()
    expect(screen.getByText('Mahuru')).toBeInTheDocument()
    expect(screen.getByText('Freelance')).toBeInTheDocument()
    expect(screen.getByText('Personal Projects')).toBeInTheDocument()
  })

  it('показывает счётчик проектов', () => {
    renderWithProviders(<WorkAndProjects />)
    expect(screen.getByText('1 project')).toBeInTheDocument() // Nadeks
    expect(screen.getByText('4 projects')).toBeInTheDocument() // Mahuru
  })

  it('клик по блоку раскрывает проекты', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Проект Nadeks не видим до раскрытия блока
    expect(screen.queryByText('ARIASOFT.POS / ARIASOFT.T2P')).not.toBeInTheDocument()

    // Кликаем по блоку Nadeks (кликаем по счётчику, который точно внутри кликабельной зоны)
    await user.click(screen.getByText('1 project'))
    expect(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P')).toBeInTheDocument()
  })

  it('клик по проекту раскрывает описание и стек', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Nadeks
    await user.click(screen.getByText('1 project'))

    // Описание проекта ещё не видно
    expect(screen.queryByText(/Designed Multihal architecture/)).not.toBeInTheDocument()

    // Раскрываем проект
    await user.click(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P'))
    expect(screen.getByText(/Corporate payment application/)).toBeInTheDocument()
    expect(screen.getByText('Kotlin')).toBeInTheDocument()
  })

  it('повторный клик сворачивает блок', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    await user.click(screen.getByText('1 project'))
    expect(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P')).toBeInTheDocument()

    await user.click(screen.getByText('1 project'))
    expect(screen.queryByText('ARIASOFT.POS / ARIASOFT.T2P')).not.toBeInTheDocument()
  })

  it('рендерит заголовки на русском', () => {
    renderWithProviders(<WorkAndProjects />, { lang: 'ru' })
    expect(screen.getByText('Работа и проекты')).toBeInTheDocument()
    expect(screen.getByText('Личные проекты')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run __tests__/components/WorkAndProjects.test.tsx`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/WorkAndProjects.test.tsx
git commit -m "test: add integration tests for WorkAndProjects"
```

---

### Task 15: Run full test suite and verify

- [ ] **Step 1: Run all tests**

Run: `npm run test`
Expected: All tests PASS (12 test files, 40+ tests)

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit any fixes if needed**

If any tests fail, fix them and commit. Otherwise skip this step.

---

### Task 16: Set up Husky pre-push hook

**Files:**
- Modify: `package.json` (prepare script already added in Task 1)
- Create: `.husky/pre-push`

- [ ] **Step 1: Initialize Husky**

Run: `npx husky init`

This creates `.husky/` directory and a sample `pre-commit` hook.

- [ ] **Step 2: Remove default pre-commit hook**

Run: `rm .husky/pre-commit`

We don't need pre-commit, only pre-push.

- [ ] **Step 3: Create pre-push hook**

Create `.husky/pre-push`:
```bash
npm run test && npm run build
```

- [ ] **Step 4: Make hook executable**

Run: `chmod +x .husky/pre-push`

- [ ] **Step 5: Verify hook file exists and is executable**

Run: `ls -la .husky/pre-push`
Expected: File exists with execute permissions

- [ ] **Step 6: Commit**

```bash
git add .husky/ package.json
git commit -m "feat: add Husky pre-push hook (tests + build)"
```

---

### Task 17: Update CLAUDE.md and bump version

**Files:**
- Modify: `CLAUDE.md`
- Modify: `package.json` (version bump)

- [ ] **Step 1: Add test info to CLAUDE.md**

Add to the `## Команды` section:
```bash
npm run test      # запуск всех тестов
npm run test:watch # тесты в режиме наблюдения
```

Add a new section `## Тестирование`:
```markdown
## Тестирование

- **Стек**: Vitest + React Testing Library + jsdom
- **Тесты**: `__tests__/` с зеркальной структурой проекта
- **Хелпер**: `__tests__/helpers/renderWithProviders.tsx` — обёртка с `LanguageProvider`
- **Моки**: Framer Motion, next/image, IntersectionObserver, matchMedia (в `vitest.setup.ts`)
- **Git hook**: Husky pre-push запускает `npm run test && npm run build`
- **Что НЕ тестируем**: `ParticleBackground` (Canvas API, декоративный), анимации Framer Motion
```

- [ ] **Step 2: Bump version to 1.2.0**

In `package.json`, change `"version": "1.1.1"` to `"version": "1.2.0"` (new feature: test infrastructure).

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md package.json
git commit -m "docs: update CLAUDE.md with test conventions, bump to 1.2.0"
```
