import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScreenshotModal from '@/components/ScreenshotModal'

const screenshots = ['/screenshots/test/1.png', '/screenshots/test/2.png', '/screenshots/test/3.png']
const defaultProps = {
  screenshots,
  projectName: 'Test Project',
  onClose: vi.fn(),
}

describe('ScreenshotModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('рендерит название проекта', () => {
    render(<ScreenshotModal {...defaultProps} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('показывает счётчик 1 / 3', () => {
    render(<ScreenshotModal {...defaultProps} />)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('кнопка → переходит к следующему скриншоту', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.click(screen.getByLabelText('Следующий'))
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('кнопка ← переходит к предыдущему скриншоту (цикл)', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.click(screen.getByLabelText('Предыдущий'))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('Escape закрывает модалку', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.keyboard('{Escape}')
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('стрелки клавиатуры переключают скриншоты', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('рендерит точки-индикаторы по количеству скриншотов', () => {
    render(<ScreenshotModal {...defaultProps} />)
    const dots = screen.getAllByLabelText(/Скриншот \d+/)
    expect(dots.length).toBe(3)
  })

  it('клик по точке переходит к нужному скриншоту', async () => {
    const user = userEvent.setup()
    render(<ScreenshotModal {...defaultProps} />)

    await user.click(screen.getByLabelText('Скриншот 3'))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })
})
