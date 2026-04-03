import React from 'react'
import '@testing-library/jest-dom/vitest'

// React доступен глобально — необходимо для JSX-трансформации в тестовой среде
globalThis.React = React

// Мок Framer Motion — заменяем motion-компоненты на обычные HTML-элементы
vi.mock('framer-motion', () => {
  const React = require('react')

  // Прокси перехватывает обращения вида motion.div, motion.span и т.д.
  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
          const filteredProps: Record<string, unknown> = {}
          // Фильтруем Framer Motion-специфичные пропсы, не поддерживаемые обычными HTML-элементами
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
    // Удаляем Next.js-специфичные пропсы, несовместимые с обычным <img>
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
    // Сразу вызываем колбэк с isIntersecting: true, чтобы анимации запускались в тестах
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
