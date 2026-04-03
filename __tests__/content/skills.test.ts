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
