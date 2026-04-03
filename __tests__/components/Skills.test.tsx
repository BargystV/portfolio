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
