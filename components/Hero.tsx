'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Компонент главного экрана (Hero-секция).
 * Занимает всю высоту вьюпорта и отображает:
 * - аватар с анимацией появления,
 * - имя и должность,
 * - краткий тэглайн,
 * - кнопки CTA (скачать резюме / написать),
 * - анимированную подсказку прокрутки вниз.
 */
export default function Hero() {
  // Получаем язык, функцию перевода из языкового контекста
  const { t, lang } = useLanguage();
  // Путь к PDF и имя скачиваемого файла зависят от текущего языка
  const resumeHref = lang === 'ru' ? '/resume.pdf' : '/resume-en.pdf';
  const resumeFilename = lang === 'ru' ? 'Варшавер Борис Романович.pdf' : 'Boris Varshaver.pdf';

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 pt-20"
    >
      <div className="max-w-3xl w-full text-center">
        {/* Avatar — появляется с масштабированием */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#00d084]/40 shadow-lg shadow-[#00d084]/10">
            <Image
              src="/photo.jpg"
              alt="Boris Varshaver"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Name — появляется с задержкой 0.1с */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3"
        >
          {t('hero_name')}
        </motion.h1>

        {/* Role — должность, выводится через i18n */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-[#00d084] text-lg sm:text-xl mb-5"
        >
          {t('hero_role')}
        </motion.p>

        {/* Tagline — краткое описание, выводится через i18n */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/50 text-base sm:text-lg w-fit mx-auto mb-10 text-left"
        >
          <p>{t('hero_tagline')}</p>
          <p>{t('hero_tagline2')}</p>
          <p>{t('hero_tagline3')}</p>
          <p>{t('hero_tagline4')}</p>
        </motion.div>

        {/* CTA buttons — кнопки скачать резюме и перейти к контактам */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* Ссылка на скачивание резюме */}
          <a
            href={resumeHref}
            download={resumeFilename}
            className="px-6 py-3 rounded-lg bg-[#00d084] text-[#0d1117] font-semibold text-sm hover:bg-[#00d084]/90 transition-colors duration-200"
          >
            {t('hero_download')}
          </a>
          {/* Якорная ссылка на секцию контактов */}
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-[#00d084]/40 text-[#00d084] font-semibold text-sm bg-[#0d1117] hover:border-[#00d084] hover:bg-[#101e18] transition-all duration-200"
          >
            {t('hero_contact')}
          </a>
        </motion.div>

        {/* Scroll hint — подсказка прокрутки, появляется с задержкой 1.2с */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <a href="#about" aria-label="Scroll down">
            {/* Индикатор прокрутки — бесконечно движется вверх-вниз */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-[#00d084]/60" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
