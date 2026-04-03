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
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used inside LanguageProvider'
    )
    spy.mockRestore()
  })
})
