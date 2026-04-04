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
    renderWithProviders(<WorkAndProjects />)

    await user.click(screen.getByText('Mar 2025 – Present'))
    expect(screen.queryByText(/Corporate payment application/)).not.toBeInTheDocument()

    // Кликаем по названию проекта для раскрытия (title больше не кликабелен как ссылка)
    await user.click(screen.getByText('ARIASOFT.POS / ARIASOFT.T2P'))
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

  it('показывает боковую полосу-ссылку для проектов с GitHub URL', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Personal Projects — кликаем по счётчику, минуя h3 с stopPropagation
    await user.click(screen.getByText('6 projects'))

    // Портфолио имеет githubUrl — полоса должна рендериться как <a> с title="GitHub"
    // Несколько проектов могут иметь GitHub-полосу, проверяем что все они <a>
    const strips = screen.getAllByTitle('GitHub')
    expect(strips.length).toBeGreaterThan(0)
    strips.forEach((strip) => expect(strip.tagName).toBe('A'))
  })

  it('показывает боковую полосу-галерею для проектов со скриншотами', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Mahuru — кликаем по периоду работы внутри кликабельного div
    await user.click(screen.getByText('Aug 2019 – Mar 2025'))

    // Enterprise MRM имеет скриншоты (приоритет выше приватности) — title="Screenshots"
    // Несколько проектов в блоке могут иметь скриншоты, проверяем что все полосы являются <a>
    const strips = screen.getAllByTitle('Screenshots')
    expect(strips.length).toBeGreaterThan(0)
    strips.forEach((strip) => expect(strip.tagName).toBe('A'))
  })

  it('показывает текстовую кнопку в раскрытой карточке', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Personal Projects — кликаем по счётчику, минуя h3 с stopPropagation
    await user.click(screen.getByText('6 projects'))

    // Раскрываем карточку Portfolio
    await user.click(screen.getByText('Boris Portfolio'))

    // Текстовая кнопка должна отображать "GitHub ↗"
    expect(screen.getByText('GitHub ↗')).toBeInTheDocument()
  })

  it('кнопка скриншотов показывает количество', async () => {
    const user = userEvent.setup()
    renderWithProviders(<WorkAndProjects />)

    // Раскрываем блок Mahuru — кликаем по периоду работы внутри кликабельного div
    await user.click(screen.getByText('Aug 2019 – Mar 2025'))

    // Раскрываем карточку Enterprise MRM
    await user.click(screen.getByText('Enterprise MRM'))

    // Кнопка скриншотов должна содержать "Screenshots" и количество "12"
    expect(screen.getByText(/Screenshots.*12/)).toBeInTheDocument()
  })
})
