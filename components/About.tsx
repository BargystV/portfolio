'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Компонент секции "Обо мне".
 * Отображает заголовок и три абзаца текста, получаемых через i18n.
 * Каждый элемент появляется при скролле с небольшой задержкой между абзацами.
 */
export default function About() {
  // Получаем функцию перевода из языкового контекста
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок секции с анимацией появления при скролле */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-10"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('about_title')}
        </motion.h2>

        <div className="space-y-5 text-white/60 leading-relaxed text-base sm:text-lg">
          {/* Перебираем три ключа абзацев, каждый появляется с задержкой i * 0.1с */}
          {(['about_p1', 'about_p2', 'about_p3', 'about_p4', 'about_p5'] as const).map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {t(key)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
