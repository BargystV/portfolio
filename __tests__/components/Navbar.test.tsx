import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('рендерит логотип BV', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByText('BV')).toBeInTheDocument()
  })

  it('рендерит навигационные ссылки на английском', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Work & Projects').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('кнопка языка показывает EN и переключает на RU', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const langButton = screen.getByLabelText('Toggle language')
    expect(langButton).toHaveTextContent('EN')

    await user.click(langButton)
    expect(langButton).toHaveTextContent('RU')
  })

  it('при переключении языка ссылки обновляются', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const langButton = screen.getByLabelText('Toggle language')
    await user.click(langButton)

    expect(screen.getAllByText('Обо мне').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Работа и проекты').length).toBeGreaterThan(0)
  })

  it('бургер-меню открывается по клику', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const burger = screen.getByLabelText('Toggle menu')
    const aboutLinks = screen.getAllByText('About')
    expect(aboutLinks.length).toBe(1)

    await user.click(burger)
    expect(screen.getAllByText('About').length).toBe(2)
  })
})
