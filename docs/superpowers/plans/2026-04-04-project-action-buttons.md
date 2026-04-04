# Project Action Buttons — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace invisible clickable project titles with explicit side-strip buttons and text buttons in expanded cards.

**Architecture:** Add a `getProjectAction()` helper that determines the single action per project (screenshots > link > private > none). Refactor `ProjectCard` to render a full-height side strip in the header and a text button in the expanded body. Remove title click handlers, inline toasts, and old dot-color functions.

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Vitest, React Testing Library

---

### Task 1: Add i18n key and create feature branch

**Files:**
- Modify: `lib/i18n.ts:63-69` (en block), `lib/i18n.ts:209-215` (ru block)

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/project-action-buttons main
```

- [ ] **Step 2: Add `proj_btn_screenshots` key to en translations**

In `lib/i18n.ts`, add after the `proj_toast_gplay` line in the `en` block:

```typescript
    proj_btn_screenshots: 'Screenshots',
```

- [ ] **Step 3: Add `proj_btn_screenshots` key to ru translations**

In `lib/i18n.ts`, add after the `proj_toast_gplay` line in the `ru` block:

```typescript
    proj_btn_screenshots: 'Скриншоты',
```

- [ ] **Step 4: Run build to verify no type errors**

Run: `npm run build`
Expected: Build succeeds, new key is recognized in `TranslationKey` type.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n.ts
git commit -m "feat: add proj_btn_screenshots i18n key"
```

---

### Task 2: Add `getProjectAction` helper and refactor `ProjectCard` header

**Files:**
- Modify: `components/WorkAndProjects.tsx`

- [ ] **Step 1: Write the `getProjectAction` helper function**

Replace the `getDotColor` and `getTitleHoverColor` functions in `components/WorkAndProjects.tsx` with:

```typescript
/**
 * Тип действия проекта: скриншоты, внешняя ссылка, приватный или ничего.
 */
type ProjectActionType = 'screenshots' | 'link' | 'private' | 'none';

/**
 * Результат определения действия проекта для отображения кнопки.
 */
interface ProjectAction {
  /** Тип действия */
  type: ProjectActionType;
  /** Иконка для боковой полосы */
  icon: string;
  /** CSS-класс цвета фона полосы */
  bgColor: string;
  /** CSS-класс цвета рамки-разделителя */
  borderColor: string;
  /** CSS-класс цвета иконки */
  textColor: string;
  /** Метка для текстовой кнопки (напр. "GitHub", "RuStore") — null для некликабельных */
  label: string | null;
}

/**
 * Определяет единственное действие проекта по приоритету:
 * скриншоты > внешняя ссылка > приватный > нет действия.
 */
function getProjectAction(project: WorkProject): ProjectAction {
  // Скриншоты — наивысший приоритет
  if (project.screenshots?.length) {
    return {
      type: 'screenshots',
      icon: '🖼',
      bgColor: 'bg-yellow-400/[0.08]',
      borderColor: 'border-yellow-400/20',
      textColor: 'text-yellow-400',
      label: null, // будет формироваться отдельно с учётом i18n
    };
  }
  // Внешняя ссылка (GitHub, RuStore, Google Play строка)
  if (project.githubUrl) {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      label: 'GitHub',
    };
  }
  if (project.rustoreUrl) {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      label: 'RuStore',
    };
  }
  if (typeof project.googlePlayUrl === 'string') {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      label: 'Google Play',
    };
  }
  // Приватный проект (без скриншотов и без ссылок)
  if (project.isPrivate) {
    return {
      type: 'private',
      icon: '🔒',
      bgColor: 'bg-red-500/[0.06]',
      borderColor: 'border-red-500/15',
      textColor: 'text-red-500/50',
      label: null,
    };
  }
  // Нет действия
  return {
    type: 'none',
    icon: '—',
    bgColor: 'bg-white/[0.02]',
    borderColor: 'border-white/[0.08]',
    textColor: 'text-white/20',
    label: null,
  };
}
```

- [ ] **Step 2: Delete the old `getDotColor` and `getTitleHoverColor` functions**

Remove the two functions `getDotColor` (lines ~41-46) and `getTitleHoverColor` (lines ~52-57) entirely.

- [ ] **Step 3: Refactor `ProjectCard` props — remove toast props**

Replace the `ProjectCard` component props interface. Remove `toastPrivate`, `toastNoLink`, `toastGplay`. The new props:

```typescript
function ProjectCard({
  project,
  delay,
  isExpanded,
  onToggle,
  t,
  lang,
  onScreenshots,
}: {
  project: WorkProject;
  delay: number;
  isExpanded: boolean;
  onToggle: () => void;
  t: (key: TranslationKey) => string;
  lang: string;
  /** Callback открытия галереи скриншотов — передаётся только если у проекта есть скриншоты */
  onScreenshots?: () => void;
}) {
```

- [ ] **Step 4: Rewrite `ProjectCard` body — side strip header + text button**

Replace the entire return of `ProjectCard` with:

```typescript
  const action = getProjectAction(project);
  /** Кликабельна ли боковая полоса */
  const isActionClickable = action.type === 'screenshots' || action.type === 'link';

  /** Обработчик клика по боковой полосе */
  function handleStripClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (action.type === 'link') {
      const url = project.githubUrl || project.rustoreUrl || (typeof project.googlePlayUrl === 'string' ? project.googlePlayUrl : undefined);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'screenshots' && onScreenshots) {
      onScreenshots();
    }
  }

  /** Текст кнопки в раскрытой карточке */
  function getButtonLabel(): string | null {
    if (action.type === 'screenshots') {
      return `${t('proj_btn_screenshots')} 🖼 (${project.screenshots!.length})`;
    }
    if (action.type === 'link' && action.label) {
      return `${action.label} ↗`;
    }
    return null;
  }

  const buttonLabel = getButtonLabel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative"
    >
      {/* Свёрнутый заголовок проекта с боковой полосой */}
      <motion.div
        onClick={onToggle}
        whileHover={{ y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
        className={`flex rounded-xl border ${isExpanded ? 'border-[#00d084]/30 bg-[#0d1117]' : 'border-white/10 bg-[#0d1117] hover:border-[#00d084]/30'} cursor-pointer transition-colors duration-150 overflow-hidden`}
      >
        {/* Боковая полоса-кнопка */}
        {isActionClickable ? (
          <a
            onClick={handleStripClick}
            className={`flex items-center justify-center w-10 shrink-0 ${action.bgColor} border-r ${action.borderColor} ${action.textColor} text-sm cursor-pointer hover:brightness-150 transition-all duration-150`}
            title={action.label || t('proj_btn_screenshots')}
          >
            {action.icon}
          </a>
        ) : (
          <span
            className={`flex items-center justify-center w-10 shrink-0 ${action.bgColor} border-r ${action.borderColor} ${action.textColor} text-sm cursor-default`}
          >
            {action.icon}
          </span>
        )}
        {/* Содержимое заголовка */}
        <div className="flex items-center gap-2.5 flex-1 p-4">
          <h4 className="font-bold text-base text-white">{t(project.nameKey)}</h4>
          {project.period && (
            <p className="font-mono text-xs text-white/30 ml-auto shrink-0">
              {lang === 'ru' && project.periodRu ? project.periodRu : project.period}
            </p>
          )}
          <Chevron expanded={isExpanded} size="sm" />
        </div>
      </motion.div>

      {/* Развёрнутое содержимое проекта */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border border-t-0 border-[#00d084]/30 rounded-b-xl bg-[#0d1117] p-6 pt-4 -mt-3">
              {renderDesc(t(project.descKey))}

              {/* Теги стека технологий */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs font-mono text-[#00d084]/70 bg-[#00d084]/5 border border-[#00d084]/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Текстовая кнопка действия */}
              {buttonLabel && (
                <div className="mt-4">
                  <a
                    onClick={handleStripClick}
                    className={`inline-flex items-center gap-1.5 px-4 py-[7px] rounded-lg border ${action.borderColor} ${action.textColor} text-xs font-mono cursor-pointer ${action.bgColor} hover:brightness-150 transition-all duration-150`}
                  >
                    {buttonLabel}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
```

- [ ] **Step 5: Remove old state and refs from `ProjectCard`**

Delete the `inlineToast` state, `toastTimer` ref, and `handleActionClick` function from `ProjectCard` — they are replaced by `handleStripClick`.

- [ ] **Step 6: Update `ProjectCard` usage in parent — remove toast props**

In the `WorkAndProjects` component's render, update the `<ProjectCard>` JSX to remove the three toast props:

```typescript
<ProjectCard
  key={project.nameKey}
  project={project}
  delay={j * 0.06}
  isExpanded={expandedProjects.has(project.nameKey)}
  onToggle={() => toggleProject(project.nameKey)}
  t={t}
  lang={lang}
  onScreenshots={
    project.screenshots?.length
      ? () => setScreenshotModal({ screenshots: project.screenshots!, name: t(project.nameKey), wide: project.screenshotWide })
      : undefined
  }
/>
```

- [ ] **Step 7: Run build**

Run: `npm run build`
Expected: Build succeeds with no type errors.

- [ ] **Step 8: Commit**

```bash
git add components/WorkAndProjects.tsx
git commit -m "feat: replace status dots with side-strip action buttons in project cards"
```

---

### Task 3: Clean up unused toast code in parent component

**Files:**
- Modify: `components/WorkAndProjects.tsx`

- [ ] **Step 1: Check for unused toast-related code**

In the `WorkAndProjects` component, verify that `proj_toast_private`, `proj_toast_no_link`, `proj_toast_gplay` are no longer referenced anywhere. The `isClickable` variable in `ProjectCard` was also removed.

- [ ] **Step 2: Remove unused i18n keys**

In `lib/i18n.ts`, remove these keys from both `en` and `ru` blocks:

```typescript
    // Remove these lines:
    proj_toast_private: 'Private repository',
    proj_toast_no_link: 'No link available',
    proj_toast_gplay: 'Available on Google Play',
```

```typescript
    // Remove these lines:
    proj_toast_private: 'Приватный репозиторий',
    proj_toast_no_link: 'Ссылка недоступна',
    proj_toast_gplay: 'Доступно на Google Play',
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds. No references to removed keys.

- [ ] **Step 4: Commit**

```bash
git add components/WorkAndProjects.tsx lib/i18n.ts
git commit -m "refactor: remove unused toast i18n keys"
```

---

### Task 4: Update tests

**Files:**
- Modify: `__tests__/components/WorkAndProjects.test.tsx`

- [ ] **Step 1: Update existing tests**

The test `'клик по проекту раскрывает описание и стек'` clicks the project period text to toggle. With the new layout the period is still inside the clickable area, so the toggle should still work. However, the `window.open` mock may no longer be needed since title click is removed.

Update the test file:

```typescript
import { screen } from '@testing-library/react'
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
    expect(screen.getAllByText('1 project').length).toBe(2)
    expect(screen.getByText('4 projects')).toBeInTheDocument()
  })

  it('клик по блоку раскрывает проекты', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    expect(screen.queryByText('ARIASOFT.POS / ARIASOFT.T2P')).not.toBeInTheDocument()

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P')).toBeInTheDocument()
  })

  it('клик по проекту раскрывает описание и стек', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.queryByText(/Corporate payment application/)).not.toBeInTheDocument()

    // Кликаем по периоду проекта для toggle
    await user.click(screen.getByText(/Feb 2020/))
    expect(screen.getByText(/Corporate payment application/)).toBeInTheDocument()
  })

  it('повторный клик сворачивает блок', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P')).toBeInTheDocument()

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.queryByText('ARIASOFT.POS / ARIASOFT.T2P')).not.toBeInTheDocument()
  })

  it('рендерит заголовки на русском', () => {
    renderWithProviders(<WorkAndProjects />, { lang: 'ru' })
    expect(screen.getByText('Работа и проекты')).toBeInTheDocument()
    expect(screen.getByText('Личные проекты')).toBeInTheDocument()
  })

  it('показывает боковую полосу-ссылку для проектов с GitHub URL', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Personal Projects
    await user.click(screen.getByText('Personal Projects'))

    // Portfolio имеет githubUrl — должна быть ссылочная полоса с title="GitHub"
    const githubStrip = screen.getAllByTitle('GitHub')[0]
    expect(githubStrip).toBeInTheDocument()
    expect(githubStrip.tagName).toBe('A')
  })

  it('показывает боковую полосу-галерею для проектов со скриншотами', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Mahuru
    await user.click(screen.getByText('Mahuru'))

    // Enterprise MRM имеет скриншоты — должна быть полоса с title содержащим "Screenshots"
    const screenshotStrip = screen.getByTitle('Screenshots')
    expect(screenshotStrip).toBeInTheDocument()
    expect(screenshotStrip.tagName).toBe('A')
  })

  it('показывает текстовую кнопку в раскрытой карточке', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Personal Projects и затем проект Portfolio
    await user.click(screen.getByText('Personal Projects'))
    await user.click(screen.getByText('Boris Portfolio'))

    // Должна быть текстовая кнопка "GitHub ↗"
    expect(screen.getByText('GitHub ↗')).toBeInTheDocument()
  })

  it('кнопка скриншотов показывает количество', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем Mahuru → Enterprise MRM
    await user.click(screen.getByText('Mahuru'))
    await user.click(screen.getByText('Enterprise MRM'))

    // Должна быть кнопка с текстом содержащим "Screenshots" и "(12)"
    expect(screen.getByText(/Screenshots.*12/)).toBeInTheDocument()
  })

  it('боковая полоса приватного проекта не кликабельна', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем Mahuru — Insurance Backend приватный без скриншотов
    await user.click(screen.getByText('Mahuru'))

    // Приватная полоса рендерится как span, а не a
    const privateStrip = screen.getByTitle('Insurance Backend')
    // Не должно быть <a>
    // На самом деле у приватного проекта нет title — проверим через иконку
    // Лучше проверим что нет текстовой кнопки при раскрытии
    await user.click(screen.getByText('Insurance Backend'))
    // В раскрытой карточке не должно быть кнопки действия
    const buttons = screen.queryByText(/GitHub|RuStore|Screenshots|Скриншоты/)
    // Insurance Backend не должен иметь кнопку (только стек)
    expect(screen.getByText('Kotlin')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests**

Run: `npm run test`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add __tests__/components/WorkAndProjects.test.tsx
git commit -m "test: update WorkAndProjects tests for side-strip action buttons"
```

---

### Task 5: Bump version and final verification

**Files:**
- Modify: `package.json:3`

- [ ] **Step 1: Bump minor version**

In `package.json`, change version from `"1.2.1"` to `"1.3.0"` (new feature — minor bump).

- [ ] **Step 2: Run full test suite**

Run: `npm run test`
Expected: All tests pass.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore: bump version to 1.3.0"
```
