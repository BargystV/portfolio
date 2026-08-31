import { describe, it, expect, vi } from 'vitest'

// Мок next/font/google — в тестовой среде загрузчик шрифтов Next недоступен
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter', className: 'font-inter' }),
}))

import { metadata } from '@/app/layout'

/** Канонический домен портфолио — основной домен проекта в Vercel (apex редиректит сюда) */
const EXPECTED_ORIGIN = 'https://www.bargystvelp.site'

describe('metadata в app/layout', () => {
  it('использует канонический домен как metadataBase', () => {
    expect(metadata.metadataBase?.origin).toBe(EXPECTED_ORIGIN)
  })

  it('объявляет каноническую ссылку на корень сайта', () => {
    expect(metadata.alternates?.canonical).toBe('/')
  })

  it('указывает канонический домен в OG-разметке', () => {
    expect(metadata.openGraph?.url).toBe(EXPECTED_ORIGIN)
  })
})
