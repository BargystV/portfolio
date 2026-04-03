import { screen } from '@testing-library/react'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('рендерит все 5 контактных ссылок', () => {
    renderWithProviders(<Contact />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Telegram')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('Email ведёт на mailto', () => {
    renderWithProviders(<Contact />)
    const emailLink = screen.getByText('Email').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:bargystvelp@gmail.com')
  })

  it('Telegram ведёт на t.me', () => {
    renderWithProviders(<Contact />)
    const tgLink = screen.getByText('Telegram').closest('a')
    expect(tgLink).toHaveAttribute('href', 'https://t.me/bargystvelp')
  })

  it('GitHub ведёт на github.com', () => {
    renderWithProviders(<Contact />)
    const ghLink = screen.getByText('GitHub').closest('a')
    expect(ghLink).toHaveAttribute('href', 'https://github.com/BargystV')
  })

  it('внешние ссылки открываются в новой вкладке', () => {
    renderWithProviders(<Contact />)
    const tgLink = screen.getByText('Telegram').closest('a')
    expect(tgLink).toHaveAttribute('target', '_blank')
    expect(tgLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('mailto не открывается в новой вкладке', () => {
    renderWithProviders(<Contact />)
    const emailLink = screen.getByText('Email').closest('a')
    expect(emailLink).not.toHaveAttribute('target')
  })
})
