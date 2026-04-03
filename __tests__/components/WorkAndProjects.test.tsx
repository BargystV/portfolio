import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../helpers/renderWithProviders'
import WorkAndProjects from '@/components/WorkAndProjects'

describe('WorkAndProjects', () => {
  it('рендерит заголовок секции', () => {
    renderWithProviders(<WorkAndProjects />)
    expect(screen.getByText('Work & Projects')).toBeInTheDocument()
  })

  it('рендерит все 4 блока компаний', () => {
    renderWithProviders(<WorkAndProjects />)
    expect(screen.getByText('Nadeks')).toBeInTheDocument()
    expect(screen.getByText('Mahuru')).toBeInTheDocument()
    expect(screen.getByText('Freelance')).toBeInTheDocument()
    expect(screen.getByText('Personal Projects')).toBeInTheDocument()
  })

  it('показывает счётчик проектов', () => {
    renderWithProviders(<WorkAndProjects />)
    // Nadeks и Freelance оба имеют по 1 проекту
    expect(screen.getAllByText('1 project').length).toBe(2)
    expect(screen.getByText('4 projects')).toBeInTheDocument()
  })

  it('клик по блоку раскрывает проекты', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    expect(screen.queryByText('ARIASOFT.POS / ARIASOFT.T2P')).not.toBeInTheDocument()

    // Кликаем по периоду Nadeks — он внутри кликабельного div блока
    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P')).toBeInTheDocument()
  })

  it('клик по проекту раскрывает описание и стек', async () => {
    const user = userEvent.setup()
    // Мокаем window.open чтобы клик по заголовку не падал
    vi.spyOn(window, 'open').mockImplementation(() => null)
    renderWithProviders(<WorkAndProjects />)

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.queryByText(/Corporate payment application/)).not.toBeInTheDocument()

    // Кликаем по периоду проекта для toggle (клик по заголовку вызывает handleActionClick)
    await user.click(screen.getByText(/Feb 2020/))
    expect(screen.getByText(/Corporate payment application/)).toBeInTheDocument()
  })

  it('повторный клик сворачивает блок', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P')).toBeInTheDocument()

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.queryByText('ARIASOFT.POS / ARIASOFT.T2P')).not.toBeInTheDocument()
  })

  it('рендерит заголовки на русском', () => {
    renderWithProviders(<WorkAndProjects />, { lang: 'ru' })
    expect(screen.getByText('Работа и проекты')).toBeInTheDocument()
    expect(screen.getByText('Личные проекты')).toBeInTheDocument()
  })
})
