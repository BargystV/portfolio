'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { TranslationKey } from '@/lib/i18n';

const navItems: { key: TranslationKey; href: string }[] = [
  { key: 'nav_about', href: '#about' },
  { key: 'nav_skills', href: '#skills' },
  { key: 'nav_projects', href: '#projects' },
  { key: 'nav_experience', href: '#experience' },
  { key: 'nav_blog', href: '#blog' },
  { key: 'nav_contact', href: '#contact' },
];

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d1117]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-[#00d084] font-bold text-lg tracking-tight"
        >
          BV<span className="text-white/40">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-white/60">
          {navItems.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="hover:text-[#00d084] transition-colors duration-200"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Lang toggle + burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="font-mono text-xs px-3 py-1.5 rounded border border-white/10 text-white/60 hover:border-[#00d084] hover:text-[#00d084] transition-all duration-200"
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'RU' : 'EN'}
          </button>

          {/* Burger */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-white/60 transition-transform duration-200 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white/60 transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white/60 transition-transform duration-200 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-md border-t border-white/5 px-4 py-4">
          <ul className="flex flex-col gap-4 text-sm text-white/60">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={handleNavClick}
                  className="hover:text-[#00d084] transition-colors"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
