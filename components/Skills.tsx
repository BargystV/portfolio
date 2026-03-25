'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { skillGroups } from '@/content/skills';
import { TranslationKey } from '@/lib/i18n';

/**
 * Маппинг ключей групп навыков на ключи i18n для заголовков.
 * Позволяет получить локализованный заголовок группы через t().
 */
const groupTitleKey: Record<string, TranslationKey> = {
  languages: 'skills_languages',
  mobile: 'skills_mobile',
  architecture: 'skills_architecture',
  tools: 'skills_tools',
  backend: 'skills_backend',
  ai: 'skills_ai',
};

/**
 * Компонент секции "Навыки".
 * Отображает группы технологий в виде сетки карточек.
 * Каждый навык представлен тегом-пилюлей с анимацией появления.
 * Задержка анимации зависит от индекса группы и индекса навыка внутри неё.
 */
export default function Skills() {
  // Получаем функцию перевода из языкового контекста
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок секции с анимацией появления при скролле */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-12"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('skills_title')}
        </motion.h2>

        {/* Сетка из двух колонок для групп навыков */}
        <div className="grid sm:grid-cols-2 gap-8">
          {skillGroups.map((group, gi) => (
            // Каждая группа появляется с задержкой gi * 0.08с
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              {/* Локализованный заголовок группы */}
              <h3 className="font-mono text-[#00d084] text-sm mb-4 uppercase tracking-widest">
                {t(groupTitleKey[group.key])}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  // Каждый тег навыка появляется с суммарной задержкой группы и позиции
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.04 }}
                    className="px-3 py-1 rounded-full text-sm text-white/70 border border-white/10 bg-[#0d1117] hover:border-[#00d084]/40 hover:text-white transition-all duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
