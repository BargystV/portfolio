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
