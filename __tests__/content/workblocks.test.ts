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
