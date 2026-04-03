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
