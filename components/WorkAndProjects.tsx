'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { workBlocks } from '@/content/workblocks';

/**
 * Компонент объединённой секции "Работа и проекты".
 * Отображает 4 блока: Nadeks, Mahuru, Freelance, Личные проекты.
 * Каждый рабочий блок содержит шапку компании (период, роль, тип),
 * список обязанностей и карточки проектов.
 * Блок личных проектов показывает только заголовок и карточки.
 */
/**
 * Рендерит описание проекта: первая строка — вводный абзац,
 * строки начинающиеся с «•» — маркированный список вклада.
 */
function renderDesc(text: string) {
  const lines = text.split('\n');
  const intro = lines[0];
  const bullets = lines.slice(1).filter((l) => l.startsWith('•'));

  return (
    <>
      <p className="text-white/55 text-sm leading-relaxed mb-2">{intro}</p>
      {bullets.length > 0 && (
        <ul className="space-y-1 mb-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/45 leading-relaxed">
              {/* Акцентная точка списка */}
              <span className="text-[#00d084]/60 mt-0.5 shrink-0">▸</span>
              <span>{b.slice(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function WorkAndProjects() {
  // Получаем текущий язык и функцию перевода из языкового контекста
  const { lang, t } = useLanguage();

  return (
    <section id="work" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок секции с анимацией появления при скролле */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-16"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('work_title')}
        </motion.h2>

        {/* Блоки компаний и проектов */}
        <div className="space-y-20">
          {workBlocks.map((block, i) => (
            // Блок появляется снизу с задержкой i * 0.1с
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Шапка компании — только для рабочих блоков */}
              {block.company ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    {/* Вертикальная акцентная полоса рядом с шапкой */}
                    <div className="w-1 self-stretch bg-[#00d084]/30 rounded-full shrink-0" />
                    <div>
                      {/* Название компании — кликабельно если задан url */}
                      {block.url ? (
                        <a
                          href={block.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h3 className="text-3xl font-bold text-white hover:text-[#00d084] transition-colors duration-200 mb-1">
                            {block.company}
                          </h3>
                        </a>
                      ) : (
                        <h3 className="text-3xl font-bold text-white mb-1">
                          {block.company}
                        </h3>
                      )}
                      {/* Период работы зелёным цветом под названием компании */}
                      <p className="font-mono text-xs text-[#00d084]">
                        {lang === 'en' ? block.period : block.periodRu}
                      </p>
                    </div>
                  </div>

                  {/* Сетка карточек проектов */}
                  <div className="grid gap-5">
                      {block.projects.map((project, j) => (
                        // Карточка проекта — появляется снизу с задержкой j * 0.06с, при наведении поднимается
                        <motion.div
                          key={project.nameKey}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: j * 0.06 }}
                          whileHover={{ y: -4, transition: { duration: 0.15, ease: 'easeOut' } }}
                          className="flex flex-col rounded-xl border border-white/8 bg-white/[0.03] p-6 hover:border-[#00d084]/30 transition-colors duration-150"
                        >
                          <div className="flex-1">
                            {/* Локализованное название проекта */}
                            <h4 className="font-bold text-white text-base mb-2">
                              {t(project.nameKey)}
                            </h4>
                            {/* Период разработки — отображается только если задан */}
                            {project.period && (
                              <p className="font-mono text-xs text-white/30 mb-3">
                                {project.period}
                              </p>
                            )}
                            {/* Локализованное описание проекта */}
                            {renderDesc(t(project.descKey))}
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

                          {/* Кнопки ссылок на GitHub / Google Play / приватный */}
                          <div className="flex gap-3 mt-auto">
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
                            {project.googlePlayUrl && (
                              <span className="flex items-center gap-1.5 text-xs text-white/40 border border-white/8 px-3 py-1.5 rounded">
                                {t('proj_gplay')}
                              </span>
                            )}
                            {project.isPrivate && (
                              <span className="flex items-center gap-1.5 text-xs text-white/30 border border-white/8 px-3 py-1.5 rounded font-mono">
                                🔒 {t('proj_private')}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                </>
              ) : (
                <>
                  {/* Заголовок для блока личных проектов */}
                  <h3 className="text-lg font-semibold text-white/70 mb-6">
                    {t('work_pet_title')}
                  </h3>

                  {/* Сетка карточек личных проектов */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {block.projects.map((project, j) => (
                      <motion.div
                        key={project.nameKey}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: j * 0.06 }}
                        whileHover={{ y: -4, transition: { duration: 0.15, ease: 'easeOut' } }}
                        className="flex flex-col rounded-xl border border-white/8 bg-white/[0.03] p-6 hover:border-[#00d084]/30 transition-colors duration-150"
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-base mb-2">
                            {t(project.nameKey)}
                          </h4>
                          {project.period && (
                            <p className="font-mono text-xs text-white/30 mb-3">
                              {project.period}
                            </p>
                          )}
                          <p className="text-white/55 text-sm leading-relaxed mb-4">
                            {t(project.descKey)}
                          </p>
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
                        <div className="flex gap-3 mt-auto">
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
                          {project.googlePlayUrl && (
                            <span className="flex items-center gap-1.5 text-xs text-white/40 border border-white/8 px-3 py-1.5 rounded">
                              {t('proj_gplay')}
                            </span>
                          )}
                          {project.isPrivate && (
                            <span className="flex items-center gap-1.5 text-xs text-white/30 border border-white/8 px-3 py-1.5 rounded font-mono">
                              🔒 {t('proj_private')}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
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
