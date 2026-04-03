import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import BuildDate from '@/components/BuildDate'

describe('BuildDate', () => {
  const isoDate = '2026-03-15T12:00:00Z'

  it('форматирует дату на английском', () => {
    renderWithProviders(<BuildDate isoDate={isoDate} />, { lang: 'en' })
    expect(screen.getByText(/Updated/)).toBeInTheDocument()
    expect(screen.getByText(/March 2026/)).toBeInTheDocument()
  })

  it('форматирует дату на русском', () => {
    renderWithProviders(<BuildDate isoDate={isoDate} />, { lang: 'ru' })
    expect(screen.getByText(/Обновлено/)).toBeInTheDocument()
    expect(screen.getByText(/март 2026/i)).toBeInTheDocument()
  })
})
