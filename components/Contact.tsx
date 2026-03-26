'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Список контактных ссылок.
 * Каждый объект содержит метку, отображаемое значение,
 * URL для перехода и иконку SVG-компонент.
 */
const contactLinks = [
  {
    label: 'Email',
    value: 'bargystvelp@gmail.com',
    href: 'mailto:bargystvelp@gmail.com',
    icon: <EmailIcon />,
  },
  {
    label: 'Telegram',
    value: '@bargystvelp',
    href: 'https://t.me/bargystvelp',
    icon: <TelegramIcon />,
  },
  {
    label: 'Instagram',
    value: '@bargystvelp',
    href: 'https://www.instagram.com/bargystvelp/',
    icon: <InstagramIcon />,
  },
  {
    label: 'GitHub',
    value: 'BargystV',
    href: 'https://github.com/BargystV',
    icon: <GitHubIcon />,
  },
  {
    label: 'LinkedIn',
    value: 'bargystvelp',
    href: 'https://www.linkedin.com/in/bargystvelp/',
    icon: <LinkedInIcon />,
  },
];

/**
 * Компонент секции "Контакты".
 * Отображает заголовок, подзаголовок, сетку ссылок-карточек
 * и местоположение. Каждая карточка является интерактивной ссылкой.
 * Внешние ссылки (http/https) открываются в новой вкладке.
 */
export default function Contact() {
  // Получаем функцию перевода из языкового контекста
  const { t } = useLanguage();

  return (
    <section id="contact" className="pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок секции с анимацией появления при скролле */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-4"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('contact_title')}
        </motion.h2>

        {/* Подзаголовок — призыв к контакту через i18n */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/50 mb-10"
        >
          {t('contact_subtitle')}
        </motion.p>

        {/* Горизонтальный ряд иконок контактов */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {contactLinks.map((link, i) => (
            // Иконка появляется снизу с задержкой i * 0.08с
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="flex flex-col items-center gap-3 group"
            >
              {/* Круглая иконка с hover-подсветкой */}
              <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-[#0d1117] text-white/40 group-hover:text-[#00d084] group-hover:border-[#00d084]/40 group-hover:bg-[#101e18] transition-all duration-200">
                {link.icon}
              </span>
              {/* Подпись под иконкой */}
              <span className="text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors duration-200">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

/**
 * SVG-иконка Email (конверт).
 */
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/**
 * SVG-иконка Telegram.
 */
function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 14.137l-2.94-.918c-.64-.203-.652-.64.135-.954l11.49-4.43c.532-.194.999.131.839.386z" />
    </svg>
  );
}

/**
 * SVG-иконка GitHub (логотип осьминога).
 */
function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/**
 * SVG-иконка LinkedIn.
 */
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * SVG-иконка Instagram.
 */
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

