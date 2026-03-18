'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { projects } from '@/content/projects';

/**
 * Компонент секции "Проекты".
 * Отображает карточки проектов из массива projects (content/projects.ts).
 * Каждая карточка содержит название, период, описание, стек технологий
 * и ссылки (GitHub / Google Play / приватный).
 */
export default function Projects() {
  // Получаем функцию перевода из языкового контекста
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-4">
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
          {t('projects_title')}
        </motion.h2>

        {/* Сетка карточек проектов */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            // Карточка проекта — появляется снизу с задержкой i * 0.08с, при наведении поднимается
            <motion.div
              key={project.nameKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col rounded-xl border border-white/8 bg-white/[0.03] p-6 hover:border-[#00d084]/30 transition-all duration-300"
            >
              <div className="flex-1">
                {/* Локализованное название проекта */}
                <h3 className="font-bold text-white text-lg mb-2">
                  {t(project.nameKey)}
                </h3>
                {/* Период разработки — отображается только если задан */}
                {project.period && (
                  <p className="font-mono text-xs text-white/30 mb-3">{project.period}</p>
                )}
                {/* Локализованное описание проекта */}
                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  {t(project.descKey)}
                </p>
                {/* Теги стека технологий */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono text-[#00d084]/70 bg-[#00d084]/5 border border-[#00d084]/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link buttons — кнопки ссылок на GitHub / Google Play / приватный */}
              <div className="flex gap-3 mt-auto">
                {/* Ссылка на GitHub — отображается если задан githubUrl */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded transition-all duration-200"
                  >
                    <GitHubIcon />
                    {t('proj_github')}
                  </a>
                )}
                {/* Метка Google Play — отображается если googlePlayUrl === true */}
                {project.googlePlayUrl && (
                  <span className="flex items-center gap-1.5 text-xs text-white/40 border border-white/8 px-3 py-1.5 rounded">
                    {t('proj_gplay')}
                  </span>
                )}
                {/* Метка приватного проекта — отображается если isPrivate === true */}
                {project.isPrivate && (
                  <span className="flex items-center gap-1.5 text-xs text-white/30 border border-white/8 px-3 py-1.5 rounded font-mono">
                    🔒 {t('proj_private')}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Иконка GitHub в виде SVG.
 * Используется внутри кнопки ссылки на репозиторий.
 */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
