import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('рендерит имя и роль на английском', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText('Boris Varshaver')).toBeInTheDocument()
    expect(screen.getByText('Senior Android Developer')).toBeInTheDocument()
  })

  it('рендерит имя на русском', () => {
    renderWithProviders(<Hero />, { lang: 'ru' })
    expect(screen.getByText('Борис Варшавер')).toBeInTheDocument()
  })

  it('кнопка скачивания резюме ведёт на PDF', () => {
    renderWithProviders(<Hero />)
    const downloadLink = screen.getByText('Download Resume')
    expect(downloadLink.closest('a')).toHaveAttribute('href', '/Boris_Varshaver_Resume.pdf')
  })

  it('кнопка Contact Me ведёт на секцию контактов', () => {
    renderWithProviders(<Hero />)
    const contactLink = screen.getByText('Contact Me')
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact')
  })

  it('рендерит все 4 строки тэглайна', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText(/Android — 9\+ years/)).toBeInTheDocument()
    expect(screen.getByText(/Backend — REST APIs/)).toBeInTheDocument()
    expect(screen.getByText(/Desktop — plant evolution/)).toBeInTheDocument()
    expect(screen.getByText(/AI — agents/)).toBeInTheDocument()
  })
})
