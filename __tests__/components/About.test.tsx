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
