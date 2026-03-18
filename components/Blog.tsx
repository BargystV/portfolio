'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Компонент секции "Блог".
 * Отображает заглушку "скоро" в терминальном стиле,
 * пока статьи не опубликованы.
 */
export default function Blog() {
  // Получаем функцию перевода из языкового контекста
  const { t } = useLanguage();

  return (
    <section id="blog" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Заголовок секции с анимацией появления при скролле */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-12"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('blog_title')}
        </motion.h2>

        {/* Карточка-заглушка — появляется с задержкой 0.1с */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/8 bg-white/[0.02] p-10 text-center"
        >
          {/* Terminal-style decoration — мигающий курсор в терминальном стиле */}
          <div className="font-mono text-4xl text-[#00d084]/30 mb-4">_</div>
          {/* Текст "скоро" через i18n */}
          <p className="font-mono text-[#00d084] text-lg mb-2">{t('blog_coming')}</p>
          {/* Описание тематики будущего блога через i18n */}
          <p className="text-white/40 text-sm">{t('blog_desc')}</p>
        </motion.div>
      </div>
    </section>
  );
}
